const express = require("express");
const Plant = require("../models/Plant");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.S3_JURISDICTION_ENDPOINT,
  forcePathStyle: true,
});

// Convert key to signed url

const getImageURL = async (plant) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: plant.image,
  };
  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
    plant.image = signedUrl;
  } catch (err) {
    console.error("Error getting signed url: ", err);
  }
};

router.post(
  "/new-plant",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, comments } = req.body;
      const image = req.file;

      let commentsArray = JSON.parse(comments);

      console.log(commentsArray);

      if (!image) {
        return res.status(400).json({ message: "Image is required." }); //Eventually upload default image.
      }

      try {
        // Upload the image to R2, get back the key.
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `images/${Date.now()}_${req.file.originalname}`,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ACL: "public-read",
        };

        const uploadResult = await s3.send(new PutObjectCommand(params));

        res.status(200);

        console.log(uploadResult);

        const newPlant = await Plant.create({
          name,
          image: params.Key,
          commentsArray,
          owner: req.user._id,
        });
      } catch (err) {
        console.error("Error uploading image: ", err);
        const newPlant = await Plant.create({
          name,
          commentsArray,
          owner: req.user._id,
        });
        res.status(400).json({
          message: "Could not upload image, default given.",
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/all", authMiddleware, async (req, res) => {
  try {
    console.log("test");
    const plants = await Plant.find();
    for (const plant of plants) {
      await getImageURL(plant);
    }
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "No plant found." });

    await getImageURL(plant);
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "No plant found." });

    if (plant.image) {
      // Delete the image from r2
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: plant.image,
      };
      const command = new DeleteObjectCommand(params);
      try {
        await s3.send(command);
      } catch (error) {
        return res.status(500).json({ message: "Failed to delete object." });
      }
    }
    await plant.deleteOne();
    req.flash("success_msg", "Plant deleted successfully.");
    return res.status(200).json({ message: "Plant successfully deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete object." });
  }
});

module.exports = router;

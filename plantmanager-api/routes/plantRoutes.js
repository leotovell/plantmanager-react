const express = require("express");
const Plant = require("../models/Plant");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const AWS = require("aws-sdk");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_JURISDICTION_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});

router.post(
    "/new-plant",
    authMiddleware,
    upload.single("image"),
    async (req, res) => {
        try {
            const { name, comments } = req.body;
            const image = req.file;
            console.log(name, comments, req.file);

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

                const uploadResult = await s3.upload(params).promise();

                console.log(uploadResult);

                res.status(200);

                const newPlant = await Plant.create({
                    name,
                    image: uploadResult.key,
                    comments,
                });
            } catch (err) {
                console.error("Error uploading image: ", err);
                const newPlant = await Plant.create({
                    name,
                    comments,
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
        const plants = await Plant.find();
        plants.forEach((plant) => {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `images/${plant.image}`,
                Expires: 60 * 5,
            };

            const imageUrl = s3.getSignedUrl("getObject", params);
            plant.image = imageUrl;
        });
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) return res.status(404).json({ message: "No plant found." });
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

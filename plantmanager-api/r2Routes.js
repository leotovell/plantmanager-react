require("dotenv").config();
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_JURISDICTION_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
})

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({error: "No file uploaded"});
        }

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `images/${Date.now()}_${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
            ACL: 'public-read',
        };

        const uploadResult = await s3.upload(params).promise();
        res.json({imageUrl: uploadResult.Location});
    } catch (error) {
        console.log("Upload error: ", error);
        res.status(500).json({error: "Failed to upload image"});
    }
});

router.get("/image/:key", async (req, res) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `images/${req.params.key}`,
            Expires: 10,
        };

        const imageUrl = s3.getSignedUrl('getObject', params);
        res.json( {imageUrl });
    } catch (error) {
        console.error("Get image error: ", error);
        res.status(500).json({error: "Failed to get image"});
    }
});

module.exports = router;
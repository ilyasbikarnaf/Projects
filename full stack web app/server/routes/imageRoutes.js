const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../upload_images`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const imageController = require("../controllers/imageController");

router.post("/", upload.array("photos", 20), imageController.uploadImage);

module.exports = router;

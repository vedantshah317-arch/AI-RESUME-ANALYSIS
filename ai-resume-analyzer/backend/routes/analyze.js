const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    const response = await axios.post("http://localhost:8000/analyze", {
      resume_text: text,
      job_desc: req.body.job_desc
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
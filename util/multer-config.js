const multer = require("multer");
const path = require("path");

// Define storage options and filename function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pictures"); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    // Preserve the original filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, filename);
  },
});

// Create the multer instance with the storage options
const upload = multer({ storage: storage });

module.exports = upload;

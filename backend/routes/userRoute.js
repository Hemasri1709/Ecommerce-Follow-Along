const express = require('express');
const router = express.Router();
const upload = require('../configurations/multer');
const { signup } = require('../controllers/userControllers');

router.post ("/signup", signup)

// router.post('/upload', upload.single('myImage'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: 'No file uploaded!' });
//   }
//   res.send({ message: 'File uploaded!', file: req.file.path });
// });

module.exports = router;



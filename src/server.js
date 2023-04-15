const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'upload/' });

const app = express();

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Pindahkan file ke dalam folder asset/image
        const { filename, path: tempPath } = req.file;
        const targetPath = path.join(__dirname, 'src', 'assets', 'image', filename);
        fs.renameSync(tempPath, targetPath);

        // Kirim respons
        res.send('File uploaded');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

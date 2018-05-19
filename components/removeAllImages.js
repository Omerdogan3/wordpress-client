const fs = require('fs');
const path = require('path');

const directory = 'imageContainer';

module.exports = removeImages = (res) => {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
                res.send("Success");
            });
        }
    });
}


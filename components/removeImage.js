var fs = require('fs');
const path = require('path');
 
module.exports = removeImage = (file) =>{
    const directory = 'imageContainer';
    fs.unlink(path.join(directory, file), (error) => {
        if (error) {
            throw error;
        }
        console.log('Deleted', file);
    });
}


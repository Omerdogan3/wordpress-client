const util = require('util');
const removeImage = require('./removeImage');

module.exports = setThumbnail = (site, id, resObj, result, uuid, callback) => {
    console.log("Setting Thumbnail", id);
    site.media().file(util.format("imageContainer/%s.jpg",uuid)).create({
        title: resObj.title,
        alt_text: resObj.title,
        caption: resObj.title,
        description: resObj.title
    }).then((response) => {
        site.posts().id(resObj.postid).update({
            featured_media: response.id,
            tags: [3]
        })
        // result.send(resObj);
        callback(resObj);

        if(uuid !== "no-thumbnail"){
            removeImage(uuid.concat('.jpg'));
        }
        console.log("Success");
    }).catch(()=>{
        site.posts().id(resObj.postid).update({
            featured_media: null
        }).then(()=>{
            result.send("Could not imported tumbnail!");
            // removeImage(uuid.concat('.jpg'));
        })
    })
};

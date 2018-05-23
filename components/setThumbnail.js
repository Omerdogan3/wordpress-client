const util = require('util');

module.exports = setThumbnail = (site, id, resObj, result, uuid) => {
    console.log("Setting Thumbnail", id);
    site.media().file(util.format("imageContainer/%s.jpg",uuid)).create({
        title: resObj.title,
        alt_text: resObj.title,
        caption: resObj.title,
        description: resObj.content
    }).then((response) => {
        site.posts().id(resObj.postid).update({
            featured_media: response.id,
            tags: [3]
        })
        result.send(resObj);
        console.log("Success");
    }).catch(()=>{
        site.media().file("./no-thumbnail.jpg").create({
            title: resObj.title,
            alt_text: resObj.title,
            caption: resObj.title,
            description: resObj.content
        }).then((response) => {
            site.posts().id(resObj.postid).update({
                featured_media: response.id,
                tags: [3]
            }).then(
                result.send("Could not imported tumbnail!")
            )
        })
    })
};
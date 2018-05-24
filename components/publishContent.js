

module.exports = publishContent = async (site, resObj, callback) => {
    console.log("Content Publishing!");
    site.posts().create({
        title: resObj.title,
        content: resObj.content,
        status: 'publish'
    }).then((response) => {
        resObj.postid = response.id;
        callback(response.id);
        console.log(response.id);
    }).catch((err)=>{
        console.log(err)
    });
}
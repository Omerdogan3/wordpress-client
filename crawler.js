var WPAPI = require( 'wpapi' );
const util = require('util');
const download = require('./components/imgDownloader');
const guuid = require('./components/guuid');

const publishContent = require('./components/publishContent');
const setThumbnail = require('./components/setThumbnail');


var uuid = guuid();

module.exports = crawler = async (client, server, padding, result) => {
    let page = Math.floor(padding/10)+1;
    console.log("Page",page);
    padding = padding%10;
    console.log("Padding", padding);
    var wp = new WPAPI({
        endpoint: util.format('https://%s/wp-json',server)
    });
    
    var site = new WPAPI({
        endpoint: util.format('http://%s/wp-json',client),
        username: 'content_creator',
        password: 'VFR(iN8cabqEuwNjfR6qkf%d'
    });
    
    var resObj = {
        img_url: '',
        title: '',
        content: '',
        postid: ''
    }
    
    wp.posts().perPage(10).page(page).then((data) => {
        resObj.title = data[padding].title.rendered;
        resObj.content = data[padding].content.rendered;

        wp.media().id(data[padding].featured_media).then(
            (res) => {
                console.log(res.source_url);
                download(res.source_url,util.format("imageContainer/%s.jpg",uuid),
                    (done)=>{
                        publishContent(site,resObj,(id)=>setThumbnail(site, id, resObj, result, uuid));
                    })
        });
            
    });
}







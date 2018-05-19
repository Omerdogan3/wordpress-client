var WPAPI = require( 'wpapi' );
const util = require('util');
const download = require('./components/imgDownloader');
const guuid = require('./components/guuid');


var uuid = guuid();


module.exports = crawler = async (client, server, padding, res) => {
    var wp = new WPAPI({
        endpoint: util.format('http://%s/wp-json',server)
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
    
    wp.posts().then(( data ) => {
        resObj.title = data[padding].title.rendered;
        resObj.content = data[padding].content.rendered;

        wp.media().id(data[padding].featured_media).then(
            (res) => {
                download(res.source_url,util.format("imageContainer/%s.jpg",uuid),
                    (done)=>{
                        console.log('done!')
                    })
        }).then(()=>{
            site.posts().create({
                title: resObj.title,
                content: resObj.content,
                status: 'publish'
            }).then(function( response ) {
                resObj.postid = response.id;
                console.log(response.id);
            }).catch((err)=>{
                console.log(err)
            }).then(
                ()=>{
                    site.media().file(util.format("imageContainer/%s.jpg",uuid)).create({
                        title: resObj.title,
                        alt_text: resObj.title,
                        caption: resObj.title,
                        description: resObj.content
                    }).then((response) => {
                        site.posts().id(resObj.postid).update({
                            featured_media: response.id
                        })
                        res.send("Success");
                    })
                }   
            )
        })
    });
}







var WPAPI = require( 'wpapi' );
const util = require('util');
const download = require('./components/imgDownloader');
const guuid = require('./components/guuid');


var uuid = guuid();

var wp = new WPAPI({
    endpoint: 'https://fanzade.com/wp-json',
});

var site = new WPAPI({
    endpoint: 'http://nolur.net/wp-json',
    username: 'content_creator',
    password: 'VFR(iN8cabqEuwNjfR6qkf%d'
});


var resObj = {
    img_url: '',
    title: '',
    content: '',
    postid: ''
}


for(let i=0; i<10; ++i){
    wp.posts().then(( data ) => {
        resObj.title = data[i].title.rendered;
        resObj.content = data[i].content.rendered;


        wp.media().id(data[i].featured_media).then(
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
                    })
                }
            )
    
            

        })

        

    });
}


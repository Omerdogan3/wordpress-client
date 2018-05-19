var WPAPI = require( 'wpapi' );

var wp = new WPAPI({
    endpoint: 'https://filmhafizasi.com/wp-json',
});

module.exports = filmhafizasi = async () => {
    wp.posts().then(function( data ) {
        return (data);

    }).catch(function( err ) {
        console.log(err);
    });
};
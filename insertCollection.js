module.exports = insertCollection = (client, server, padding, res, numofposts, callback) => {

    let i = 0;

    if( i < numofposts) {
        crawler(client, server, padding+i, res, function(err) {
          if( err ) {
            console.log('error: '+err)
          }
          else {
            crawler(client, server, padding+i, res)
          }
        })
      }
  }
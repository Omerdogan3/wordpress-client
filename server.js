var express = require('express');
var app = express();           
var crawler = require('./crawler');

app.route('/').get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:client/:server', (req,res)=>{
    crawler(req.params.client, req.params.server);
})

var port = process.env.PORT || 8080; 
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

var express = require('express');
var app = express();           
var crawler = require('./crawler');
var removeImages = require('./components/removeAllImages');

app.route('/').get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:client/:server/:padding/:numofposts', (req,res)=>{
	let padding = req.params.padding;
	// crawler(req.params.client, req.params.server, req.params.padding, res,(result)=>{
	// 	console.log(result);
	// });

	insertCollection = (i) =>{
		padding = padding + i;
		if(i<req.params.numofposts) {
			crawler(req.params.client, req.params.server, req.params.padding, res);
		}
	};   
	insertCollection(0); 
});


// app.get('/removeimages',(req,res)=>{
//     removeImages(res);
// })

var port = process.env.PORT || 8080; 
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

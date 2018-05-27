var express = require('express');
var app = express();           
var crawler = require('./crawler');
var removeImages = require('./components/removeAllImages');

app.route('/').get(function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/:client/:server/:padding/:numofposts', (req,res)=>{
	let padding = parseInt(req.params.padding);
	let resObj;
	insertCollection = (i) =>{
		padding = padding + i;
		if(i<req.params.numofposts) {
			crawler(req.params.client, req.params.server, padding, res, (result)=>{
				resObj = result;
				insertCollection(i+1);
			});
		}else{
			res.send(resObj);
		}
	};
	insertCollection(0);
});


app.get('/removeimages',(req,res)=>{
    removeImages(res);
})

var port = process.env.PORT || 8080; 
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

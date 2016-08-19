'use strict';

var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	http,
	config = {
		secure:false,
		port:8001
	};

app.use('/app',express.static(path.resolve(__dirname,'public/app')));

function response(res,filePath,filter) {
	var file = fs.readFileSync('data/'+filePath+'.json','utf8'),
		result = JSON.parse(file);
	if (filter) {
		result = result.filter(function(res) {
			console.log('ok');
			return (res.title.indexOf(filter) !== -1)
		})
	}
	res.status(200).send(result);	
}

app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});	

app.get('/search',function(req,res) {
	return(response(res,'ndata',req.query.keys));
});
app.get('/results',function(req,res) {
	return(response(res,'results'));
});
http = require('http').createServer(app);

http.listen(config.port,function() {
	console.log('Advanced Search Server running in Port '+config.port);
})
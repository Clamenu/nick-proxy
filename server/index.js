var express = require('express');
var app = express();
var parser = require('body-parser');
var fetch = require('node-fetch');

app.use('/:idOrName', express.static('public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use('/api/photos', (req,res) => {
  fetch(`http://ec2-174-129-188-35.compute-1.amazonaws.com${req.url}`)
    .then(response => response.json())
    .then(myJson => res.send(myJson))
    .catch(err => res.send(err));  	
});

app.use('/api/sidebar', (req,res) => {
	console.log(req.url,'sadf')
  fetch(`http://ec2-18-234-26-142.compute-1.amazonaws.com${req.url}`)
    .then(response => response.json())
    .then(myJson => res.send(myJson))
    .catch(err => res.send(err));
});

app.get('/api/reviews/:id', (req,res) => {
	var url = req.url.slice(4);
	console.log(url);
  fetch(`http://ec2-18-208-135-101.compute-1.amazonaws.com${url}`)
    .then(response => response.json())
    .then(myJson => res.send(myJson))
    .catch(err => res.send(err));
});

app.use('/api/header', (req,res,next) => {
  fetch(`http://ec2-18-232-101-230.compute-1.amazonaws.com${req.url}`)
    .then(response => response.json())
    .then(myJson => res.send(myJson))
    .catch(err => res.send(err));
});

var port = process.env.PORT || 3005
app.listen(port, () => console.log(`connected on port ${port}`));

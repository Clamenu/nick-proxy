var express = require('express');
var app = express();
var parser = require('body-parser');
var db = require('../database/index.js');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/:idOrName', express.static('./public'));

app.get('/:idOrName/restaurants', (req, res) => {
  if(isNaN(parseInt(req.params.idOrName))) {
    db.getAllPicturesByName(req.params.idOrName, (err,data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    db.getAllPicturesById(req.params.idOrName, (err, data) => {
    	if(err) {
    		res.send(err);
    	} else {
  		  res.send(data); 		
    	}
    });   
  }
});

app.get('/:idOrName/users', (req, res) => {
  db.getAllUsers(req.query.users, (err, data) => {
  	if(err) {
  		res.send(err);
  	} else {
		  res.send(data); 		
  	}
  });
});

app.get('/api/photos/:idOrName/restaurants', (req, res) => {
  if(isNaN(parseInt(req.params.idOrName))) {
    db.getAllPicturesByName(req.params.idOrName, (err,data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    db.getAllPicturesById(req.params.idOrName, (err, data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);     
      }
    });   
  }
});

app.get('/api/photos/:idOrName/users', (req, res) => {
  db.getAllUsers(req.query.users, (err, data) => {
    if(err) {
      res.send(err);
    } else {
      res.send(data);     
    }
  });
});


var port = 3001;

app.listen(port, () => console.log("Connected on port 3001"));

module.exports.app = app;
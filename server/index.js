var express = require('express');
var app = express();
var parser = require('body-parser');
var photo = require('../components/photo-wheel/database/index.js');
var getRestaurantsByName = require('../components/header-map/database/index.js').getRestaurantsByName;
var getRestaurantsById = require('../components/header-map/database/index.js').getRestaurantsById;
var Restaurant = require('../components/sidebar/database/index.js').Restaurant;

app.use('/:idOrName', express.static('public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

//header
app.get('/:id/res', function (req, res) {

  let resIdOrName = req.param('id');
  if (isNaN(parseInt(resIdOrName))) {
    getRestaurantsByName(resIdOrName, (err, data) => {
      res.send(JSON.stringify(data[0]));
    });
  } else {
    getRestaurantsById(resIdOrName, (err, data)=>{
      res.send(JSON.stringify(data[0]));
    });
  }
});

//sidebar
// app.get('/:nameOrId/restaurants', (req, res) => {
//   const nameOrId = req.params.nameOrId;
//   if (isNaN(nameOrId)) {
//     const name = nameOrId;
//     return Restaurant.findAll({ where: { name } })
//       .then(data => res.send(data));
//   }
//   const id = nameOrId;
//   return Restaurant.findAll({ where: { id } })
//     .then(data => res.send(data));
// });

//photo-wheel
app.get('/:idOrName/restaurants', (req, res) => {
  if(isNaN(parseInt(req.params.idOrName))) {
    photo.getAllPicturesByName(req.params.idOrName, (err,data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  } else {
    photo.getAllPicturesById(req.params.idOrName, (err, data) => {
    	if(err) {
    		res.send(err);
    	} else {
  		  res.send(data); 		
    	}
    });   
  }
});

app.get('/:idOrName/users', (req, res) => {
  photo.getAllUsers(req.query.users, (err, data) => {
  	if(err) {
  		res.send(err);
  	} else {
		  res.send(data); 		
  	}
  });
});

var port = process.env.PORT || 3005
app.listen(port, () => console.log(`connected on port ${port}`));

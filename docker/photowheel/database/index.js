var mysql = require('mysql');


var db = mysql.createConnection({
	multipleStatements: true,
  host: '172.17.0.2',
  user: 'root',
  password: 'nick',
  database: 'photos'
});


db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('connected to db');
});

var getAllPicturesById = function(restaurant, cb) {
	db.query(`SELECT url, postdate, caption, user FROM pictures WHERE restaurant = ${restaurant}`, (err, result) => {
	  if(err) {
	  	cb(err);
	  }	else {
	  	cb(null, result);
	  }
	});
}

var getAllPicturesByName = function(restaurant, cb) {
	db.query(`SELECT url, postdate, caption, user FROM pictures WHERE restaurant IN ( SELECT id FROM restaurants WHERE name = '${restaurant}')`, (err, result) => {
	  if(err) {
	  	cb(err);
	  }	else {
	  	cb(null, result);
	  }
	});
}

var getAllUsers = function(users, cb) {
	db.query(`SELECT * FROM users where user_id in (${users})`, (err, result) => {
	  if(err) {
	  	cb(err);
	  }	else {
	  	cb(null, result);
	  }
	});
}

module.exports.getAllUsers = getAllUsers;
module.exports.getAllPicturesByName = getAllPicturesByName;
module.exports.getAllPicturesById = getAllPicturesById;
module.exports.db = db;
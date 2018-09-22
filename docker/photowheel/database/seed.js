var data = require('./YelpData.js');
var db = require('./index.js').db;

console.log('starting first seed')

db.query('INSERT INTO restaurants (name) VALUES ?', [data.businessNames], function (err, res) {
	if(err) { 
		console.log('first seed error', err) 
	} else {
		console.log('first seed finished');
		secondSeed()
	}
});

var secondSeed = function() {
db.query("INSERT INTO users (name, elite, friends, reviews, avatar) VALUES ?", [data.users], (err) => {
  if(err) {
  	console.log('second seed error', err)
  } else {
  	console.log('second seed finished')
  	finalSeed();
  }
});
}

var finalSeed = function() {
	db.query("INSERT INTO pictures (url, postdate, caption, user, restaurant) VALUES ?", [data.photoData], (err) => {
	  if(err) {
	  	console.log('hello', err);
	  }	else {
	  	console.log('done');
	  }
	});
}
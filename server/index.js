var express = require('express');
var app = express();
var parser = require('body-parser');

app.use('/:idOrName', express.static('public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

var port = process.env.PORT || 3005
app.listen(port, () => console.log(`connected on port ${port}`));

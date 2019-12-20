const express = require('express')
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 5000
const { URLDB } = require('./config/config.js')
const mongoose = require('mongoose')
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './../public')))
app.all('*', function(req, res, next) {
	var origin = req.get('origin'); 
	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); 
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    next();
}

app.use(corsMiddleware);
app.use(require('./routes/index'));



server.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

mongoose.connect(URLDB, { useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('moongose conected');
	}
});
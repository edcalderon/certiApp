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
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
	next();
});
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
const { URLDB } = require('./config/config');
const { PORT } = require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Paths
const directoryPublic = path.join(__dirname, '../public');

//Cors
app.use(cors())
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if ('OPTIONS' == req.method) {
	   res.sendStatus(200);
	 }
	 next();
 });

// Static
app.use(express.static(directoryPublic));

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

mongoose.connect(URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('moongose conected');
	}
});


app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});
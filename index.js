
const bodyParser = require('body-parser')
const express = require('express')
const { URLDB } = require('./config/config');
const app = express();
const path = require('path')
const hbs = require('hbs');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const viewsDir = path.join(__dirname, './templates/views');

require('./helpers/helpers');


express()
.use(bodyParser.urlencoded({extended: false}))
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.set('view engine', 'hbs')
.set('views',viewsDir)

.get('/',  (req, res) => {

    res.render('index', {

    });
})

.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// mongoose Conection
mongoose.connect(URLDB, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('moongose conected');
	}
});

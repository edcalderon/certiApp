const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

require('./../helpers/helpers');

// Directory Paths
const directorioViews = path.join(__dirname, './../templates/views');

// HBS
app.set('views', directorioViews);
app.set('view engine', 'hbs');// Le configuramos el motor de templates o de vistas

// Models mongodb
const Certificates = require('./../models/certificate');

app.get('/', (req, res) => {
    if (req.query.id){
        Certificates .findOne({ id: req.query.id }, (err, result) => {
            if (err) {
                console.log(err);
            }else if (result) {
                res.json(result);
            }else {
                res.json("Identificacion no encontrada ponte en contacto");
            }
        })
    }else{
        res.render('index', {
        });
    }
});


module.exports = app;
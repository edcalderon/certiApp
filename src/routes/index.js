const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
require('./../helpers/helpers');

// Directory Paths
const directorioViews = path.join(__dirname, './../templates/views');

// HBS
app.set('views', directorioViews);
app.set('view engine', 'hbs');// Le configuramos el motor de templates o de vistas

// Models mongodb
const Certificates = require('./../models/certificate');

app.get('/', cors(), (req, res) => {
    res.render('index', {
    });
});

app.get('/certificate/:id',  (req, res) => {
    if (req.params.id){
        Certificates .findOne({ id: req.params.id }, (err, result) => {
            if (err) {
                console.log(err);
            }else if (result) {
                res.header('Access-Control-Allow-Origin', 'localhost')
                res.json(result);
            }else {
                res.header('Access-Control-Allow-Origin', 'localhost')
                res.json("Identificacion no encontrada ponte en contacto");
            }
        })
    }else{
        res.json("Ingresa un id");
    }
})

module.exports = app;
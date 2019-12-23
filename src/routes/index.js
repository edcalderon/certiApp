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
        message: "Bienvendio! para descargar tu certificado Ingresa tu documento en el recuadro",
        type: "info"
    });
});


app.get('/cicti', cors(), (req, res) => {
    res.render('cicti', {
        message: "Bienvendio! para descargar tu certificado Ingresa tu documento en el recuadro",
        type: "info"
    });
});

app.post('/cicti', cors(), (req, res) => {
    Certificates .findOne({ id: req.body.id }, (err, result) => {
        if (err) {
            console.log(err);
        }else if (result) {
            res.render('cicti', {
                certificates: result,
                message: "Documento encontrado!, puedes descargar tu certificado dando click en DESCARGAR en la parte inferior ",
                type: "success"
            });
        }else {
            res.render('cicti', {
                message: "Documento NO encontrado, ponte en contacto con soporte, Correo en la parte inferior",
                type: "danger"
            });
        }
    })
});


app.get('/workshop', cors(), (req, res) => {
    res.render('workshop', {
        message: "Bienvendio! Ingresa una palabra presente en el inicio del titulo de tu articulo",
        type: "info"
    });
});

app.post('/workshop', cors(), (req, res) => {
    console.log(req.body.id)
    Certificates .findOne({ id: {$regex: req.body.id, $options: 'i'}}, (err, result) => {
        console.log(result)
        if (err) {
            console.log(err);
        }else if (result) {
            res.render('workshop', {
                certificates: result,
                message: "encontrado!, puedes descargar tu certificado dando click en DESCARGAR en la parte inferior ",
                type: "success"
            });
        }else {
            res.render('workshop', {
                message: "Documento NO encontrado, ponte en contacto con soporte, Correo en la parte inferior",
                type: "danger"
            });
        }
    })
});


app.get('/workshopfull', cors(), (req, res) => {
    console.log(typeof req.body.id)
    Certificates .find({}, (err, result) => {
        console.log(result)
        if (err) {
            console.log(err);
        }else if (result) {
            res.render('workshop', {
                certificates: result,
                message: "encontrado!, puedes descargar tu certificado dando click en DESCARGAR en la parte inferior ",
                type: "success"
            });
        }else {
            res.render('workshop', {
                message: "Documento NO encontrado, ponte en contacto con soporte, Correo en la parte inferior",
                type: "danger"
            });
        }
    })
});

module.exports = app;
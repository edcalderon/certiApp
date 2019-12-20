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

app.post('/', cors(), (req, res) => {
    Certificates .findOne({ id: req.body.id }, (err, result) => {
        if (err) {
            console.log(err);
        }else if (result) {
            res.render('index', {
                certificates: result,
                message: "Documento encontrado!, puedes descargar tu certificado dando click en DESCARGAR en la parte inferior ",
                type: "success"
            });
        }else {
            res.render('index', {
                message: "Documento NO encontrado, ponte en contacto con soporte, Correo en la parte inferior",
                type: "danger"
            });
        }
    })
});

app.get('/certificate/:id',  (req, res) => {
    if (req.params.id){
        Certificates .findOne({ id: req.params.id }, (err, result) => {
            if (err) {
                console.log(err);
            }else if (result) {
                res.json(result);
            }else {
                res.json("Identificacion no encontrada ponte en contacto");
            }
        })
    }else{
        res.json("Ingresa un id");
    }
})

module.exports = app;
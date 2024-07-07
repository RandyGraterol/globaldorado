
const multer = require('multer');
const path = require('path');
const express = require('express');
const alertRoutes = express.Router();

const {addPeli,deleteAlertPeli} = require('../controllers/alertControllers.js');

alertRoutes.get('/addPeli',addPeli);
alertRoutes.get('/deleteAlertPeli',deleteAlertPeli);

module.exports = alertRoutes;
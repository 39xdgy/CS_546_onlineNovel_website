const express = require("express");
const data = require("../data");
const router = express.Router();
const dataInfo = require('../data');
const carsData = dataInfo.cars;
const validation = dataInfo.validate;
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'public/uploads'});
const fs = require('fs');
const { default: Axios} = require('axios');

router.get('/createCar', async (req, res) => {
    try {
        res.render('cars/carcreation');
    } catch (error) {
        console.log(error);
        res.statusCode(500).send();
    }
});

router.post('/createCar', async (req, res) => {
    const newCarData = req.body;
    const errorList = [];
    let allCars;
    try {
        allCars = await carsData.getAllCars();
    } catch(error) {
        console.log(error);
    }

    try {
        const newCar = await carsData.createCar(newCarData);
        //req.session.AuthCookie = newCar._id;
        res.render("cars/carProfile", {
            success: true,
            cars: newCar,
            carprofileFlag: true,
            message: "Car Created Successfully",
            id: newCar._id
        });
    }
    catch(error) {
        console.log(error);
        res.status(400).json({ Error: error });
    }
});

module.exports = router;
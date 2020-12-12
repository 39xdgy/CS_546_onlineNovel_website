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
const { cars } = require("../config/mongoCollections");
const { stringify } = require("querystring");

router.get('/profile/:id', async(req, res)=> {
    try{
        const car = await carsData.getCarById(id);
        res.render('cars/carprofile')
    } catch(error){
        res.status(401);
        res.json({message:error});
    }
})

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
//Validation
    try {
        validation.validateString(newCarData.brand);
    } catch(error) {
        errorList.push("Brand: " + error );
    }
    try {
        validation.validateString(newCarData.model);
    } catch(error) {
        errorList.push("Model:" + error);
    }
    //validate makeYear has  to be  done
    try {
        validation.validateString(newCarData.type);
    } catch(error) {
        errorList.push("Type: " + error);
    }
    try {
        validation.validateString(newCarData.color);
    } catch(error) {
        errorList.push("Color: " + error);
    }
    /*try {
        validation.validateArray(newCarData.features);
    } catch(error) {
        errorList.push("Features: " + error);
    }*/
    try {
        validation.validateNumber(newCarData.noOfPassengers);
    } catch(error) {
        errorList.push("Features: " + error);
    }
    try {
        validation.validateNumber(newCarData.bootSpace);
    } catch(error) {
        errorList.push("Boot Space: " + error);
    }
    try {
        validation.validateNumber(newCarData.houseNo);
    } catch(error) {
        errorList.push("House No:" + error);
    }
    try {
        validation.validateString(newCarData.street);
    } catch(error) {
        errorList.push("Street: " + error);
    }
    try {
        validation.validateString(newCarData.city);
    } catch(error) {
        errorList.push("City: " + error);
    }
    try {
        validation.validateString(newCarData.state);
    } catch(error) {
        errorList.push("State: " + error);
    }
    try {
        validation.validateNumber(newCarData.zip);
    } catch(error) {
        errorList.push("Zip: " + error);
    }
    try {
        validation.validateNumber(newCarData.price);
    } catch(error) {
        errorList.push("Price: " + error);
    }
//Validation Ends   

    try {
        const newCar = await carsData.createCar(newCarData);
        res.render("cars/carprofile", {
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
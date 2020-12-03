const express = require("express");
const router = express.Router();
const data = require("../data");
const cars = data.cars;
const validation = data.validate;
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'public/uploads' });
const fs = require('fs');
const { default: Axios } = require('axios');

/*router.post('/upload/images', upload.multipe('carPictures'), async (req, res) => {
    let img = fs.readFileSync(req.file.path);
    let encode_image = img.toString('base64');
    let carId = req.session.AuthCookie;
    var finalImg = {
        contentType: req.file.mimetype, 
        image: Buffer.from(encode_image, 'base64')
    };

    const addingCarPicture = await cars.addCarPictures(carId, finalImg);
    res.redirect('/cars/editCar');
});

router.get('/images/:id', async (req, res) => {
    const getCar = await cars.getCarById(req.params.id);
    const imageData = getCar.image;
    if( imageData === "") {
        return res.status(400).send({
            message: 'No images found'
        })
    } else {
        res.contentType('image/jpeg');
        res.send(imageData.image.buffer);
    }
    return;
});*/

router.get('/', async (req,res) => {
    try {
        let carList = await cars.getAllCars();
        res.json(carList);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const carInfo = await cars.getCarById(req.params.id);
        res.status(200).json(carInfo)
    } catch(e){
        res.status(404).json({message: e})
    }
});

router.get('/createCar', async (req, res) => {
    try {
        res.render('cars/carcreation')
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
});

router.post('/createCar', async(req, res) => {
    const newCarData = req.body;
    try{
        const newCar = await cars.createCar(newCarData);
        res.json(newCar);
    }
    catch(error){
        res.status(400).json({Error : error});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await cars.getCarById(req.params.id);
    } catch(e) {
        res.status(400).json({ error: 'Car Not found'});
        return;
    }

    try {
        const deletedCar = await cars.deleteCar(req.params.id);
        res.status(200).send(deletedCar);
    } catch (e) {
        res.status(500).json({ error : e});
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const data = require("../data");
const cars = data.cars;

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

router.post('/', async(req, res) => {
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
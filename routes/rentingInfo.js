const express = require('express');
const router = express.Router();
const data = require("../data");
const rentingInfoData = data.rentingInfo;
const carData = data.cars;
const userData = data.users;

router.get('/', async (req, res) => {
    try{
        const renting_list = await rentingInfoData.getAllRenting();
        res.status(200).json(renting_list);
    } catch(e){
        res.status(404).json({message:e})
    }
})

router.get('/test', async (req, res) => {
    try{
        res.status(200).render("rentingInfo/confirm");
    } catch(e){
        res.status(404).render("rentingInfo/create_renting", {error_flag: true, message: "test error"})
    }
})

router.get('/find_date', async (req, res) => {
    try{
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        let user_name = 
        res.status(200).render("rentingInfo/create_renting", { min_date: tomorrow.toISOString().split('T')[0]});
    } catch(e){
        console.log(e)
        res.status(404).render("rentingInfo/create_renting", {error_flag: true, message: e})
    }
})

router.post('/find_date', async (req, res) => {
    try{
        if(!req.body || !req.body.start_date || !req.body.end_date){
            res.status(401).render('rentingInfo/create_renting', {error_flag: true, message: "Missing dates"})
        }
        let startDate = req.body.start_date
        let endDate = req.body.end_date
        //testing 
        let userId = "5f962413f7e76872649d3903"
        let carId = "5f962413f7e76872649d3903"
        let totalPrice = 500
        new_rent = await rentingInfoData.create(startDate, endDate, false, totalPrice, userId, carId)
        req.body.new_rent = new_rent;
        console.log(req.body.new_rent)
        res.redirect("/rentingInfo/confirm")
        //res.render('rentingInfo/confirm_renting', {new_rent: new_rent})
    } catch(e){
        res.status(404).json({message: e})
    }
})

router.get('/confirm', async (req, res) => {
    try{
        res.status(200).render("rentingInfo/confirm", {new_rent: new_rent})
    } catch(e){
        res.status(404).json({message: "Error"})
    }
    
})

/*

router.get('/:id', async (req, res) => {
    const renting_id = req.params.id
    if(!renting_id){
        res.status(400).json({error: "Error on the id"})
        return 
    }
    try{
        const rentingInfo = await rentingInfoData.getrentById(renting_id);
        res.status(200).json(rentingInfo)
    } catch(e){
        res.status(404).json({message: e})
    }
})

router.post('/', async (req, res) => {
    let req_body = req.body;
    //startDate, endDate, status, totalPrice, userId, carId
    if (!req_body || !req_body.startDate || !req_body.endDate ||
        !req_body.status || !req_body.totalPrice || !req_body.userId || !req_body.carId){
            res.status(400).json({error: 'Missing input'});
            return;
        }
    try{
        const {startDate, endDate, status, totalPrice, userId, carId} = req_body;
        const new_rentingInfo = await rentingInfoData.create(startDate, endDate, status, totalPrice, userId, carId)
        res.status(200).json(new_rentingInfo);
    } catch(e){
        res.status(404).json({message: e});
    }
})*/

module.exports = router;
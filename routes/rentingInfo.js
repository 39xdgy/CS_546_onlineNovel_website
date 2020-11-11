const express = require('express');
const router = express.Router();
const data = require("../data");
const rentingInfoData = data.rentingInfo;

router.get('/', async (req, res) => {
    try{
        const renting_list = await rentingInfoData.getAllRenting();
        res.status(200).json(renting_list);
    } catch(e){
        res.status(404).json({message:e})
    }
})


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
})

module.exports = router;
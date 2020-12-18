const express = require('express');
const router = express.Router();
const data = require('../data');
const adminData = data.admin;

const xss = require('xss');
const dataInfo = require('../data');
const reviewsData = dataInfo.reviews;


router.get('', async (req, res) => {
    try{
        res.status(200).render("admin/adminLogin");
    }
    catch(error){
        res.status(500).send();
    }
});

router.post('/homePage', async (req, res) => {
    xss(req.body.emailID);
    xss(req.body.password);

    const adminName = req.body.name;
    const password = req.body.password;

    if(req.body.name !== "admin" || req.body.password !== "admin@123"){
         res.status(400).render("admin/adminLogin",{error:true,message:"Email ID or password is invalid"});
        //res.status(400).send({message:"Email Id: " + "EmailID or Password is wrong"});
        return;
    }

    let adminVar = await adminData.getAllData();
    reviewsLength = adminVar.length;
    var countLender = 0;
    adminVar.forEach((val) => {
        if(val.lenderReply === ""){
            countLender = countLender + 1;
        }
    })
    
    res.status(200).render("admin/adminPage",{adminVar : adminVar, reviewsLength: reviewsLength, countLender: countLender});
});


router.post('/adminDelete', async (req, res) => {
    if(!req.body.id){
        res.status(400).json({ error: 'You must Supply an ID to delete' });
        return;
    }

    try {
        await reviewsData.getReviewById(req.body.id);
    } catch (e) {
        res.status(404).json({ error: 'Review not found' });
        return;
    }

    try {
        const deletedReview = await reviewsData.removeReview(req.body.id);

        let adminVar = await adminData.getAllData();
        reviewsLength = adminVar.length;
        var countLender = 0;
        adminVar.forEach((val) => {
            if(val.lenderReply === ""){
                countLender = countLender + 1;
            }
        })
    
        res.status(200).render("admin/adminPage",{adminVar : adminVar, reviewsLength: reviewsLength, countLender: countLender});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;
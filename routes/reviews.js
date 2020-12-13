const express = require('express');
const { reviews } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const dataInfo = require("../data");
const validation = dataInfo.validate;
const rentingData = data.rentingInfo;
/*
router.get('/:id', async(req, res) => {
    try {
        let review = await reviewsData.getReviewById(req.params.id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
});*/

/*
router.get('/', async (req, res) => {
    try {
        let reviewsList = await reviewsData.getAllReviews();
        res.json(reviewsList);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
});*/

router.get('/postReview/:id', async (req, res) => {
    try {
        let rentId = req.params.id;
        const oneRenting = await rentingData.getrentById(rentId);
        req.session.ids = {userId : oneRenting.userId, carId : oneRenting.carId, rentId : rentId}
        res.render('reviews/createReview');
    } catch (error) {
        console.log(error);
        res.statusCode(500).send();
    }
});


router.post('/submitReview', async (req, res) => {
    var reviewPostData = req.body;
    const errorList=[];

    if(!reviewPostData){
        //res.status(400).json({ error: 'You must provide review data' });
        validation
        return;
    }
    /*
    if(!reviewPostData.rating){
        res.status(400).json({ error: 'You must provide review rating' });
        return;
    }
    if(!reviewPostData.comments){
        res.status(400).json({ error: 'You must provide review comment' });
        return;
    }
    */

    try {
        validation.validateNumber(reviewPostData.rating);
    } catch (e) {
        errorList.push("Rating: " + error);
    }

    try {
        validation.validateString(reviewPostData.comments);
    } catch (e) {
        
    }

    /*
    if(!reviewPostData.dateOfReview){
        res.status(400).json({ error: 'You must provide review date of review' });
        return;
    }
    if(!reviewPostData.userId){
        res.status(400).json({ error: 'You must provide review user id' });
        return;
    }
    if(!reviewPostData.carId){
        res.status(400).json({ error: 'You must provide review car id' });
        return;
    }
    */
    
    //need userid and carid

    if(errorList.length>0){
        res.status(400);
        res.render("reviews/createReview",{
            hasErrors:true,
            errors:errorList,
            reviews: reviewPostData
        });
        return;
    }



    try {
        const  {rating, comments} = reviewPostData;
        let lenderReply = "";
        let userId = req.session.ids.userId;
        let dateOfReview = Date()
        let carId = req.session.ids.carId;
        const newReview = await reviewsData.createReview(rating, comments, lenderReply, dateOfReview, userId, carId, rentId);
        
        //get the jason renting info for carid and userid

        //console.log(newBook);
        //res.json(newReview);
        const perUserReviews = await reviewsData.getReviewsPerUser(userId);

        res.render("reviews/userReviews", {
            success: true,
            reviews: newReview,
            allReviewsFlag: true,
            message: "Review Created Successfully",
            id: newCar._id
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});




router.patch('/:id', async (req, res) => {
    const requestReviewData = req.body;
    
    if(Object.keys(requestReviewData).length !== 0){
        try {
            const updatedReview = await reviewsData.updateReview(req.params.id, requestReviewData.lendersReply);
            res.json(updatedReview);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    } else {
        res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
    }

});




router.delete('/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).json({ error: 'You must Supply and ID to delete' });
        return;
    }

    try {
        await reviewsData.getReviewById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }

    try {
        const deletedReview = await reviewsData.removeReview(req.params.id);
        res.json(deletedReview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;
const express = require('express');
const { reviews } = require('../config/mongoCollections');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;


router.get('/:id', async(req, res) => {
    try {
        let review = await reviewsData.getReviewById(req.params.id);
        res.json(review);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
});


router.get('/', async (req, res) => {
    try {
        let reviewsList = await reviewsData.getAllReviews();
        res.json(reviewsList);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
});


router.post('/', async (req, res) => {
    var reviewPostData = req.body;
    
    if(!reviewPostData){
        res.status(400).json({ error: 'You must provide review data' });
        return;
    }
    if(!reviewPostData.rating){
        res.status(400).json({ error: 'You must provide review rating' });
        return;
    }
    if(!reviewPostData.comments){
        res.status(400).json({ error: 'You must provide review comment' });
        return;
    }
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
    

    try {
        const  {rating, comments, dateOfReview, userId, carId} = reviewPostData;
        let lenderReply = "";
        const newReview = await reviewsData.createReview(rating, comments, lenderReply, dateOfReview, userId, carId);
        //console.log(newBook);
        res.json(newReview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


router.patch('/:id', async (req, res) => {
    const requestReviewData = req.body;
    /*{
    "lendersReply": "Hello im a lender"
    }*/
    
    if(Object.keys(requestReviewData).length !== 0){
        try {
            
            //console.log(requestReviewData.lendersReply);
            const updatedReview = await reviewsData.updateReview(req.params.id, requestReviewData.lendersReply);
            //console.log("Hello2");
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
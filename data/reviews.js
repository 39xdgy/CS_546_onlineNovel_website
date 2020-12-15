
let { ObjectID } = require("mongodb"); 
const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;

const carInfo = require('./cars');
const userInfo = require('./users');


const usersCollection = mongoCollections.users;
const carsCollection = mongoCollections.cars;

let exportedMethods = {
    async getReviewById(id) {
        id = id.toString();
        if(!id) throw "Pass id to fetch the data";
        if(typeof id !== 'string' || id.length === 0 || id.length !== 24) throw "The id should be an non empty string";
        let parsedID = ObjectID(id);
    
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne(parsedID);
        if(!review) throw 'Book not found';
        review._id = (review._id).toString();
        return review;
    
    },
    
    
    async getAllReviews() {
        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find().toArray();
        if(!reviewList) throw "No books in the system";
        reviewList.forEach((val) => {
            val._id = (val._id).toString();
        })
        return reviewList;
    },

    async getReviewsPerUser(userId){
        userId = userId.toString();
        if(!userId) throw "Pass id to fetch the data";
        if(typeof userId !== 'string' || userId.length === 0 || userId.length !== 24) throw "The id should be an non empty string";

        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({'userId':userId}).toArray();

        if(!reviewList) throw "No books in the system";
        reviewList.forEach((val) => {
            val._id = (val._id).toString();
        })

        return reviewList;
    },
    
    async getreviewsPerCar(carId){
        carId = carId.toString();
        if(!carId) throw "Pass id to fetch the data";
        if(typeof carId !== 'string' || carId.length === 0 || carId.length !== 24) throw "The id should be an non empty string";

        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({"carId": carId}).toArray();

        if(!reviewList) throw "No books in the system";
        reviewList.forEach((val) => {
            val._id = (val._id).toString();
        })

        return reviewList;
    },

    async createReview(rating, comment, lenderReply, dateOfReview, userId, carId, rentId) {
        //console.log("helloaboce errors")
        if(!rating || !comment || !dateOfReview ||!userId || !carId) throw "Input not provided";
        if(typeof rating !== 'number') throw 'Rating should be number';
        if(typeof comment  !== 'string' || comment.length === 0) throw 'The comments should be an non empty string';
        //if(typeof lenderReply  !== 'string') throw 'The rating should be a string';
        //if(typeof dateOfReview  !== 'string') throw 'The date of review should be string';
        //if(typeof userId  !== 'string' || userId.length !== 24 || userId.length === 0) throw 'The userid should be an non empty string';
        //if(typeof carId  !== 'string' || carId.length !== 24 || carId.length === 0) throw 'The carid should be an non empty string';
        //console.log("hello4");
        //[month, day, year] = dateOfReview.split("/");
        
        //car infor
        const car = await carInfo.getCarById(carId);
        //userInfo
        const user = await userInfo.getUserById(userId);


        let newReview = {
            rating: rating,
            comment: comment,
            lendersReply: lenderReply,
            dateOfReview: dateOfReview,
            userId: userId,
            userName: user.firstName + " " + user.lastName,
            carId: carId,
            carName: car.brand + " " + car.model,
        }
        //console.log("hello5")
    
        const reviewCollections = await reviews();
        const insertedInfo = await reviewCollections.insertOne(newReview);
        if(insertedInfo.insertCount === 0) throw "Error: counld not add renting info";
        const newId = insertedInfo.insertedId;
        const new_review = await this.getReviewById(newId.toString());
        

        let users = await usersCollection();
        let userUpdate = await users.updateOne({_id:ObjectID(new_review.userId)},{ $push: { reviews: (new_review._id).toString()}});


        let cars = await carsCollection();
        let carUpdate = await cars.updateOne({_id:ObjectID(new_review.carId)},{ $push: { reviews: (new_review._id).toString()}});


        return new_review;
    
    },
    
    async updateReview(id, lendersReply){
        id = id.toString();
        if(!id) throw 'Provide ID to search a book';
        if(typeof id !== 'string' || id.length === 0) throw 'Id should be a non empty string';
        if(id.length !== 24) throw 'Not a valid ID';
        let parsedID = ObjectID(id);
        //console.log("hello0");
        
        if(!lendersReply) throw "You must provide lenders reply";
        //console.log("hello1");
        if((lendersReply).length !== 0){
            //console.log("Hello2");
            const reviewCollection = await reviews();
            const updatedInfo = await reviewCollection.updateOne({_id: parsedID}, {$set: {lendersReply: lendersReply}});

            if(!updatedInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
        }
        return await this.getReviewById(id);
    },

    async removeReview(id) {
        if(!id) throw 'Provide ID to search a review';
        id = id.toString();
        if(typeof id !== 'string' || id.length === 0) throw 'Id should be a non empty string';
        if(id.length !== 24) throw 'Not a valid ID';
        let parsedID = ObjectID(id);
    
        var review = await this.getReviewById(id);
    
        const reviewCollection = await reviews();
        const deleteInfo = await reviewCollection.removeOne({_id: parsedID});
        if(deleteInfo.deletedCount === 0) throw `Could not delete review with id of ${parsedID}`;

        let user = await usersCollection();
        let userUpdate = await user.updateOne({_id:ObjectID(review.userId)},{ $pull: { reviews: (review._id).toString()}});


        let car = await carsCollection();
        let carUpdate = await user.updateOne({_id:ObjectID(review.carId)},{ $pull: { reviews: (review._id).toString()}});

    
        return {reviewID: id, deleted: true};   
        //return true;
    }
}


module.exports = exportedMethods;
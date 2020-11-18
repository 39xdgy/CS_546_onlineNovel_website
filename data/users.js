const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;
const {ObjectID} = require("mongodb");
const validate = require("./validate");

//fetching user with id
async function getUserById(id){

    let parsedId = ObjectID(id);
    const userCollections = await users();
    const user = await userCollections.findOne({_id:parsedId});
    if(user===null) throw `Could not find any user for id ${id}`;
    user._id = user._id.toString();
    return user;
}

/*//fetching user with Emailid
async function getUserByEmailId(emailIDParam){
    const userCollections = await users();
    const user = await userCollections.findOne({email:emailIDParam});
    if(user===null) throw `Could not find any user for id ${emailIDParam}`;
    user._id = user._id.toString();
    return user;
}*/

//getting all the users
async function getAllUsers(){
    const userCollections = await users();
    const users = await userCollections.find({}).toArray();
    return users; 
}

//login function
async function login(emailIDParam,password){
    let loginResult = false;
    const userCollections = await users();
    const user = await userCollections.findOne({emailID:emailIDParam});
    if(user===null) throw `User not available for the User Id ${emailID}`;
    loginResult = await bcrypt.compare(password,user.hashedPassword);
    if(loginResult) return user;
    else throw `Invalid Password ${password}`;
}

// creating a new user @SmitaRath
async function createUser(userObject){

    const userDob = validate.validateDate(userObject.dob);

    // hashing password @SmitaRath
    const hash = await bcrypt.hash(userObject.password,saltRounds);
    //creating new user object @SmitaRath
    const newUser = {
        firstName : userObject.firstName,
        lastName : userObject.lastName,
        dob : userDob,
        emailID : userObject.emailID,
        driverLicense : userObject.driverLicense,
        profilePicture : userObject.profilePicture,
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip,
        hashedPassword : hash,
        reviews : [],
        rentedCar : "",
        postedCars : [],
        pastRentedCars : [],
        savedCars : []
    }

    const userCollections = await users();
    const insertedInfo = await userCollections.insertOne(newUser);
    if(insertedInfo.insertedCount===0) throw `New User cannot be added`;

    const addedNewUser = await getUserById(insertedInfo.insertedId.toString());
    return addedNewUser;
}

//updating user
async function updateUser(userObject){
    let userDob = validate.validateDate(userObject.dob);
    let parsedId = ObjectID(userObject.id);
    const updatedUser = {
        firstName : userObject.firstName,
        lastName : userObject.lastName,
        dob : userDob,
        profilePicture : userObject.profilePicture,
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip
    }
    const userCollections = await users();
    const updatedInfo = await userCollections.updateOne({ _id: parsedId },{ $set: updatedUser});
    if(updatedInfo.modifiedCount===0) throw `Update is not successful, kindly provide new details`;

    const modifiedUser = await getUserById(userObject.id);
    return modifiedUser;
}

module.exports={
    login,
    createUser,
    updateUser,
    getUserById,
    getAllUsers
}
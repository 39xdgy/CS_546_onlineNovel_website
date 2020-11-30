const mongoCollections = require('../config/mongoCollections');
const usersColl = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 12;
const {ObjectID} = require("mongodb");
const validate = require("./validate");

//fetching user with id
async function getUserById(id){

    let parsedId = ObjectID(id);
    const userCollections = await usersColl();
    const user = await userCollections.findOne({_id:parsedId});
    if(user===null) throw `Could not find any user for id ${id}`;
    user._id = user._id.toString();
    user.dob=validate.formatDateInString(user.dob);
    return user;
}

//fetching user with Emailid
/*async function getUserByEmailId(emailIDParam){
    const userCollections = await users();
    const user = await userCollections.findOne({emailID:emailIDParam});
    if(user===null) throw `Could not find any user for id ${emailIDParam}`;
    user._id = user._id.toString();
    return user;
} */

//getting all the users
async function getAllUsers(){
    const userCollections = await usersColl();
    const users = await userCollections.find({},{ projection: { _id: 0, emailID: 1,driverLicense:1}}).toArray();
    return users; 
}

//login function
async function login(emailIDParam,password){
    let loginResult = false;
    const userCollections = await usersColl();
    const user = await userCollections.findOne({emailID:emailIDParam});
    if(user===null) throw `Email Address or password is invalid`;
    loginResult = await bcrypt.compare(password,user.hashedPassword);
    if(loginResult) return user;
    else throw `Email address or password is invalid`;
}


async function addProfilePicture(id, profilePicture) {
    const userCollection = await usersColl();
    let parsedId = ObjectID(id);
    let updatedUserData = {};
    updatedUserData.profilePicture = profilePicture;
    const updateInfoUser = await userCollection.updateOne({ _id: parsedId }, { $set: updatedUserData });
    const updatedUser = await getUserById(id);
    return updatedUser;
}

// creating a new user @SmitaRath
async function createUser(userObject){

    validate.validateString(userObject.firstName);
    if(userObject.lastName.trim()){
        validate.validateString(userObject.lastName);
        userObject.lastName=userObject.lastName.trim();
    }
    const userDob = validate.validateDate(userObject.dob);
    validate.validateEmailId(userObject.emailID);
    validate.validateDriverLicenseNumber(userObject.driverLicense,userObject.state);
    validate.validateString(userObject.zip);

    // hashing password @SmitaRath
    const hash = await bcrypt.hash(userObject.password,saltRounds);

    //creating new user object @SmitaRath
    const newUser = {
        firstName : userObject.firstName.trim(),
        lastName : userObject.lastName,
        dob : userDob,
        emailID : userObject.emailID.toLowerCase(),
        driverLicense : userObject.driverLicense.toUpperCase(),
        profilePicture : "",
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

    const userCollections = await usersColl();
    const insertedInfo = await userCollections.insertOne(newUser);
    if(insertedInfo.insertedCount===0) throw `New User cannot be added`;

    const addedNewUser = await getUserById(insertedInfo.insertedId.toString());
   // addedNewUser.dob=validate.formatDateInString(addedNewUser.dob);
    return addedNewUser;
}

//updating user
async function updateUser(userObject,id){
    let parsedId = ObjectID(id);

    validate.validateString(userObject.firstName);
    if(userObject.lastName.trim()){
    validate.validateString(userObject.lastName);
    userObject.lastName=userObject.lastName.trim();
    }
    const userDob = validate.validateDate(userObject.dob);
    validate.validateDriverLicenseNumber(userObject.driverLicense,userObject.state);
    validate.validateString(userObject.zip);

    const updatedUser = {
        firstName : userObject.firstName.trim(),
        lastName : userObject.lastName,
        dob : userDob,
        driverLicense:userObject.driverLicense.toUpperCase(),
        city : userObject.city,
        state : userObject.state,
        zip : userObject.zip

    }
    const userCollections = await usersColl();
    const updatedInfo = await userCollections.updateOne({ _id: parsedId },{ $set: updatedUser});

    const modifiedUser = await getUserById(id);
  //  modifiedUser.dob=validate.formatDateInString(modifiedUser.dob);
    return modifiedUser;
}

module.exports={
    login,
    createUser,
    updateUser,
    getUserById,
    getAllUsers,
    addProfilePicture
}
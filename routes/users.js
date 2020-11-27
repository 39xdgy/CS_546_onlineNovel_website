const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const usersData = dataInfo.users;
const validation = dataInfo.validate;
const multer = require("multer");
const path = require('path');
const upload = multer({ dest: 'public/uploads' });
const fs = require('fs');
const axios = require('axios');
const { default: Axios } = require("axios");

router.get('/upload/profilepic',async(req,res)=>{
    res.render("users/uploadProfilePic");
})

router.post('/upload/profilepic', upload.single('profilePicture'), async (req, res) => {
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString('base64');
  let userId = "5fac6dc0108d0f5ce003fefa";
  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, 'base64')
}

  const addingProfilePicture = await usersData.addProfilePicture(userId, finalImg);
  res.contentType('image/jpeg');
  res.send(addingProfilePicture.profilePicture.image.buffer);
});

router.get("/createUser", async(req,res)=>{
    try{
    const allUsers = await usersData.getAllUsers();
    res.render("users/usercreation",{users:allUsers})
    //res.json(allUsers);
    }
    catch(error){
        console.log(error);
        res.status(500).send();
    }
});

router.post("/createUser", async(req,res)=>{
    const newUserData = req.body;
    const errorList=[];
    let allUsers;
    try{
    allUsers = await usersData.getAllUsers();
    }
    catch(error){
        console.log(error);
    }
    try{
        validation.validateString(newUserData.firstName);
    }
    catch(error){
        errorList.push("First Name: " + error);
    }
    try{
        validation.validateString(newUserData.lastName);
    }
    catch(error){
        errorList.push("Last Name: " + error);
    }
    try{
        validation.validateDate(newUserData.dob);
    }
    catch(error){
        errorList.push("Date Of Birth: " + error);
    }

    let existingUsername;
    try{
         existingUsername = allUsers.find( obj => {
            return obj.emailID === newUserData.emailID.toLowerCase()
            });
        if(existingUsername) throw 'Sent Parameter already present, use some other email address';
        validation.validateEmailId(newUserData.emailID);
    }
    catch(error){
        
        errorList.push("Email Address: "+error);
    }
 
    try{
        validation.validateString(newUserData.password);
        validation.validateString(newUserData.confirm);
        if(newUserData.password!=newUserData.confirm)
            throw `Password and confirm password are not same`;
    }
    catch(error){
        errorList.push(error);
    }

    try{
        validation.validateString(newUserData.zip);
        const { data } = await Axios.get("http://ziptasticapi.com/"+newUserData.zip);
        newUserData.city=data.city;
        newUserData.state=data.state;
    }
    catch(error){
        errorList.push("Zip: " + error);
    }

    try{
        let existingDriverLicense = allUsers.find( obj => {
            return obj.driverLicense === newUserData.driverLicense.toUpperCase()
            });
        if(existingDriverLicense) throw "Sent Parameter already present, use some other Driver license no.";
        validation.validateDriverLicenseNumber(newUserData.driverLicense,newUserData.state);
    }
    catch(error){
        errorList.push("Driver's License: " + error);
    }

    if(errorList.length>0){
        res.render("users/usercreation",{
            hasErrors:true,
            errors:errorList,
            users:newUserData
        });
        return;
    }
    
    try{
        const newUser = await usersData.createUser(newUserData);
        res.json(newUser);
    }
    catch(error){
        console.log(error);
        res.status(400).json({Error : error});
    }
});

router.get("/login", async(req,res)=>{
    try{
        const allUsers = await usersData.getAllUsers();
        res.json(allUsers);
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/login", async(req,res)=>{
    const userData=req.body;
    try{
        const user = await usersData.login(userData.emailID, userData.password);
        res.json(user);
    }
    catch(error){
        res.status(400).json({Error:error});
    }
});

router.get("/editUser/:id", async(req,res)=>{
    try{
        const user = await usersData.getUserById(req.params.id);
        res.json(user);
    }
    catch(error){
        res.status(500).send();
    }
});

router.put("/editUser", async(req,res)=>{
    const userData = req.body;
    try{
        const user = await usersData.updateUser(userData);
        res.json(user);
    }
    catch(error){
        res.status(400).json({Error:error});
    }
});

module.exports = router;
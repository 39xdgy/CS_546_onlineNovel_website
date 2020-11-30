const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const usersData = dataInfo.users;
const validation = dataInfo.validate;
const multer = require("multer");
const path = require('path');
const upload = multer({ dest: 'public/uploads' });
const fs = require('fs');
const { default: Axios } = require("axios");
const validate = require("../data/validate");


router.post('/upload/profilepic', upload.single('profilePicture'), async (req, res) => {
  
    let userId = req.session.AuthCookie; 
  try{ 
  let str = req.file.originalname;
  let index = str.indexOf(".");
  let extension = str.substr(index+1,str.length-1);
  if(extension.toLowerCase()!="png" && extension.toLowerCase()!="jpg")
     throw "Kindly upload png or jpg file";
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString('base64');
  
  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, 'base64')
}

  const addingProfilePicture = await usersData.addProfilePicture(userId, finalImg);
  res.redirect('/users/editUser');
}
catch(e){
    const user = await usersData.getUserById(userId);
    res.render("users/userProfile",{users:user,editFlag:true,id:userId,error:e});
}
});

router.get('/profilepic/:id', async (req, res) => {
    const getUser = await usersData.getUserById(req.params.id);
    const profilepicData = getUser.profilePicture;
    if(profilepicData == ""){
      return res.status(400).send({
        message: 'No Profile Pic Found!'
     })
    } else {
      res.contentType('image/jpeg');
      res.send(profilepicData.image.buffer);
    }
    return;
  });

router.get("/createUser", async(req,res)=>{
    try{
    res.render("users/usercreation")
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
    if(newUserData.lastName.trim())
    {
        try{
            validation.validateString(newUserData.lastName);
        }
        catch(error){
            errorList.push("Last Name: " + error);
        }
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
        if(data.error) 
        {
        newUserData.city="";
        newUserData.state="";
        throw 'Sent Parameter is invalid';
        }
        else{
            newUserData.city=data.city;
        newUserData.state=data.state;
        }
    }
    catch(error){
        errorList.push("Zip: " + error);
    }

    try{
        let existingDriverLicense = allUsers.find( obj => {
            return obj.driverLicense === newUserData.driverLicense.toUpperCase()
            });
        if(existingDriverLicense) throw "Sent Parameter already present, use some other Driver license no.";
        if(newUserData.state)       
        validation.validateDriverLicenseNumber(newUserData.driverLicense,newUserData.state);
    }
    catch(error){
        errorList.push("Driver's License: " + error);
    }

    if(errorList.length>0){
        res.status(400);
        res.render("users/usercreation",{
            hasErrors:true,
            errors:errorList,
            users:newUserData
        });
        return;
    }
    
    try{
        const newUser = await usersData.createUser(newUserData);
        req.session.AuthCookie=newUser._id;
        res.render("users/userProfile",{
            success:true,
            users:newUser,
            profileFlag:true,
            message:"Profile created successfully",
            id:newUser._id
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({Error : error});
    }
});

router.get("/login", async(req,res)=>{
    try{
        res.render("users/login");
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/login", async(req,res)=>{
    const userData=req.body;
    try{
    validation.validateEmailId(userData.emailID);
    }
    catch(error){
        res.status(400);
        res.render("users/login",{error:true,users:userData,message:"Email Id: " +error});
        return;
    }
    try{
        const user = await usersData.login(userData.emailID, userData.password);
        req.session.AuthCookie=user._id;
        res.render("users/userProfile",{layout:null,profileFlag:true,users:user,id:user._id});
        //res.redirect("/users/profile");
    }
    catch(error){
        res.status(400);
       // res.render("users/login",{layout:null,error:true,users:userData,message:error});
        res.json({message:error});
    }
});

router.get("/profile", async(req,res)=>{
    let userId = req.session.AuthCookie;
    try{
        const user = await usersData.getUserById(userId);
        res.render("users/userProfile",{users:user,profileFlag:true,id:userId});
    }
    catch(error){
        res.status(500).send();
    }
});

router.get("/editUser", async(req,res)=>{
    let userId = req.session.AuthCookie;
    try{
        const user = await usersData.getUserById(userId);
        res.render("users/userProfile",{users:user,editFlag:true,id:userId});
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/editUser", async(req,res)=>{
    let userId = req.session.AuthCookie;
    const newUserData = req.body;
    const errorList=[];
    let allUsers;
    try{
    allUsers = await usersData.getAllUsers();
    existingUser = await usersData.getUserById(userId);
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
    if(newUserData.lastName.trim())
    {
        try{
            validation.validateString(newUserData.lastName);
        }
        catch(error){
            errorList.push("Last Name: " + error);
        }
    }
    try{
        validation.validateDate(newUserData.dob);
    }
    catch(error){
        errorList.push("Date Of Birth: " + error);
    }

    try{
        validation.validateString(newUserData.zip);
        const { data } = await Axios.get("http://ziptasticapi.com/"+newUserData.zip);
        if(data.error) {
        newUserData.city="";
        newUserData.state="";
        throw `Sent parameter is invalid`;
        }
        else{
            newUserData.city=data.city;
            newUserData.state=data.state;  
        }
    }
    catch(error){
        errorList.push("Zip: " + error);
    }

    if(newUserData.zip!=existingUser.zip && newUserData.driverLicense.toUpperCase()===existingUser.driverLicense){
        {
          errorList.push("Driver's License: " + "should be changed if zip code changes" );
        }
    }

    if(newUserData.driverLicense.toUpperCase()!=existingUser.driverLicense)
    {
    try{
        let existingDriverLicense = allUsers.find( obj => {
            return obj.driverLicense === newUserData.driverLicense.toUpperCase()
            });
        if(existingDriverLicense) throw "Sent Parameter already present, use some other Driver license no.";
        if (newUserData.state)
        validation.validateDriverLicenseNumber(newUserData.driverLicense,newUserData.state);
    }
    catch(error){
        errorList.push("Driver's License: " + error);
    }
}

    if(errorList.length>0){
        res.status(400);
        res.render("users/userProfile",{
            hasErrors:true,
            errors:errorList,
            users:newUserData,
            editFlag:true,
            id:existingUser._id
        });
        return;
    }

    try{
        const user = await usersData.updateUser(newUserData,userId);
        res.render("users/userProfile",{
            profileFlag:true,
            users:user,
            success:true,
            message:"Updated Successfully",
            id:user._id
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({Error:error});
    }
});

router.get("/logout", async(req,res)=>{
    req.session.destroy();
    res.json({Message:"Successfully Logged out"});
})

router.get("/saved", async(req,res)=>{
    res.json({Message:"Saved Cars"});
})

router.get("/rented", async(req,res)=>{
    res.json({Message:"rented Cars"});
})

router.get("/posted", async(req,res)=>{
    res.json({Message:"posted Cars"});
})

router.get("/history", async(req,res)=>{
    res.json({Message:"history Cars"});
})

module.exports = router;
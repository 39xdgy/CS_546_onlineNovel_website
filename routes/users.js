const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/createUser", async(req,res)=>{
    try{
    const allUsers = await users.getAllUsers();
    res.json(allUsers);
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/createUser", async(req,res)=>{
    const newUserData = req.body;
    try{
        const newUser = await users.createUser(newUserData);
        res.json(newUser);
    }
    catch(error){
        res.status(400).json({Error : error});
    }
});

router.get("/login", async(req,res)=>{
    try{
        const allUsers = await users.getAllUsers();
        res.json(allUsers);
    }
    catch(error){
        res.status(500).send();
    }
});

router.post("/login", async(req,res)=>{
    const userData=req.body;
    try{
        const user = await users.login(userData.emailID, userData.password);
        res.json(user);
    }
    catch(error){
        res.status(400).json({Error:error});
    }
});

router.get("/editUser/:id", async(req,res)=>{
    try{
        const user = await users.getUserById(req.params.id);
        res.json(user);
    }
    catch(error){
        res.status(500).send();
    }
});

router.put("/editUser", async(req,res)=>{
    const userData = req.body;
    try{
        const user = await users.updateUser(userData);
        res.json(user);
    }
    catch(error){
        res.status(400).json({Error:error});
    }
});

module.exports = router;
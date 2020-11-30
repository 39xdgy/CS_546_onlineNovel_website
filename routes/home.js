const express = require("express");
const router = express.Router();
const dataInfo = require("../data");

router.get("/", async(req,res)=>{
    res.render("home/welcome");
});

router.post("/zip", async(req,res)=>{
   //code for retruning the top rated cars for the zip code.
   res.json({Message:"under dev"});
});

module.exports=router;
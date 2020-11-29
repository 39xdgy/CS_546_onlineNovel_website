const express = require("express");
const router = express.Router();
const dataInfo = require("../data");

router.get("/", async(req,res)=>{
    res.render("home/welcome");
})

module.exports=router;
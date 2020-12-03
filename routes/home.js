const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const homeInfo = dataInfo.home;

router.get("/", async(req,res)=>{
    res.render("home/welcome");
});

router.post("/home", async(req,res)=>{
   const carList = await homeInfo.getTopRatedCars(req.body.zip);
   if(carList.length!=0)
   res.render("home/home",{cars:carList,availFlag:true});
   else
   res.render("home/home",{Message:"Cars are not available for the provided  zip code, try different zip code"});

});

router.get("/home", async(req,res)=>{
    res.render("home/home",{Message:"Search cars based on your preference"});
});

router.post("/home/search", async(req,res)=>{

    const carList = await homeInfo.getSearchResult(req.body);
    if(carList.length!=0)
    res.render("home/home",{cars:carList,availFlag:true});
    else
    res.render("home/home",{Message:"No search result found, try again !"});
    
});

module.exports=router;
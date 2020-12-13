const express = require("express");
const router = express.Router();
const dataInfo = require("../data");
const homeInfo = dataInfo.home;
const usersData = dataInfo.users;
const validation = dataInfo.validate;
const xss = require('xss');

let todayDate=new Date();
let today=validation.formatDateInString(todayDate);

router.get("/", async(req,res)=>{
    await usersData.updatePastRentedCars();
    res.status(200).render("home/welcome",{minDate:today});
});

router.post("/home", async(req,res)=>{
    xss(req.body.zip);
   const carList = await homeInfo.getTopRatedCars(req.body.zip);
   if(carList.length!=0){
    if(req.session.AuthCookie)
    res.status(200).render("home/home",{cars:carList,availFlag:true,login:true,minDate:today,sortFlag:true});
   else 
   res.status(200).render("home/home",{cars:carList,availFlag:true,minDate:today,sortFlag:true});
   }
   else{
    if(req.session.AuthCookie)
    res.render("home/home",{Message:"Cars are not available for the provided  zip code, try different zip code",login:true,minDate:today});
    else
    res.render("home/home",{Message:"Cars are not available for the provided  zip code, try different zip code",minDate:today});
}

});

router.get("/home", async(req,res)=>{
    if(req.session.AuthCookie)
    res.render("home/home",{Message:"Search cars based on your preference",login:true,minDate:today});
    else
    res.render("home/home",{Message:"Search cars based on your preference",minDate:today});
});

router.post("/home/search", async(req,res)=>{
    xss(req.body.zip);
    xss(req.body.type);
    xss(req.body.brand);
    xss(req.body.model);
    xss(req.body.fromDate);
    xss(req.body.toDate);
    
    if(!req.body.sort)
    {
        const carList = await homeInfo.getSearchResult(req.body);
        if(carList.length!=0)
        {
        req.session.searchData=carList;
        if(req.session.AuthCookie)
        res.render("home/home",{cars:carList,availFlag:true,sortFlag:true,login:true,minDate:today});
        else
        res.render("home/home",{cars:carList,availFlag:true,sortFlag:true,minDate:today});
        }
        else{
            if(req.session.AuthCookie)
            res.render("home/home",{Message:"No search result found, try again !",login:true,minDate:today});
            else
            res.render("home/home",{Message:"No search result found, try again !",minDate:today});
        }
    }
    else
    {
        let sortData
        let searchData=req.session.searchData;  
        if(req.body.sort==="rating"){
        sortData= searchData.sort((a,b)=>{
            return b.rating-a.rating;
        });
        }
        else if(req.body.sort==="price"){
            sortData= searchData.sort((a,b)=>{
                return a.price-b.price;
            });
        }
        if(req.session.AuthCookie)
        res.render("home/home",{cars:sortData,availFlag:true,sortFlag:true,login:true,minDate:today});
        else
        res.render("home/home",{cars:sortData,availFlag:true,sortFlag:true,minDate:today});
    }
    
});

module.exports=router;
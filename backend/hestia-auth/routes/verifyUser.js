const router = require("express").Router();
const User = require("../model/User");

router.post("/",async(req,res)=>{
   const user = await User.findOne({where:{email:req.body.email}});
   if(user===null){
       return res.status(404).json({"Error":"User Not Found"});
   }
   if(user.verified === false){
       return res.status(401).json({"Status":"User unverified"})
   }
   res.json({"Status":"User Verified"});
});

module.exports = router;
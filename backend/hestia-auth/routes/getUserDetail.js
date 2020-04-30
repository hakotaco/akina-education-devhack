const router = require('express').Router();
const User = require('../model/User');

router.post("/",async(req,res)=>{
    const user = await User.findOne({where:{email:req.body.email}});
    if(user===null){
        return res.status(404).json({"Error":"User Not Found"});
    }
    res.json(user);
});

module.exports = router;
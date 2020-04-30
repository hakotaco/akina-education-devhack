const router = require("express").Router();
const User = require("../model/User");
const Verified = require("../model/Verified");

router.get("/:token",async(req,res)=>{
    const token = req.params.token;
    const data = await Verified.findOne({where:{token}});
    if(data===null){
        return res.status(400).render('notverified.ejs');
    }
    const exists = await User.findOne({where:{email:data.email}});
    if(exists===null){
        return res.status(404).render('notverified.ejs');
    }
    await User.update({verified:true},{where:{email:data.email}});
    res.render('verified.ejs');
});

module.exports = router;
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const gUser = require("../model/gUser");

router.post("/", async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = await gUser.findOne({where: {email}});
        if (user !== null) {
            const token = jwt.sign(
                {
                    _id: user.id
                },
                process.env.TOKEN_SECRET
            );
            res.json({"Token": token});
        } else {
            const guser = await gUser.create({
                name: name,
                email: email
            });
            const token = jwt.sign(
                {
                    _id: guser.id
                },
                process.env.TOKEN_SECRET
            );
            res.json({"Token": token});
        }
    } catch (err) {
        return res.json(err);
    }
});
module.exports = router;
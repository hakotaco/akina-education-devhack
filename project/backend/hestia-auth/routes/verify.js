const router = require("express").Router();
const jwt = require("jsonwebtoken");
router.post("/", (req, res) => {
    const token = req.body.Token;
    if (!token) {
        return res.status(401).json({valid: false});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, data) => {
        if (error) {
            return res.status(400).json({valid: false});
        } else {
            res.json({valid: true, userID: data._id});
        }
    })
});

module.exports = router;
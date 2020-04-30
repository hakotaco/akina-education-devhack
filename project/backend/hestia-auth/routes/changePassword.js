const router = require('express').Router();
const {Bcrypt} = require("bcrypt-rust-wasm");
const bcrypt = Bcrypt.new(parseInt(process.env.SALT_ROUNDS));
const PasswordChange = require("../model/PasswordChange");
const User = require("../model/User");
const {changePasswordValidation} = require("../validation");

router.route("/:token")
    .post(async (req, res) => {
        const {error} = changePasswordValidation(req.body);
        if(error){
            return res.status(400).json({"Error": error.details[0].message});
        }
        const token = req.params.token;
        const exists = await PasswordChange.findOne({where: {token: token}});
        if (exists === null) {
            return res.status(404).json({"Error": "User not found"});
        }

        const password = bcrypt.hashSync(req.body.password);
        await User.update({
            password: password
        }, {where: {email: exists.email}});
        res.json({"Status": "Password Successfully Updated"});
    })
    .get((req, res) => {
        res.render('forgot-password.ejs');
    });

module.exports = router;
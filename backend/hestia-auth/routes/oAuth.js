const express = require('express');
const app = require('express-promise-router');
const router = app();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportConf = require("../passport");
const passportGoogle = passport.authenticate('google-plus-token', {session: false});
const gUser = require("../model/gUser");

router.route("/")
    .post(passportGoogle, async (req, res) => {
        const name = req.user.displayName;
        const email = req.user.emails[0].value;
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
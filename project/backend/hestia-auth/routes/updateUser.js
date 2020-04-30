const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const {updateValidation} = require("../validation");
const sgMail = require('@sendgrid/mail');
const Verified = require('../model/Verified');
const cryptoRandomString = require('crypto-random-string');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {compiledFunctionUpdateEmail} = require("../compiledPug");
const Chats = require("../model/Chats");

router.post("/", async (req, res) => {
    const {error} = updateValidation(req.body);
    if (error) {
        return res.status(400).json({"Error": error.details[0].message});
    }
    try {
        const {name, email, phone} = req.body;
        const token = req.header('token');
        if (!token) {
            return res.status(401).json({Error: "Access is denied"});
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const exists = await User.findOne({where: {id: decoded._id}});
        if (exists === null) {
            return res.status(404).json({Error: "No such user exists"});
        }
        const exist = await User.findOne({where: {email: email}});
        if (exist!==null && exists.email!==exist.email) {
            return res.status(409).json({Error: "A user with this email already exists"});
        }
        await Chats.update({
            receiver_name: name
        }, {where: {request_receiver: decoded._id}});
        await Chats.update({
            sender_name: name
        }, {where: {request_sender: decoded._id}});
        if (email !== exists.email) {
            const token = cryptoRandomString({length: 200, type: 'url-safe'});
            await Verified.create({
                email: email,
                token: token
            });
            const text = "https://" + req.hostname + "/api/user/verifyEmail/" + token;
            const emailTemplate = compiledFunctionUpdateEmail({
                name: name,
                link: text
            });
            const msg = {
                to: email,
                from: 'dscvitvellore@gmail.com',
                subject: '[NO REPLY]Email Verification',
                html: emailTemplate
            };
            await sgMail.send(msg);
            await User.update({
                name: name,
                email: email,
                phone: phone,
                verified: false
            }, {where: {id: decoded._id}});
            return res.json({"Alert": "Your email has been updated. Please check your mail to verify it"});
        }
        await User.update({
            name: name,
            email: email,
            phone: phone,
        }, {where: {id: decoded._id}});
        return res.json({"Status": "All the details have been successfully updated."});
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;
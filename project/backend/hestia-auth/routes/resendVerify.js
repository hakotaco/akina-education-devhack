const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const Verified = require('../model/Verified');
const cryptoRandomString = require('crypto-random-string');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { compiledFunctionEmail } = require("../compiledPug");

router.post("/", async(req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const token = cryptoRandomString({ length: 200, type: 'url-safe' });
    await Verified.create({
        email: email,
        token: token
    });
    const text = "https://" + req.hostname + "/api/user/verifyEmail/" + token;
    const emailTemplate = compiledFunctionEmail({
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
    res.status(202).json({
        "Verify": "Email sent for verification"
    });
});

module.exports = router;
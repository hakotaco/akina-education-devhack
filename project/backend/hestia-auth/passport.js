const passport = require("passport");
const GooglePlusTokenStrategy = require("passport-google-plus-token");

passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile.displayName);
    console.log(profile.emails[0].value);
    done(null, profile);
}));
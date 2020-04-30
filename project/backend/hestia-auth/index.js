const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require('dotenv');
const db = require("./config/connection");
dotEnv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

db.authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log(err);
    });

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.listen(process.env.PORT, () => {
    console.log("Server is up and running");
});
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

const auth = require('./routes/auth');
const oAuth = require("./routes/oAuth");
const oAuthApp = require('./routes/oAuthApp');
const verify = require("./routes/verify");
const updateUser = require("./routes/updateUser");
const verifyEmail = require("./routes/verifyEmail");
const forgotPassword = require("./routes/forgotPassword");
const changePassword = require("./routes/changePassword");
const getUserDetail = require("./routes/getUserDetail");
const verifyUser = require("./routes/verifyUser");
const getDetailsById = require('./routes/getDetailsById');
const resendVerify = require("./routes/resendVerify");

app.use("/api/user", auth);
app.use("/api/user/oAuth", oAuth);
app.use("/api/user/oAuthApp", oAuthApp);
app.use("/api/user/verify", verify);
app.use("/api/user/updateUser", updateUser);
app.use("/api/user/verifyEmail", verifyEmail);
app.use("/api/user/forgotPassword", forgotPassword);
app.use("/api/user/changePassword",changePassword);
app.use("/api/user/getUserDetail",getUserDetail);
app.use("/api/user/verifyUser",verifyUser);
app.use("/api/user/getDetailsById", getDetailsById);
app.use("/api/user/resendVerify", resendVerify);
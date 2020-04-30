const pug = require("pug");

const compiledFunctionEmail = pug.compileFile('email.pug');
const compiledFunctionForgotPassword = pug.compileFile('forgotPassword.pug');
const compiledFunctionUpdateEmail = pug.compileFile('updateEmail.pug');

module.exports.compiledFunctionEmail = compiledFunctionEmail;
module.exports.compiledFunctionForgotPassword = compiledFunctionForgotPassword;
module.exports.compiledFunctionUpdateEmail = compiledFunctionUpdateEmail;
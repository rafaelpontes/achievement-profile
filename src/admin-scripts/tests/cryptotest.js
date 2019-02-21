// This is just a test of the md5 hash

const crypto = require("crypto");

var oi = crypto
            .createHash('md5')
            .update("student@institute.edu")
            .digest('hex');

console.log(oi)

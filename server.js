// server.js
var express = require('express');
var cors = require('cors');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://generalpeanut.herokuapp.com/");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
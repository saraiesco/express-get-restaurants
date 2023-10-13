const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants',async (request, response)=>{
    let yum = await Restaurant.findAll({});
    response.send(yum);
})



module.exports = app;
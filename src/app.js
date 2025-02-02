const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants',async (request, response)=>{
    let yum = await Restaurant.findAll({});
    response.send(yum);
})

//part 2
app.get('/restaurants/:id',async (request, response)=>{
    let id = request.params.id;
    let rest1 = await Restaurant.findByPk(id)
    response.json(rest1);
})


// //part 3

app.use(express.json())
app.use(express.urlencoded())

app.post('/restaurants',async (request, response)=>{
    // The information that you create (i.e. POST) will be contained in 
    // the body of the request trying to create the resource.
    try{
        const newRes = await Restaurant.create(request.body);
        if (!newRes) {
            throw new Error("Didn't create restaurant")
        }
        response.json(newRes)
    } catch (err){
        next(err);
    }
})

app.put('/restaurants/:id',async (request, response)=>{
    // The information that you update (i.e. PUT) will be contained 
    // in the body of the request trying to create the resource and be 
    // used on a specific restaurant through the route parameter of the 
    // request.
    try{
        const updatedRes = await Restaurant.update(request.body,{where: {id :request.params.id}});
        if (updatedRes[0] === 0) {
            throw new Error("Didn't update restaurant")
        }
        response.sendStatus(200)
    } catch (err){
        next(err);
    }
})

app.delete('/restaurants/:id',async (request, response)=>{
    // The information that you will delete will be contained in
    //  the route parameter of the request.
    try{
        const deleteRes = await Restaurant.destroy({where: {id : request.params.id}});
        if (deleteRes === 0) {
            throw new Error("Didn't delete restaurant")
        }
        response.sendStatus(200)
    } catch (err){
        next(err);
    }
})

module.exports = app;
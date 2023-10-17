const request = require("supertest")
const app = require("./src/app.js")
const Restaurant = require("./models/index.js")
const { db } = require('./db/connection');
const seedRestaurant = require("./seedData.js")

const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

// Test that GET /restaurants returns the correct restaurant data
test("GET /restaurants", async()=>{
    const response = await request(app).get("/restaurants")
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toEqual(true)
    expect(response.body.length).toBe(3)
    expect(response.body[0].name).toBe("AppleBees")
  });

// Verify that GET /restaurants/:id request returns the correct data.
test("GET /restaurants/:id", async()=>{
    const response = await request(app).get("/restaurants/2")
    expect(response.body.name).toEqual( "LittleSheep")
  });

// Test that POST /restaurants request returns the restaurants array has been updated with the new value.
test("POST /restaurants", async()=>{
    const response = await request(app)
    .post("/restaurants")
    .send({name:"Panda Express", location:"Austin", cuisine:"Fast Food"})
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toEqual("Panda Express")
  });
// Verify that PUT /restaurants/:id request updates the restaurant array with the provided value
test("Can PUT by Restaurant ID", async () => {
    const response = await request(app)
    .put("/restaurants/2")
    .send({name: "Sonic", location: "Chicago", cuisine:"Fast Food"})
    expect(response.statusCode).toBe(200)
    })
// Test that DELETE /restaurant/:id deletes the restaurant with the provided id from the array.
test("Can DELETE by Restaurant ID", async () => {
    const response = await request(app)
    .delete("/restaurants/2")
    expect(response.statusCode).toBe(200)
})
   
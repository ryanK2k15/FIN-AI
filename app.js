const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
var model = require('./loan-model.js');// require model from loan-model.js
var houseModel = require('./house-model.js');// require model from house-model.js
const tf = require('@tensorflow/tfjs-node');

const PORT = process.env.PORT;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/calculator', function (req, res) {
    res.render("calculator.html");
});

//post method that takes data from form and uses loan model to make a prediction - edited by Ryan
app.post('/calculator',function(req,res){
    console.log(req.body.gender);
    var gender = parseFloat(req.body.gender);
    var married = parseFloat(req.body.married);
    var graduated = parseFloat(req.body.graduated);
    var selfEmployed = parseFloat(req.body.selfEmployed);
    var income = parseFloat(req.body.income);
    var coIncome = parseFloat(req.body.coIncome);
    var amount = parseFloat(req.body.amount);
    var time = parseFloat(req.body.time);
    var creditHistory = parseFloat(req.body.creditHistory);
    var area = parseFloat(req.body.area);


    var dependents = parseFloat(req.body.dependents);

    var sample = [gender, married, graduated, selfEmployed, income, coIncome, amount, time, creditHistory, area, dependents]

    var prediction = model.predictSample(sample);

    console.log(sample);
    console.log(prediction);

    var p = Promise.resolve(prediction);

    /*  p.then(function(result) {
      if(result == 1)
          res.render("qualify");
      else
          res.send("You Do Not Qualify For This Loan");
      }); */

    p.then(function(result) {
        var profile = sample;
        res.render("qualify", {result: result, profile: sample});
    });

}); //end post method

app.get("/home", function (req, res) {
    res.render("index.html");
});

app.get("/value", function (req, res) {
    res.render("value.html");
});

//post method that takes data from form and uses house model to make a prediction - edited by Ryan
app.post('/value',function(req,res){
    console.log("POST");
    var bedrooms = parseFloat(req.body.bedrooms);
    var bathrooms = parseFloat(req.body.bathrooms);
    var sqfliving = parseFloat(req.body.sqfliving);
    var sqflot = parseFloat(req.body.sqflot);
    var floors = parseFloat(req.body.floors);
    var waterfront = parseFloat(req.body.waterfront);
    var view = parseFloat(req.body.view);
    var condition = parseFloat(req.body.condition);
    var grade = parseFloat(req.body.grade);
    var yrBuilt = parseFloat(req.body.yrBuilt);
    var renovated = parseFloat(req.body.renovated);
    var belowSqFt = parseFloat(req.body.belowSqFt);
    var aboveSqFt = sqfliving - belowSqFt;
    var waterfront = parseFloat(req.body.waterfront);
    var lat = parseFloat(req.body.lat);
    var longitude = parseFloat(req.body.long);

    var sample = [bedrooms, bathrooms, sqfliving, sqflot, floors, waterfront, view, condition, grade, aboveSqFt, belowSqFt, yrBuilt, renovated, lat, longitude]
    console.log(sample);
    h = houseModel.loadModel();
    h.then(model => {
        let prediction= model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
        console.log(prediction);
        var houseDetails = sample;
        res.render("housePrice", {value: prediction[0], houseDetails: houseDetails});
    });

}); //end post method

app.get("/SignUp", function (req, res) {
    res.render("signup.html");
});

app.get("/", function (req, res) {
    res.render("index.html");
});
app.get("/login", function (req, res) {
    res.render("login.html");
});
app.get("/chatbot", function (req, res) {
    res.render("chatbot.html");
});
app.get("/ml-reports", function (req, res) {
    res.render("ml-reports.html");
});
app.get("/businessIntelligence", function (req, res) {
    res.render("businessIntelligence.html");
});
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

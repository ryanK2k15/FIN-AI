const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
var model = require('./loan-model.js');// require model from loan-model.js
var houseModel = require('./house-model.js');// require model from loan-model.js
const tf = require('@tensorflow/tfjs-node');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.engine("html", require("ejs").renderFile);
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(cookieParser());

app.get('/calculator', function (req, res) {
    res.render("calculator.html");
});

//post method that takes data from form and uses loan model to make a prediction - edited by Ryan 
app.post('/calculator',function(req,res){
	console.log("POST");
   var gender = parseFloat(req.body.gender);
   var married = parseFloat(req.body.married);
   var graduated = parseFloat(req.body.graduated);
   var selfEmployed = parseFloat(req.body.selfEmployed);
   var income = parseFloat(req.body.income);
   var coIncome = parseFloat(req.body.coIncome);
   var amount = parseFloat(req.body.amount);
   var time = parseFloat(req.body.time);
   var creditHistory = parseFloat(req.body.creditHistory);
   var area = req.body.area;
   
   if(area == "Urban")
		area = 3;
	else if(req.body.area == "Semiurban")
		area = 2;
	else
		area = 1;
	
   var dependents = parseFloat(req.body.dependents);
   
   var sample = [gender, married, graduated, selfEmployed, income, coIncome, amount, time, creditHistory, area, dependents]
   
   var prediction = model.predictSample(sample);
   
   console.log(sample);
   console.log(prediction);
   //console.log(result);
   var p = Promise.resolve(prediction);
   
   p.then(function(result) {
	   console.log(result);
	if(result == 1)
		res.send("You Qualify For This Loan");
	else
		res.send("You Do Not Qualify For This Loan");
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
   var yrBuilt = parseFloat(req.body.yrBuilt);
   var renovated = parseFloat(req.body.renovated);
   var aboveSqFt = parseFloat(req.body.aboveSqFt);
   var belowSqFt = parseFloat(req.body.belowSqFt);
   var waterfront = parseFloat(req.body.waterfront);	
   
   var sample = [bedrooms, bathrooms, sqfliving, sqflot, floors, waterfront, view, condition, aboveSqFt, belowSqFt, yrBuilt, renovated]
	console.log(sample);
	h = houseModel.loadModel();
	h.then(model => {
		let prediction= model.predict(tf.tensor(sample, [1, sample.length])).arraySync();
		console.log(prediction);
		res.send(prediction[0])	
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
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

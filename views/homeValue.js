// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCrkF4FxZjRz1JBYpjSMlLklyXWqMzrF2U",
    authDomain: "finai-d69c1.firebaseapp.com",
    databaseURL: "https://finai-d69c1.firebaseio.com",
    projectId: "finai-d69c1",
    storageBucket: "finai-d69c1.appspot.com",
    messagingSenderId: "386537276659",
    appId: "1:386537276659:web:c07be9a9f764a784b4a386",
    measurementId: "G-PJBCD6EHDH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('valuecheck');

document.getElementById('valueForm').addEventListener('submit', submitForm);

function submitForm(e){
   // e.preventDefault();

    var bedrooms = getInputVal("bedrooms");
    var bathrooms = getInputVal("bathrooms");
    var sqfliving = getInputVal("sqfliving");
    var sqflot = getInputVal("sqflot");
    var floors = getInputVal('floors');
    var waterfront = getInputVal('waterfront');
    var view = getInputVal('view');
    var condition = getInputVal('condition');
    var zip = getInputVal("zip");
    var energy = getInputVal('energy');
    var renovated = getInputVal('renovated');
    var aboveSqFt = getInputVal('aboveSqFt');
    var belowSqFt = getInputVal('belowSqFt');
    saveMessage(bedrooms, bathrooms, sqfliving, sqflot, floors, waterfront, view, condition, zip, energy, renovated, aboveSqFt, belowSqFt);
}

function getInputVal(id){
    return document.getElementById(id).value;
}

function getInputValName(name){
    var temp = document.getElementsByName(name);
    for (var i = 0, length = temp.length; i < length; i++) {
        if (temp[i].checked) {
            return temp[i].value;
        }
    }
}

function saveMessage(bedrooms, bathrooms, sqfliving, sqflot, floors, waterfront, view, condition, zip, energy, renovated, aboveSqFt, belowSqFt){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        sqfliving: sqfliving,
        sqflot: sqflot,
        floors: floors,
        waterfront: waterfront,
        view: view,
        condition: condition,
        zip: zip,
        energy: energy,
        renovated: renovated,
        aboveSqFt: aboveSqFt,
        belowSqFt: belowSqFt
    });
}

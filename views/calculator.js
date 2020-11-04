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

var messagesRef = firebase.database().ref('calculation');

//document.getElementById('calcForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    var gender = getInputValName("gender");
    var married = getInputValName("married");
    var graduated = getInputValName("graduated");
    var selfEmployed = getInputValName("selfEmployed");
    var income = getInputVal('income');
    var coIncome = getInputVal('coIncome');
    var amount = getInputVal('amount');
    var time = getInputVal('time');
    var creditHistory = getInputValName("creditHistory");
    var area = getInputVal('area');

    saveMessage(gender, married, graduated, selfEmployed, income, coIncome, amount, time, creditHistory, area);
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

function saveMessage(gender, married, graduated, selfEmployed, income, coIncome, amount, time, creditHistory, area){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        gender: gender,
        married: married,
        graduated: graduated,
        selfEmployed: selfEmployed,
        income: income,
        coIncome: coIncome,
        amount: amount,
        time: time,
        creditHistory: creditHistory,
        area: area
    });
}

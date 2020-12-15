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

var messagesRef = firebase.database().ref('registrations');

document.getElementById('signUpForm').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    var email = getInputVal("email");
    var email2 = getInputVal("confirmedEmail");
    var password = getInputVal("password");
    var password2 = getInputVal("repeatPassword");
    var name = getInputVal("name");
    var lastName = getInputVal("lastName");
    var address = getInputVal('address');
    var number = getInputVal('number');
    var company = getInputVal('company');
    var username = getInputVal('username');
    if(!validation(email, email2, password, password2)){
        process.exit(1);
    };
    saveMessage(email, password, name, lastName, address, number, company, username);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    alert("You have successfully create an account");
}

function getInputVal(id){
    return document.getElementById(id).value;
}

function saveMessage(email, password, name, lastName, address, number, company, username){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email,
        password: password,
        name: name,
        lastName: lastName,
        address: address,
        number: number,
        company: company,
        username: username
    });
}

function validation(email, email2, password, password2){
    let a = true;
    if(email !== email2){
        window.alert("Email is not same!");
        a = false;
    }
    if(password !== password2){
        window.alert("Password is not same!");
        a = false;
    }
    return a;
};

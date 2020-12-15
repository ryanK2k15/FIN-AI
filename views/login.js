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
    var password = getInputVal("password");
    var name = getInputVal("name");
    var lastName = getInputVal("lastName");
    var address = getInputVal('address');
    var number = getInputVal('number');
    var company = getInputVal('company');
    var username = getInputVal('username');

    saveMessage(email, password, name, lastName, address, number, company, username);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
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

btnLog.addEventListener('click', e => {
    const email = txtLogin.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
        .then(user => {
            console.log(user);
            location.replace('qualify.html');
        })
        .catch(e => {
            console.log(e.message);
        });
});
btnFacebook.addEventListener('click', e => {
    const auth = firebase.auth();
    const fb = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(fb)
        .then(() => {
            window.location.assign('qualify.html');
        })
        .catch(error =>{
            console.error(error);
        })
});

btnGoogle.addEventListener('click', e => {
    const auth = firebase.auth();
    const gg = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(gg)
        .then(() => {
            window.location.assign('qualify.html');
        })
        .catch(error =>{
            console.error(error);
        })
});

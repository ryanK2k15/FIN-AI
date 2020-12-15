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
var user = firebase.auth().currentUser
var userDataRef = firebase.database().ref("AppRegistered").orderByKey();
const accountDetails = document.querySelector('.account-details')
//module.export =
    async function start(){
    userDataRef.once("value").then(async function(snapshot) {
        var user = firebase.auth().currentUser;
        var company;
        getCompany(user.email, res => {
            company = res;
        });
        var i = 1;
        setTimeout(() => snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().company === company) {

                const html =`
                    <div> <b>${i++}</b> <b>: User:</b> ${childSnapshot.val().name} <b>Email:</b> ${childSnapshot.val().email} <b>Gender:</b> ${childSnapshot.val().gender} <b>Company:</b> ${childSnapshot.val().company} 
                `;
                accountDetails.innerHTML += html;
            }
        }), 2000);
    });
}

function getCompany(userEmail, callback){
    var cmp = firebase.database().ref("registrations").orderByKey();
    cmp.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().email === userEmail) {
                callback(childSnapshot.val().company);
            }
        });
    });
}
userName = document.querySelector('.userName')
async function name(){
    userDataRef.once("value").then(async function(snapshot) {
        var user = firebase.auth().currentUser;
        var company;
        getUsername(user.email, res => {
            company = res;
        });
        setTimeout((function(childSnapshot) {
            if(company === undefined){
                company = "Social Media User"
            }
                const html =`${company}`;
            userName.innerHTML +='Login as: ' + html;
        }), 300);

    });
}
function getUsername(userEmail, callback){
    var cmp = firebase.database().ref("registrations").orderByKey();
    cmp.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().email === userEmail) {
                callback(childSnapshot.val().name);
            }
        });
    });
}

start()
name()



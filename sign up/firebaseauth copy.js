// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import{getAuth, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
import {getFirestore, setDoc,doc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// Initialize Firebase


const firebaseConfig = {
    apiKey: "AIzaSyC5z-RWoa7pxkw4AxZwQCBive0a2fKWE4M",
    authDomain: "authentication-b863b.firebaseapp.com",
    databaseURL: "https://authentication-b863b-default-rtdb.firebaseio.com",
    projectId: "authentication-b863b",
    storageBucket: "authentication-b863b.appspot.com",
    messagingSenderId: "177022509368",
    appId: "1:177022509368:web:c0dbfcbe0da06d514161cd"
};

const app = initializeApp(firebaseConfig);

//2
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
//   import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
//   import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCCXnTWjMmStJRYUXISIRJM4iIH9tPqO0c",
//     authDomain: "login-b0cbb.firebaseapp.com",
//     projectId: "login-b0cbb",
//     storageBucket: "login-b0cbb.appspot.com",
//     messagingSenderId: "851259146025",
//     appId: "1:851259146025:web:76c09815b8eddbf68c4138"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);



// const auth = getAuth(app);
// auth.languageCode = 'en';
// const provider = new GoogleAuthProvider();
// const googleLogin = document.getElementById('google-login-btn');
// googleLogin.addEventListener('click',function(){
//     signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     // The signed-in user info.
//     const user = result.user;
//     localStorage.setItem('loggedInUserId', user.uid);
//     window.location.href='homepage.html';
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });

// })
// const auth = getAuth();
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },2000);
}
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click',(event)=>
{
    event.preventDefault();
    const fullName = document.getElementById('fName').value;
    const email = document.getElementById('rEmail').value;
    const lichness = document.getElementById('rLichess').value;
    const mobile = document.getElementById('rMobile').value;
    const password = document.getElementById('rPassword').value;
    const auth=getAuth();
    const db=getFirestore();
    // console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        console.log("hello");
        const user=userCredential.user;
        console.log(user);
        const userData={
            fullName: fullName,
            email: email,
            lichness: lichness,
            mobile: mobile,
            password: password
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        // console.log("hello1");
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
});

const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
 
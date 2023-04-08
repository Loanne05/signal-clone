import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC0rVfznefy_drcp8Vsi75RXS08NG1uQTc",
    authDomain: "signal-clone-build-9ddc1.firebaseapp.com",
    projectId: "signal-clone-build-9ddc1",
    storageBucket: "signal-clone-build-9ddc1.appspot.com",
    messagingSenderId: "49892866380",
    appId: "1:49892866380:web:c93f2dfabb470fa42f77e9"
};


// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const auth = firebase.auth();

// export { db, auth };

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
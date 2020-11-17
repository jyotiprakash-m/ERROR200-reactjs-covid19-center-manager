import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCTkxS4MqCD64thDRqxLmHM4fhYGiP4aUM",
    authDomain: "covidcenterdb.firebaseapp.com",
    databaseURL: "https://covidcenterdb.firebaseio.com",
    projectId: "covidcenterdb",
    storageBucket: "covidcenterdb.appspot.com",
    messagingSenderId: "988625600841",
    appId: "1:988625600841:web:7739f1b25ba5af25029a98"
});

// Initialize Firebase

var fireDb = firebaseConfig.database().ref();
const auth=firebase.auth();

export {auth,fireDb}

export default firebaseConfig;
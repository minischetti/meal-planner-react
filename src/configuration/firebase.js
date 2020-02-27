import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC04nIaIwTas102iVvPRXztqHQlVyz9IWs",
    authDomain: "meal-planner-6988e.firebaseapp.com",
    databaseURL: "https://meal-planner-6988e.firebaseio.com",
    projectId: "meal-planner-6988e",
    storageBucket: "meal-planner-6988e.appspot.com",
    messagingSenderId: "357922540060",
    appId: "1:357922540060:web:e3bb498301fa3abe222dd9",
    measurementId: "G-HFWT5CMFZ1"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
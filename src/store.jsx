// store.js
import * as React from 'react';
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const ACTION = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

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

const firebaseApp = firebase.initializeApp(firebaseConfig);

const initialState = {user: null};

const store = React.createContext(initialState);
const { Provider } = store;

function reducer(state, action) {
    const payload = action.payload;

    switch (action.type) {
        case ACTION.LOGOUT:
            firebase.auth().signOut()
            .then(() => {
                state.user = null;
            });
            return state;
        case ACTION.LOGIN:
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                state.user = user;
            });

            return state;
        default:
            return console.log("unknown action");
    };
}

const StateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export {store, StateProvider, ACTION, firebaseApp as firebase}
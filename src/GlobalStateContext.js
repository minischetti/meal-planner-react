// store.js
import * as React from 'react';
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
// import {handleClientActions} from "./actionHandler";
import {actionBuilder} from "./actionBuilder";
import {requestClient} from "./requestClient";

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

const initialState = {user: null, profile: null, waiting: false};

const GlobalStateContext = React.createContext(initialState);

function reducer(previousState, action) {
    const {type: actionType, payload} = action;

    switch (actionType) {
        case ACTION.LOGOUT:
            firebase.auth().signOut()
                .then(() => {
                    return {...previousState, profile: null};
                });

            return previousState;
        case ACTION.LOGIN:
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(data => {
                    const getProfileRequestPayload = {
                        profileId: data.user.uid
                    }
                    // const builtAction = actionBuilder.getProfile(getProfileRequestPayload);
                    return requestClient.getProfile(getProfileRequestPayload)
                        .then(profile => {
                            console.log("profile", profile);
                            const newState = {...previousState, profile};
                            console.log("newState", newState);
                            return newState;
                        });
                    return previousState;
                });

                console.log("state after login", previousState);

            return previousState;
        default:
            console.log("unknown action");
            return previousState;
    };
}

const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (<GlobalStateContext.Provider value={{state, dispatch}}>{children}</GlobalStateContext.Provider>);
};

export {GlobalStateContext, GlobalStateProvider, ACTION, firebaseApp as firebase}
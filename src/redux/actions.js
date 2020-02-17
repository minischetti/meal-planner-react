import * as firebase from "firebase/app";
import {firebaseAuth} from "../firebase";

export const apiBaseUrl = "http://localhost:8000/api/";

export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const requestProfile = profileId => {
    return {
        type: REQUEST_PROFILE,
        profileId: profileId
    }
}

export const RECIEVE_PROFILE = "RECIEVE_PROFILE";
export const recieveProfile = payload => {
    return {
        type: RECIEVE_PROFILE,
        payload
    }
}

export const LOGOUT = "LOGOUT";
export const logout = () => {
    return {
        type: LOGOUT
    }
}


// fetchProfile = payload => {
//     const profileId = payload.profileId;
//     return fetch(apiBaseUrl + "people/" + profileId)
//         .then(json)
//         .then(data => {
//             return data;
//         });
// }

export const GET_PROFILE = "GET_PROFILE";
export function getProfile(profileId) {
    return function(dispatch) {
        dispatch(requestProfile(profileId));

        return fetch(apiBaseUrl + "people/" + profileId)
            .then(response => response.json())
            .then(data => dispatch(recieveProfile(data)));
    }
}

export const LOGIN = "LOGIN";
export function login(payload) {
    return function(dispatch) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
            const profileId = data.user.uid;

            dispatch(getProfile(profileId));
        });
    }
}

export const GET_RECIPES = "GET_RECIPES";
export function getRecipes(payload) {
    const {profileId} = payload;
    return function(dispatch) {
        dispatch(requestRecipes());
        return fetch(apiBaseUrl + "people/" + profileId + "/recipes")
            .then(response => response.json())
            .then(recipes => {
                const payload = {profileId, recipes};
                dispatch(recieveRecipes(payload))
            });
    }
}

export const REQUEST_RECIPES = "REQUEST_RECIPES";
export const requestRecipes = () => {
    return {
        type: REQUEST_RECIPES
    }
}

export const RECIEVE_RECIPES = "RECIEVE_RECIPES";
export const recieveRecipes = payload => {
    const {profileId, recipes} = payload;

    return {
        type: RECIEVE_RECIPES,
        profileId,
        recipes
    }
}

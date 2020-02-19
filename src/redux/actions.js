import * as firebase from "firebase/app";
import { firebaseAuth } from "../firebase";

/**
 * Default fetch configuration.
 *
 * @param {FETCH_METHOD} method - HTTP request method
 * @param {object} body - HTTP request body
 *
 * @return {object} fetch configuration
 */
const fetchConfig = (method, body) => {
    let fetchBody = typeof body === "string" ? body : JSON.stringify(body);
    return {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "same-origin",
        body: fetchBody,
    };
};

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
    return function (dispatch) {
        dispatch(requestProfile(profileId));

        return fetch(apiBaseUrl + "people/" + profileId)
            .then(response => response.json())
            .then(data => dispatch(recieveProfile(data)));
    }
}

export const LOGIN = "LOGIN";
export function login(payload) {
    return function (dispatch) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(data => {
                const profileId = data.user.uid;

                dispatch(getProfile(profileId));
            });
    }
}

export const GET_RECIPES = "GET_RECIPES";
export function getRecipes(payload) {
    const { profileId } = payload;
    return function (dispatch) {
        dispatch(requestRecipes());
        return fetch(apiBaseUrl + "people/" + profileId + "/recipes")
            .then(response => response.json())
            .then(recipes => {
                const payload = { profileId, recipes };
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
    const { profileId, recipes } = payload;

    return {
        type: RECIEVE_RECIPES,
        profileId,
        recipes
    }
}


export const REQUEST_RECIPE_NAME_EDIT = "REQUEST_RECIPE_NAME_EDIT";
export const requestRecipeNameEdit = () => {
    return {
        type: REQUEST_RECIPE_NAME_EDIT

    }
}

export const RECIPE_NAME_EDIT_SUCCESS = "RECIPE_NAME_EDIT_SUCCESS";
export const recipeNameEditSuccess = payload => {
    return {
        type: RECIPE_NAME_EDIT_SUCCESS,
        payload
    }
}

export const EDIT_RECIPE_NAME = "EDIT_RECIPE_NAME";
export function editRecipeName({profileId, recipeId, newRecipeName}) {
    console.log(arguments);
    return function (dispatch) {
        dispatch(requestRecipeNameEdit());

        return fetch(apiBaseUrl + "recipes/" + recipeId + "/name", fetchConfig("PUT", {profileId, newRecipeName: newRecipeName}))
            .then(response => response.json())
            .then(data => {
                dispatch(recipeNameEditSuccess(data));
            });
    }
}

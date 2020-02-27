import { firebaseAuth } from "../configuration";

const FETCH_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

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
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        credentials: "same-origin",
        body: fetchBody
    };
};

export const apiBaseUrl = "http://localhost:8000/api/";

export const REQUEST_ACCOUNT = "REQUEST_ACCOUNT";
export const requestAccount = payload => {
    return dispatch => {
        firebaseAuth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                const userId = response.user.uid;

                firebaseAuth.onAuthStateChanged(user => {
                    if (user) {
                        dispatch(recieveAccount(userId));
                    }
                });
            });
    };
};

export const RECIEVE_ACCOUNT = "RECIEVE_ACCOUNT";
export const recieveAccount = payload => {
    return {
        type: RECIEVE_ACCOUNT,
        payload
    };
};

export const REQUEST_PROFILE = "REQUEST_PROFILE";
export const requestProfile = profileId => {
    return dispatch => {
        return fetch(apiBaseUrl + "people/" + profileId)
            .then(response => response.json())
            .then(profile => dispatch(recieveProfile(profile)));
    };
};

export const RECIEVE_PROFILE = "RECIEVE_PROFILE";
export const recieveProfile = payload => {
    return {
        type: RECIEVE_PROFILE,
        payload
    };
};

export const LOGOUT = "LOGOUT";
export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const REQUEST_RECIPES = "REQUEST_RECIPES";
export const requestRecipes = userId => {
    return dispatch => {
        return fetch(apiBaseUrl + "people/" + userId + "/recipes")
            .then(response => response.json())
            .then(recipes => {
                const payload = { profileId: userId, recipes };
                dispatch(recieveRecipes(payload));
            });
    };
};

export const RECIEVE_RECIPES = "RECIEVE_RECIPES";
export const recieveRecipes = payload => {
    return {
        type: RECIEVE_RECIPES,
        payload
    };
};

export const EDIT_RECIPE_NAME_REQUEST = "EDIT_RECIPE_NAME_REQUEST";
export function editRecipeName({ recipeId, newRecipeName }) {
    return dispatch => {
        dispatch(requestRecipeNameEdit());
        const profileId = firebaseAuth.currentUser.uid;

        return fetch(
            apiBaseUrl + "recipes/" + recipeId + "/name",
            fetchConfig("PUT", { profileId, newRecipeName: newRecipeName })
        )
            .then(response => response.json())
            .then(data => dispatch(recipeNameEditResponse(data)));
    };
}

export const EDIT_RECIPE_NAME_RESPONSE = "EDIT_RECIPE_NAME_RESPONSE";
export const recipeNameEditResponse = payload => {
    return {
        type: EDIT_RECIPE_NAME_RESPONSE,
        payload
    };
};

export const DELETE_RECIPE_REQUEST = "DELETE_RECIPE_REQUEST";
export const deleteRecipe = recipeId => {
    return dispatch => {
        const profileId = firebaseAuth.currentUser.uid;
        return fetch(
            apiBaseUrl + "people/" + profileId + "/recipes/" + recipeId,
            fetchConfig(FETCH_METHOD.DELETE)
        )
            .then(response => response.json())
            .then(data => dispatch(deleteRecipeResponse(data)))
            .catch(error => dispatch(deleteRecipeResponse(error)));
    };
};

export const DELETE_RECIPE_RESPONSE = "DELETE_RECIPE_RESPONSE";
export const deleteRecipeResponse = payload => {
    return {
        type: CREATE_RECIPE_RESPONSE,
        payload
    };
};

export const CREATE_RECIPE_REQUEST = "CREATE_RECIPE_REQUEST";
export const createRecipe = payload => {
    return dispatch => {
        const profileId = firebaseAuth.currentUser.uid;
        return fetch(
            apiBaseUrl + "people/" + profileId + "/recipes",
            fetchConfig("POST", payload)
        )
            .then(response => response.json())
            .then(response => dispatch(createRecipeResponse(response)))
            .catch(response => dispatch(createRecipeResponse(response)));
    };
};

export const CREATE_RECIPE_RESPONSE = "CREATE_RECIPE_RESPONSE";
export const createRecipeResponse = payload => {
    return {
        type: CREATE_RECIPE_RESPONSE,
        payload
    };
};

export const RESET_RECIPE_RESPONSE = "RESET_RECIPE_RESPONSE";
export const resetRecipeResponse = () => {
    return {
        type: RESET_RECIPE_RESPONSE
    };
};

export const UPDATE_RECIPE_REQUEST = "UPDATE_RECIPE_REQUEST";
export const updateRecipe = payload => {
    return dispatch => {
        return fetch(
            apiBaseUrl + "recipes/" + payload.recipeId,
            fetchConfig("PUT", withProfileId(payload))
        )
            .then(response => response.json())
            .then(data => dispatch(updateRecipeResponse(data)))
            .catch(error => dispatch(updateRecipeResponse(error)));
    };
};

export const UPDATE_RECIPE_RESPONSE = "UPDATE_RECIPE_RESPONSE";
export const updateRecipeResponse = payload => {
    return {
        type: UPDATE_RECIPE_RESPONSE,
        payload
    };
};

/**
 * Adds the current user's profile id to a payload.
 *
 * @param {Object} payload the payload to add the profile id to
 * @return {Object} the payload with the current user's profile id
 */
const withProfileId = payload => {
    const profileId = firebaseAuth.currentUser.uid;

    return {
        profileId,
        ...payload
    };
};

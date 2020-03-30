import { firebaseAuth, apiBaseUrl } from "../configuration";

export const FETCH_METHOD = {
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
export const fetchConfig = (method, body, withCurrentUserId = false) => {
    let fetchBody = typeof body === "string" ? body : JSON.stringify(body);

    if (withCurrentUserId) {
        fetchBody.profileId = firebaseAuth.currentUser.uid;
    }

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

export const REQUEST_ACCOUNT = "REQUEST_ACCOUNT";
export const requestAccount = payload => {
    return dispatch => {
        firebaseAuth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                const userId = response.user.uid;
                dispatch(recieveAccount(userId));
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
        return fetch(
            apiBaseUrl + "recipes",
            fetchConfig(FETCH_METHOD.POST, payload, true)
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
            fetchConfig("PUT", payload, true)
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

export const CREATE_GROUP_REQUEST = "CREATE_GROUP_REQUEST";
export const createGroup = payload => {
    return dispatch => {
        return fetch(
            apiBaseUrl + "groups",
            fetchConfig(FETCH_METHOD.POST, payload, true)
        )
            .then(response => response.json())
            .then(data => {
                return dispatch(createGroupResponse(data));
            })
            .catch(error => {
                return dispatch(createGroupResponse(error));
            });
    };
};

export const CREATE_GROUP_RESPONSE = "CREATE_GROUP_RESPONSE";
export const createGroupResponse = payload => {
    return {
        type: CREATE_GROUP_RESPONSE,
        payload
    };
};

export const RESET_CREATE_GROUP_STATUS = "RESET_CREATE_GROUP_STATUS";
export const resetCreateGroupStatus = () => {
    return {
        type: RESET_CREATE_GROUP_STATUS
    };
};

export const INVITE_TO_GROUP_REQUEST = "INVITE_TO_GROUP_REQUEST";
export const inviteToGroup = payload => {
    const requestPayload = {
        sender: payload.profileId,
        recipient
    };

    return async dispatch => {
        try {
            const response = await fetch(
                apiBaseUrl + "groups" + payload.groupId + "/invite",
                fetchConfig(FETCH_METHOD.POST, requestPayload, true)
            );
            const data = await response.json();
            return dispatch(createGroupResponse(data));
        } catch (error) {
            return dispatch(createGroupResponse(error));
        }
    };
};

export const INVITE_TO_GROUP_RESPONSE = "INVITE_TO_GROUP_RESPONSE";
export const inviteToGroupResponse = payload => {
    return {
        type: INVITE_TO_GROUP_RESPONSE,
        payload
    };
};

export const RESET_INVITE_TO_GROUP_STATUS = "RESET_INVITE_TO_GROUP_STATUS";
export const resetInviteToGroupStatus = () => {
    return {
        type: RESET_INVITE_TO_GROUP_STATUS
    };
};

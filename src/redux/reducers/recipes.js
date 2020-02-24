import { REQUEST_RECIPES, RECIEVE_RECIPES, EDIT_RECIPE_NAME_REQUEST, EDIT_RECIPE_NAME_RESPONSE, CREATE_RECIPE_REQUEST, CREATE_RECIPE_RESPONSE } from "../actions";

const initialState = {
    recipes: [],
    waiting: false
}

export function recipes(previousState = initialState, action) {
    const { payload } = action;

    switch (action.type) {
        case REQUEST_RECIPES:
            return {
                ...previousState,
                waiting: true
            }
        case RECIEVE_RECIPES:
            return {
                ...previousState,
                profileId: payload.profileId,
                recipes: payload.recipes,
                waiting: false
            }
        case EDIT_RECIPE_NAME_REQUEST:
            return {
                ...previousState,
                waiting: true
            }
        case EDIT_RECIPE_NAME_RESPONSE:
            return {
                ...previousState,
                waiting: false
            }
        case CREATE_RECIPE_REQUEST:
            return {
                ...previousState,
                waiting: true
            }
        case CREATE_RECIPE_RESPONSE:
            return {
                ...previousState,
                waiting: false
                // recipes: {
                //     ...previousState.recipes,
                //     response: payload
                // }
            }
        default:
            return previousState;
    };
}
import { REQUEST_RECIPES, RECIEVE_RECIPES, REQUEST_RECIPE_NAME_EDIT, RECIPE_NAME_EDIT_SUCCESS } from "../actions";

const initialState = {
    recipes: [],
    waiting: false
}

export function recipes(previousState = initialState, action) {
    const { profileId, recipes } = action;

    switch (action.type) {
        case REQUEST_RECIPES:
            return {
                ...previousState,
                waiting: true
            }
        case RECIEVE_RECIPES:
            return {
                ...previousState,
                profileId,
                recipes,
                waiting: false
            }
        case REQUEST_RECIPE_NAME_EDIT:
            return {
                ...previousState,
                waiting: true
            }
        case RECIPE_NAME_EDIT_SUCCESS:
            return {
                ...previousState,
                waiting: false
            }
        default:
            return previousState;
    };
}
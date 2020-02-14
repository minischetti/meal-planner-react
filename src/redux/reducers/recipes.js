import {REQUEST_RECIPES, RECIEVE_RECIPES} from "../actions";

const initialState = {
    recipes: [],
    waiting: false
}

export function recipes(previousState = initialState, action) {
    const {profileId, recipes} = action;

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
        default:
            return previousState;
    };
}
export const getAuthenticationStatusFrom = state => state.user.isAuthenticated;
export const getUserIdFrom = state => state.user.id;
export const getProfileFrom = state => state.user.profile;
export const getRecipesFrom = state => state.recipes.recipes;
export const getUserWaitingStatusFrom = state => state.user.waiting;
export const getRecipeWaitingStatusFrom = state => state.recipes.waiting;
export const getRecipeResponseFrom = state => state.recipes.response;
export const getRecipeErrorStatusFrom = state => (state?.recipes?.response) ? state.recipes.response.result !== "success" : false;

// Groups
export const getCreateGroupResponseFrom = state => state && state.groups && state.groups.response ? state.groups.response : null;

export const getCreateGroupErrorStatusFrom = state => state && state.groups && state.groups.response && state.groups.response.hasError;
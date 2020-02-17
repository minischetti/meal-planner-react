export const getAuthenticationStatusFrom = state => state.user.isAuthenticated;
export const getProfileFrom = state => state.user.profile;
export const getRecipesFrom = state => state.recipes.recipes;
export const getUserWaitingStatusFrom = state => state.user.waiting;
export const getRecipeWaitingStatusFrom = state => state.recipes.waiting;
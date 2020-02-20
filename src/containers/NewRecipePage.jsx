import React, {useEffect} from "react";
import { Header } from "../components/Header";
import { RecipeList } from "../components/RecipeList";
import { AbstractPage } from "./AbstractPage";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getProfileFrom, getRecipeWaitingStatusFrom, getUserIdFrom } from "../redux/selectors";
import { requestRecipes } from "../redux/actions";
import { NewRecipe } from "../components/NewRecipe";

export const NewRecipePage = () => {
    const dispatch = useDispatch();

    // Selectors
    const userId = useSelector(state => getUserIdFrom(state));
    const recipeList = useSelector(state => getRecipesFrom(state));
    // const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));

    return (
        <AbstractPage>
            <Header />
            <h1>New Recipe</h1>
            <NewRecipe/>
        </AbstractPage>
    )
}
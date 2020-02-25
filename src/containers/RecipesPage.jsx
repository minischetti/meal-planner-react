import React, { useEffect } from "react";
import { Header, RecipeList } from "../components/components";
import { AbstractPage } from "./containers";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getUserIdFrom } from "../redux/selectors";
import { requestRecipes } from "../redux/actions";

export const RecipesPage = () => {
    const dispatch = useDispatch();

    // Selectors
    const userId = useSelector(state => getUserIdFrom(state));
    const recipeList = useSelector(state => getRecipesFrom(state));

    useEffect(() => {
        dispatch(requestRecipes(userId));
    }, []);

    return (
        <AbstractPage>
            <Header />
            <h1>Recipes</h1>
            <RecipeList recipes={recipeList} />
        </AbstractPage>
    )
}
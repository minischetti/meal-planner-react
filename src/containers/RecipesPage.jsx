import React, { useEffect } from "react";
import { Header, RecipeList, RecipeListItem } from "../components/components";
import { AbstractPage } from "./containers";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getUserIdFrom, getRecipeWaitingStatusFrom } from "../redux/selectors";
import { requestRecipes } from "../redux/actions";
import { Button, BUTTON_COLOR } from "../components/global/Button";
import { css } from "@emotion/core";
import { LinkWrapper, Spinner } from "../components/global/global";
import { PageActionBar } from "../components/global/global";

export const RecipesPage = () => {
    const dispatch = useDispatch();

    // Selectors
    const userId = useSelector(state => getUserIdFrom(state));
    const recipes = useSelector(state => getRecipesFrom(state));
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));

    useEffect(() => {
        dispatch(requestRecipes(userId));
    }, []);

    const recipeListItems = recipes.map(recipe =>
        <RecipeListItem
            key={recipe.id}
            name={recipe.name}
            id={recipe.id}
        />
    );

    return (
        <AbstractPage>
            <Header />
            <PageActionBar title="Recipes">
                <LinkWrapper to="/recipe/new">
                    <Button color={BUTTON_COLOR.GREEN}>New Recipe<ion-icon name="create-outline" /></Button>
                </LinkWrapper>
            </PageActionBar>
            {waiting ? <Spinner/> : <RecipeList>{recipeListItems}</RecipeList>}
        </AbstractPage>
    )
}
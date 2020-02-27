import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getRecipesFrom,
    getUserIdFrom,
    getRecipeWaitingStatusFrom
} from "../redux/selectors";
import { requestRecipes } from "../redux/actions";
import { AbstractPage } from "../containers";
import { GlobalHeader, RecipeList, RecipeListItem } from "../components";
import { Button, BUTTON_COLOR, LinkWrapper } from "../components/ui/controls";
import { Spinner } from "../components/ui/general";
import { PageActionBar } from "../components/ui/page";

export const RecipesPage = () => {
    const dispatch = useDispatch();

    // Selectors
    const userId = useSelector(state => getUserIdFrom(state));
    const recipes = useSelector(state => getRecipesFrom(state));
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));

    useEffect(() => {
        dispatch(requestRecipes(userId));
    }, []);

    const recipeListItems = recipes.map(recipe => (
        <RecipeListItem key={recipe.id} name={recipe.name} id={recipe.id} />
    ));

    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="Recipes">
                <LinkWrapper to="/recipe/new">
                    <Button color={BUTTON_COLOR.GREEN}>
                        New Recipe
                        <ion-icon name="create-outline" />
                    </Button>
                </LinkWrapper>
            </PageActionBar>
            {waiting ? <Spinner /> : <RecipeList>{recipeListItems}</RecipeList>}
        </AbstractPage>
    );
};

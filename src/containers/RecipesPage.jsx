import React, { useEffect } from "react";
import { Header, RecipeList } from "../components/components";
import { AbstractPage } from "./containers";
import { useSelector, useDispatch } from "react-redux";
import { getRecipesFrom, getUserIdFrom } from "../redux/selectors";
import { requestRecipes } from "../redux/actions";
import { Button, BUTTON_COLOR } from "../components/global/Button";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";
import { PageHeader } from "../components/global/global";
import { PageActionBar } from "../components/global/PageActionBar";

export const RecipesPage = () => {
    const dispatch = useDispatch();

    // Selectors
    const userId = useSelector(state => getUserIdFrom(state));
    const recipeList = useSelector(state => getRecipesFrom(state));

    useEffect(() => {
        dispatch(requestRecipes(userId));
    }, []);

    const pageActionBarStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    `;

    return (
        <AbstractPage>
            <Header />
            <PageActionBar title="Recipes">
                <Link to="/recipe/new">
                    <Button color={BUTTON_COLOR.GREEN}>New Recipe<ion-icon name="create-outline" /></Button>
                </Link>
            </PageActionBar>
            <RecipeList recipes={recipeList} />
        </AbstractPage>
    )
}
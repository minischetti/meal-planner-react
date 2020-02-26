import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../redux/actions";
import { Header, Recipe, EditRecipeButton } from "../components/components";
import { PageActionBar } from "../components/global/global";
import { AbstractPage } from "./containers";

export const RecipePage = () => {
    const [recipe, setRecipe] = useState({});
    let { recipeId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "recipes/" + recipeId, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => setRecipe(data));

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <AbstractPage>
            <Header />
            <PageActionBar title="Recipe">
                <EditRecipeButton id={recipe.id}></EditRecipeButton>
            </PageActionBar>
            <Recipe name={recipe.name} authors={recipe.authors} ingredients={recipe.ingredients} instructions={recipe.instructions} />
        </AbstractPage>
    )
}
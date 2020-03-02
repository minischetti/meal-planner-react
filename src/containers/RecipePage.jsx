import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../configuration";
import { GlobalHeader, Recipe, EditRecipeButton } from "../components";
import { Spinner } from "../components/ui/general";
import { PageActionBar } from "../components/ui/page";
import { AbstractPage } from "../containers";

export const RecipePage = () => {
    const [recipe, setRecipe] = useState({});
    const [waiting, setWaiting] = useState(true);
    let { recipeId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "recipes/" + recipeId, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="Recipe">
                <EditRecipeButton id={recipe.id}></EditRecipeButton>
            </PageActionBar>
            {waiting ? (
                <Spinner />
            ) : (
                <Recipe
                    name={recipe.name}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.cookTime}
                    authors={recipe.authors}
                    ingredients={recipe.ingredients}
                    instructions={recipe.instructions}
                />
            )}
        </AbstractPage>
    );
};

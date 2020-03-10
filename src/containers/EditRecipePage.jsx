import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { AbstractPage } from "../containers";
import {
    ComposableRecipe,
    COMPOSABLE_RECIPE_MODE,
    Page,
    Loading
} from "../components";
import { apiBaseUrl } from "../configuration";

export const EditRecipePage = () => {
    const { recipeId } = useParams();
    const [waiting, setWaiting] = useState(true);
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        setWaiting(true);

        fetch(apiBaseUrl + "recipes/" + recipeId, {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setWaiting(false);
            });

        return () => {
            setWaiting(false);
            abortController.abort();
        };
    }, []);

    return (
        <AbstractPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Edit Recipe" />
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <ComposableRecipe
                        recipeId={recipe.id}
                        initialName={recipe.name}
                        initialPrepTime={recipe.prepTime}
                        initialCookTime={recipe.cookTime}
                        initialContributors={[]}
                        initialIngredients={recipe.ingredients}
                        initialInstructions={recipe.instructions}
                        mode={COMPOSABLE_RECIPE_MODE.UPDATE}
                    />
                )}
            </Page.Section>
        </AbstractPage>
    );
};

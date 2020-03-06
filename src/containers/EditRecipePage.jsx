import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { AbstractPage } from "../containers";
import { ComposableRecipe, COMPOSABLE_RECIPE_MODE } from "../components";
import { PageHeader, PageSection, PAGE_SECTION_AREA } from "../components/ui/page";
import { Spinner } from "../components/ui/general";
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
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Edit Recipe" />
                {waiting ? (
                    <Spinner />
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
            </PageSection>
        </AbstractPage>
    );
};

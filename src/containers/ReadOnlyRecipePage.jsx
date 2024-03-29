import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../configuration";
import { Recipe, EditRecipeButton, Page, Loading } from "../components";
import { AbstractPage } from "../containers";
import { useAuthSession } from "../hooks/useAuthSession";

export const ReadOnlyRecipePage = () => {
    const { user } = useAuthSession();
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

    const canEditRecipe = () => {
        if (!user || !recipe?.members) {
            return false;
        }

        return recipe.members.find(member => {
            return (
                (member.role === "owner" || member.role === "contributor") &&
                member.id === user.uid
            );
        });
    };

    return (
        <AbstractPage>
            <Page.Section position={Page.SECTION_CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Recipe">
                    {canEditRecipe() ? (
                        <EditRecipeButton id={recipe.id} />
                    ) : null}
                </Page.Header>
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <Recipe
                        name={recipe.name}
                        prepTime={recipe.prepTime}
                        cookTime={recipe.cookTime}
                        recipeYield={recipe.recipeYield}
                        description={recipe.description}
                        ingredients={recipe.ingredients}
                        instructions={recipe.instructions}
                    />
                )}
            </Page.Section>
        </AbstractPage>
    );
};

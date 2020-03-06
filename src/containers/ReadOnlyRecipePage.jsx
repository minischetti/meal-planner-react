import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../configuration";
import { Recipe, EditRecipeButton } from "../components";
import { Spinner } from "../components/ui/general";
import {
    PageHeader,
    PageSection,
    PAGE_SECTION_AREA
} from "../components/ui/page";
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
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="Recipe">
                    {canEditRecipe() ? (
                        <EditRecipeButton id={recipe.id} />
                    ) : null}
                </PageHeader>
                {waiting ? (
                    <Spinner />
                ) : (
                    <Recipe
                        name={recipe.name}
                        prepTime={recipe.prepTime}
                        cookTime={recipe.cookTime}
                        authors={recipe.members}
                        ingredients={recipe.ingredients}
                        instructions={recipe.instructions}
                    />
                )}
            </PageSection>
        </AbstractPage>
    );
};

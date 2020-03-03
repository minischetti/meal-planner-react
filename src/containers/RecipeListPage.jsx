import React, { useEffect } from "react";
import { AbstractPage } from "../containers";
import { GlobalHeader } from "../components";
import { Button, BUTTON_COLOR, LinkWrapper } from "../components/ui/controls";
import { List, ListItemLink } from "../components/ui/list";
import { Spinner } from "../components/ui/general";
import { PageHeader } from "../components/ui/page";
import { useParams } from "react-router";
import { useAuthSession } from "../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../configuration";

export const RecipeListPage = () => {
    const { profileId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const { user } = useAuthSession();

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "people/" + profileId + "/recipes", {
            signal: abortController.signal
        })
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setWaiting(false);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    const recipeListItems = () => {
        if (!recipes || !recipes.length) {
            return null;
        }

        return recipes.map(recipe => (
            <ListItemLink key={recipe.id} to={`/recipes/${recipe.id}`}>
                <div>{recipe.name}</div>
            </ListItemLink>
        ));
    };

    const newRecipeButton = () => {
        if (!user || !user.uid === profileId) {
            return null;
        }
        return (
            <LinkWrapper to="/recipe/new">
                <Button color={BUTTON_COLOR.GREEN}>
                    New Recipe
                    <ion-icon name="add-circle-outline" />
                </Button>
            </LinkWrapper>
        );
    };

    return (
        <AbstractPage>
            <PageHeader title="Recipes">{newRecipeButton()}</PageHeader>
            {waiting ? <Spinner /> : <List emptyText="Recipes will appear in this list.">{recipeListItems()}</List>}
        </AbstractPage>
    );
};

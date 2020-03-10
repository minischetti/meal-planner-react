import React, { useEffect } from "react";
import { AbstractUserPage } from "../../containers";
import { useParams } from "react-router";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";

import {Control, List, Loading, Page} from "../../components";

export const UserRecipeListPage = () => {
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
            })
            .catch(setWaiting(false));

        return () => {
            abortController.abort();
        };
    }, []);

    const recipeListItems = () => {
        if (!recipes || !recipes.length) {
            return null;
        }

        return recipes.map(recipe => (
            <List.Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                <div>{recipe.name}</div>
            </List.Link>
        ));
    };

    const newRecipeButton = () => {
        if (!user || !user.uid === profileId) {
            return null;
        }

        return (
            <Control.LinkWrapper to="/recipe/new">
                <Control.Button color={Control.BUTTON_CONFIGURATION.COLOR.GREEN}>
                    New Recipe
                    <ion-icon name="add-circle-outline" />
                </Control.Button>
            </Control.LinkWrapper>
        );
    };

    return (
        <AbstractUserPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Recipes">{newRecipeButton()}</Page.Header>
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <List.Container emptyText="Recipes will appear in this list.">
                        {recipeListItems()}
                    </List.Container>
                )}
            </Page.Section>
        </AbstractUserPage>
    );
};

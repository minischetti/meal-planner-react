import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAuthSession } from "../../hooks/useAuthSession";
import { useState } from "react";
import { apiBaseUrl } from "../../configuration";
import { Page, List, Loading } from "../../components";
import { AbstractGroupPage } from "./AbstractGroupPage";

export const GroupRecipeListPage = () => {
    const { groupId } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "groups/" + groupId + "/recipes", {
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
                <div>{name}</div>
            </ListItemLink>
        ));
    };

    return (
        <AbstractGroupPage>
            <Page.Section position={Page.Section.CONFIGURATION.POSITION.MAIN}>
                <Page.Header title="Group Recipes" />
                {waiting ? (
                    <Loading.Spinner />
                ) : (
                    <List.Container emptyText="Recipes will appear in this list.">
                        {recipeListItems()}
                    </List.Container>
                )}
            </Page.Section>
        </AbstractGroupPage>
    );
};

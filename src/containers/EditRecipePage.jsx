import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { apiBaseUrl } from "../redux/actions";
import { AbstractPage } from "./AbstractPage";
import { css } from "@emotion/core";
import { ComposableRecipe } from "../components/components";

export const EditRecipePage = () => {
    const [waiting, setWaiting] = useState(true);
    const [recipe, setRecipe] = useState({});
    let { recipeId } = useParams();

    const containerStyle = waiting ? css`
    transition: .5s all ease-in-out;
    opacity: .5;
    cursor: not-allowed;
    ` : css`transition: .5s all ease-in-out;`;

    useEffect(() => {
        const abortController = new AbortController();
        setWaiting(true);

        fetch(apiBaseUrl + "recipes/" + recipeId, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setWaiting(false);
            });

        return () => {
            setWaiting(false);
            abortController.abort();
        }
    }, []);

    return (
        <AbstractPage>
            <Header />
            {waiting ? "Loading..." : <ComposableRecipe initialName={recipe.name} initialAuthors={[]} initialIngredients={recipe.ingredients} initialInstructions={recipe.instructions} />}
        </AbstractPage>
    )
}
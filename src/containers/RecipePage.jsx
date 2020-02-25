import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiBaseUrl } from "../redux/actions";
import { Header, Recipe, RecipeActionBar } from "../components/components";
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
            <RecipeActionBar id={recipe.id}></RecipeActionBar>
            <Recipe name={recipe.name} authors={recipe.authors} ingredients={recipe.ingredients} instructions={recipe.instructions} />
        </AbstractPage>
    )
}
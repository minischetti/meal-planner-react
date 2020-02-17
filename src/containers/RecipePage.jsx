import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Recipe } from "../components/Recipe";
import { useParams } from "react-router";
import { apiBaseUrl } from "../redux/actions";

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
        <React.Fragment>
            <Header />
            <Recipe name={recipe.id} authors={recipe.authors} ingredients={recipe.ingredients} instructions={recipe.instructions} />
        </React.Fragment>
    )
}
import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { apiBaseUrl } from "../redux/actions";
import { EditableRecipe } from "../components/EditableRecipe";
import { Page } from "./Page";
import { useSelector } from "react-redux";
import { getProfileFrom, getRecipeWaitingStatusFrom } from "../redux/selectors";
import { css } from "@emotion/core";

export const EditRecipePage = () => {
    const profile = useSelector(state => getProfileFrom(state));
    const waiting = useSelector(state => getRecipeWaitingStatusFrom(state));
    const [recipe, setRecipe] = useState({});
    let { recipeId } = useParams();

    const containerStyle = waiting ? css`
    transition: .5s all ease-in-out;
    opacity: .5;
    cursor: not-allowed;
    ` : css`transition: .5s all ease-in-out;`;

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "recipes/" + recipeId, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => setRecipe(data));

        return () => {
            abortController.abort();
        }
    }, [waiting]);

    return (
        <Page>
            <Header />
            <div css={containerStyle}>
                <EditableRecipe profileId={profile.id} recipeId={recipe.id} name={recipe.name} authors={recipe.authors} ingredients={recipe.ingredients} instructions={recipe.instructions} />
            </div>
        </Page>
    )
}
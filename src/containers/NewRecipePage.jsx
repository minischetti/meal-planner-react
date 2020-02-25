import React from "react";
import { Header } from "../components/Header";
import { AbstractPage } from "./AbstractPage";
import { ComposableRecipe } from "../components/components";

export const NewRecipePage = () => {

    return (
        <AbstractPage>
            <Header />
            <h1>New Recipe</h1>
            <ComposableRecipe />
        </AbstractPage>
    )
}
import * as React from "react";
import { Header } from "../components/Header";
import { RecipeList } from "../components/RecipeList";
import { Page } from "./Page";

export const RecipesPage = () => {
    return (
        <Page>
            <Header />
            <h1>Recipes</h1>
            <RecipeList />
        </Page>
    )
}
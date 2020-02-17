import * as React from "react";
import {Header} from "../components/Header";
import {RecipeList} from "../components/RecipeList";

export const RecipesPage = () => {
    return (
        <React.Fragment>
            <Header/>
            <h1>Recipes</h1>
            <RecipeList/>
        </React.Fragment>
    )
}
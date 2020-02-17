import * as React from "react";
import {Header} from "../components/Header";
import {Recipes} from "../components/Recipes";

export const RecipePage = () => {
    return (
        <React.Fragment>
            <Header/>
            <h1>Recipes</h1>
            <Recipes/>
        </React.Fragment>
    )
}
import React from "react";
import { GlobalHeader } from "../components/GlobalHeader";
import { AbstractPage } from "./AbstractPage";
import { ComposableRecipe } from "../components/components";
import { PageActionBar } from "../components/global/global";

export const NewRecipePage = () => {

    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="New Recipe"/>
            <ComposableRecipe />
        </AbstractPage>
    )
}
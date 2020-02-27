import React from "react";
import { ComposableRecipe, GlobalHeader } from "../components";
import { AbstractPage } from "../containers";
import { PageActionBar } from "../components/ui/page";

export const NewRecipePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="New Recipe"/>
            <ComposableRecipe />
        </AbstractPage>
    )
}
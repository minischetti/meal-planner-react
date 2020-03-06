import React from "react";
import { ComposableRecipe } from "../components";
import { AbstractPage } from "../containers";
import { PageSection, PageHeader, PAGE_SECTION_AREA } from "../components/ui/page";

export const NewRecipePage = () => {
    return (
        <AbstractPage>
            <PageSection area={PAGE_SECTION_AREA.MAIN}>
                <PageHeader title="New Recipe" />
                <ComposableRecipe />
            </PageSection>
        </AbstractPage>
    );
};

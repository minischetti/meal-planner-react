import * as React from "react";
import { AbstractPage } from "../containers";
import { GlobalHeader } from "../components/GlobalHeader";
import { PageHeader } from "../components/ui/page";

export const HomePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageHeader title="Home" />
        </AbstractPage>
    );
};

import * as React from "react";
import { AbstractPage } from "../containers";
import { GlobalHeader } from "../components/GlobalHeader";
import { PageActionBar } from "../components/ui/page";

export const HomePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="Home" />
        </AbstractPage>
    );
};

import * as React from "react";
import { GlobalHeader } from "../components/GlobalHeader";
import { AbstractPage } from "./containers";
import { PageActionBar } from "../components/global/global";

export const HomePage = () => {
    return (
        <AbstractPage>
            <GlobalHeader />
            <PageActionBar title="Home"/>
        </AbstractPage>
    )
}
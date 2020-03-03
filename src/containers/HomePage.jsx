import * as React from "react";
import { AbstractPage } from "../containers";
import { GlobalHeader } from "../components/GlobalHeader";
import { PageHeader } from "../components/ui/page";

export const HomePage = () => {
    return (
        <AbstractPage>
            <PageHeader title="Home" />
        </AbstractPage>
    );
};

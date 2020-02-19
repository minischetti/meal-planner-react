import * as React from "react";
import { Header } from "../components/Header";
import { AbstractPage } from "./AbstractPage";

export const HomePage = () => {
    return (
        <AbstractPage>
            <Header />
            <h1>Home</h1>
        </AbstractPage>
    )
}
import React from "react";
import { Abstract } from "./Abstract";

export const User = ({ image, name, withBorder }) => {
    return (
        <Abstract image={image} name={name} withBorder={withBorder}>
            <ion-icon name="person-circle" />
        </Abstract>
    );
};

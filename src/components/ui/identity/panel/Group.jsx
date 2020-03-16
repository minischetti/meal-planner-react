import React from "react";
import { Abstract } from "./Abstract";

export const Group = ({ image, name, withBorder }) => {
    return (
        <Abstract image={image} name={name} withBorder={withBorder}>
            <ion-icon name="people-circle" />
        </Abstract>
    );
};

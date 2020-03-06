import React from "react";
import { Abstract } from "./Abstract";

export const User = ({ image, name }) => {
    return (
        <Abstract image={image} name={name}>
            <ion-icon name="person-circle" />
        </Abstract>
    );
};

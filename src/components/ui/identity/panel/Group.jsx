import React from "react";
import { Abstract } from "./Abstract";

export const Group = ({ image, name }) => {
    return (
        <Abstract image={image} name={name}>
            <ion-icon name="people-circle" />
        </Abstract>
    );
};

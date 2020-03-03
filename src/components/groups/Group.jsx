import React from "react";
import { css } from "@emotion/core";

export const Group = ({ id, name, members, recipes }) => {
    return (
        <div>
            <div>{name}</div>
            <div>{members.length}</div>
            <div>{recipes.length}</div>
        </div>
    );
};

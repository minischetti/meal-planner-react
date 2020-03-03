import React from "react";
import { css } from "@emotion/core";
import { ListItemLink } from "../ui/list";

export const GroupListItem = ({ id, name, role }) => {
    const contentStyle = css`
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    `;

    return (
        <ListItemLink to={{ pathname: `/groups/${id}` }}>
            <div css={contentStyle}>
                <div>{name}</div>
                <div>{role}</div>
            </div>
        </ListItemLink>
    );
};

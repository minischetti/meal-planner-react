import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children, emptyText = "This list is empty." }) => {
    const style = css`
        display: grid;
        gap: 10px;
    `;

    return <div css={style}>{children ? children : <div>{emptyText}</div>}</div>;
};

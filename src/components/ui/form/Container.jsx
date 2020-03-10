import React from "react";
import { css } from "@emotion/core";

export const Container = ({ children, onSubmit }) => {
    const style = css`
        display: grid;
        gap: 40px;
    `;

    return (
        <form css={style} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

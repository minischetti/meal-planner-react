import React from "react";
import { css } from "@emotion/core";

export const AbstractHeader = ({ title, withBorder }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        margin: 0;
    `;

    const withBorder = css`
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
    `;

    const getStyles = () => {
        let styles = [titleStyle];

        if (withBorder) {
            styles.push(withBorder);
        }

        return styles;
    };
    return <div>{children}</div>;
};

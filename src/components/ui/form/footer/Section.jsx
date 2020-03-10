import React from "react";

export const Section = ({ area, children }) => {
    const style = css`
        grid-area: ${area};
    `;

    return <div css={style}>{children}</div>;
};

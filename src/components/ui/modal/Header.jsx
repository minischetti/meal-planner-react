import { css } from "@emotion/core";

export const Header = ({ title }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        font-size: 24px;
        font-weight: bold;
    `;

    return <div css={titleStyle}>{title}</div>;
};

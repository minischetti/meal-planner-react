import { css } from "@emotion/core";
import { Default as Theme } from "../../../themes";

export const Header = ({ title }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        font-size: ${Theme.fontSize.large}px;
        font-weight: bold;
    `;

    return <div css={titleStyle}>{title}</div>;
};

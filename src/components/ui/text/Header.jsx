import { css } from "@emotion/core";
import { Default as Theme } from "../../../themes";

// Font Sizes
const { larger, large, medium, normal, small } = Theme.fontSize;
export const HEADER_TITLE_SIZE = {
    LARGER: larger,
    LARGE: large,
    MEDIUM: medium,
    NORMAL: normal,
    SMALL: small
};

export const Header = ({ title, titleSize = SIZE.LARGER }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        font-weight: bold;
        font-size: ${titleSize};
    `;

    return <div css={[css, titleStyle]}>{title}</div>;
};

import { css } from "@emotion/core";

// Font Sizes
export const HEADER_TITLE_SIZE = {
    LARGEST: 32,
    LARGER: 28,
    LARGE: 24,
    MEDIUM: 20,
    NORMAL: 16,
    SMALL: 12
};

export const Header = ({ title, titleSize = SIZE.LARGEST }) => {
    const titleStyle = css`
        font-family: "Barlow", sans-serif;
        font-weight: bold;
        font-size: ${titleSize};
    `;

    return <div css={[css, titleStyle]}>{title}</div>;
};

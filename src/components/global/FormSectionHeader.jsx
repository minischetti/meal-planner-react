import { css } from "@emotion/core"

export const FormSectionHeader = ({ children }) => {
    const headerStyle = css`
        margin: 0;
    `;

    return (
        <h2 css={headerStyle}>{children}</h2>
    )
}
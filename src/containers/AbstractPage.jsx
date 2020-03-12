import React from "react";
import { css } from "@emotion/core";
import { GlobalHeader } from "../components/GlobalHeader";
import { Page } from "../components";

export const AbstractPage = ({ children, disableGlobalHeader = false }) => {
    const container = css`
        font-family: "Lato", sans-serif;
        transition: 0.5s all ease-in-out;
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
    `;

    const content = css`
        display: grid;
        gap: 20px;
        grid-template-areas: "${Page.SECTION_CONFIGURATION.POSITION.MAIN}";
        @media (min-width: 375px) {
            width: 60%;
            margin: 0 auto;
        }
    `;

    const trifold = css`
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: "${Page.SECTION_CONFIGURATION.POSITION.LEFT} ${Page.SECTION_CONFIGURATION.POSITION.MAIN} ${Page.SECTION_CONFIGURATION.POSITION.MAIN}";
    `;

    const getContentStyles = () => {
        const styles = [content];

        if (children.length > 1) {
            styles.push(trifold);
        }

        return styles;
    };

    return (
        <div css={container}>
            {disableGlobalHeader ? null : <GlobalHeader />}
            <div css={getContentStyles()}>{children}</div>
        </div>
    );
};

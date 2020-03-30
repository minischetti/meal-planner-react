import React from "react";
import { css } from "@emotion/core";
import { GlobalHeader } from "../components/GlobalHeader";
import { Page } from "../components";
import { Default as Theme } from "../themes";

export const AbstractPage = ({ children, disableGlobalHeader = false }) => {
    const container = css`
        font-family: system-ui, "Lato", sans-serif;
        transition: 0.5s all ease-in-out;
        display: grid;
        grid-auto-flow: row;
        gap: 20px;
    `;

    const content = css`
        display: grid;
        gap: ${Theme.gap.medium}px;
        grid-template-areas: "${Page.SECTION_CONFIGURATION.POSITION.MAIN}";
        margin: 0 ${Theme.margin.medium}px;
        @media (min-width: 1024px) {
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

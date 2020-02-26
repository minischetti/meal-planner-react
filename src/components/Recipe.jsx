import React from "react";
import { css } from "@emotion/core";
import { Author } from "./components";

export const Recipe = ({ name, authors, ingredients, instructions }) => {
    const readOnlyListStyle = css`
        display: grid;
        gap: 10px;
        margin-top: 20px;
    `;

    const readOnlyListItemStyle = css`
        display: grid;
        gap: 10px;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
    `;

    const readOnlyListHeaderStyle = css`
        margin: 0;
    `;

    const authorList = () => {
        if (!authors || !authors.length) return <div>No authors</div>;

        return authors.map(author => (
            <Author key={author.id} id={author.id} role={author.role} />
        ));
    }

    const ingredientList = () => {
        if (!ingredients || !ingredients.length) return <div>No ingredients</div>;

        return ingredients.map((ingredient, index) => (
            <div key={index} css={readOnlyListItemStyle}>
                {ingredient.optional ? <div>(Optional)</div> : ""}
                <div>{ingredient.description}</div>
            </div>
        ));
    }

    const instructionList = () => {
        if (!instructions || !instructions.length) return <div>No instructions</div>;

        return instructions.map((instruction, index) => (
            <div key={index} css={readOnlyListItemStyle}>
                <div>{index + 1}.</div>
                {instruction.optional ? <div>(Optional)</div> : ""}
                <div>{instruction.description}</div>
            </div>
        ));
    }

    return (
        <div>
            <h2>{name}</h2>
            <div css={readOnlyListStyle}>
                <h3 css={readOnlyListHeaderStyle}>Authors</h3>
                {authorList()}
            </div>
            <div css={readOnlyListStyle}>
                <h3 css={readOnlyListHeaderStyle}>Ingredients</h3>
                {ingredientList()}
            </div>
            <div css={readOnlyListStyle}>
                <h3 css={readOnlyListHeaderStyle}>Instructions</h3>
                {instructionList()}
            </div>
        </div>
    );
}
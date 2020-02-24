import React from "react";
import { css } from "@emotion/core";
import {Author} from "./Author";

export const Recipe = ({ name, authors, ingredients, instructions }) => {
    const ingredientStyle = css`
        display: flex;
        justify-content: space-between;
    `;
    const authorList = () => {
        if (!authors || !authors.length) return null;

        return authors.map(author => (
            <Author key={author.id} id={author.id} role={author.role} />
        ));
    }
    const ingredientList = () => {
        if (!ingredients || !ingredients.length) return null;

        return ingredients.map((ingredient, index) => (
            <li key={index} css={ingredientStyle}>
                <div>{ingredient.description}</div>
                <div>{String(ingredient.optional)}</div>
            </li>
        ));
    }
    const instructionList = () => {
        if (!instructions || !instructions.length) return null;

        return instructions.map((instruction, index) => (
            <li key={index} css={instruction}>
                <div>{instruction.description}</div>
                <div>{String(instruction.optional)}</div>
            </li>
        ));
    }
    return (
        <div>
            <h2>{name}</h2>
            <div>
                <h3>Authors</h3>
                <ul>{authorList()}</ul>
            </div>
            <div>
                <h3>Ingredients</h3>
                <ul>{ingredientList()}</ul>
            </div>
            <div>
                <h3>Instructions</h3>
                <ol>{instructionList()}</ol>
            </div>
        </div>
    );
}
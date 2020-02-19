import React from "react";
import { css } from "@emotion/core";
import { Author } from "./Author";
import { useForm } from "react-hook-form";
import { editRecipeName } from "../redux/actions";
import { useDispatch } from "react-redux";

export const EditableRecipe = ({ profileId, recipeId, name, authors, ingredients, instructions }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

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
    const editableIngredientList = () => {
        if (!ingredients || !ingredients.length) return null;

        return ingredients.map(({ name, amount }, index) => (
            <div key={index} css={ingredientStyle}>
                <input key={name} defaultValue={name} />
                <input key={amount} defaultValue={amount} />
            </div>

        ));
    }
    const editableInstructionList = () => {
        if (!instructions || !instructions.length) return null;

        return instructions.map((instruction, index) => (
            <input key={index} css={instruction} defaultValue={instruction.body} />
        ));
    }

    const dispatchEditRecipeNameAction = ({ newRecipeName }) => {
        dispatch(editRecipeName({ profileId, recipeId, newRecipeName }));
    };

    // if (errors && errors.length) {
        console.log("EditableRecipe/formErrors", errors);
    // }

    return (
        <div>
            <h1>Edit {name}</h1>
            <h3>Name</h3>
            <form onSubmit={handleSubmit(dispatchEditRecipeNameAction)}>
                <input type="text" placeholder="Recipe Name" name="newRecipeName" defaultValue={name} ref={register({ required: true })} />
                <input type="submit" name="SaveRecipe" />
            </form>
        </div>
    );
}
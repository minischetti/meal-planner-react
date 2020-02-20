import React from "react";
import { css } from "@emotion/core";
import { Author } from "./Author";
import { useForm, useFieldArray } from "react-hook-form";
import { editRecipeName } from "../redux/actions";
import { useDispatch } from "react-redux";

export const EditableRecipe = ({ profileId, recipeId, name, authors, ingredients, instructions }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    })

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

        return ingredients.map(({ description, optional }, index) => (
            <fieldset key={index} css={ingredientStyle}>
                <input key={description} defaultValue={description} name="description" ref={register({ required: true })} />
                <input key={optional} type="checkbox" defaultValue={amount} name="optional" ref={register({ required: true })} />
            </fieldset>
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


    const dispatchEditRecipeIngredientsAction = (ingredients) => {
        console.log(ingredients);
        // dispatch(editRecipeName(ingredients));
    };

    // if (errors && errors.length) {
    console.log("EditableRecipe/formErrors", errors);
    // }

    return (
        <div>
            <h1>Edit {name}</h1>
            <form onSubmit={handleSubmit(dispatchEditRecipeNameAction)}>
                <h3>Name</h3>
                <input type="text" placeholder="Recipe Name" name="newRecipeName" defaultValue={name} ref={register({ required: true })} />
                <input type="submit" name="saveRecipeName" />
            </form>

            <form onSubmit={handleSubmit(dispatchEditRecipeIngredientsAction)}>
                <h3>Ingredients</h3>

                {fields.map((field, index) => (
                    <div key={field.id}>
                        <input name={`ingredients[${index}]`} ref={register()} />
                    </div>
                ))}
                {/* {editableIngredientList()} */}
                <section>
                    <button type="button" onClick={() => append({ name: "test" })}>append</button>
                </section>
                <input type="submit" name="saveRecipeIngredients" />
            </form>

            {/* <form onSubmit={handleSubmit(dispatchEditRecipeNameAction)}>
                <h3>Instructions</h3>
                {editableInstructionList()}
                <input type="submit" name="saveRecipeInstructions" />
            </form> */}
        </div>
    );
}
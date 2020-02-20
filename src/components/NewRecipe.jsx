import React from "react";
import { css } from "@emotion/core";
import { Author } from "./Author";
import { useForm, useFieldArray } from "react-hook-form";
import { editRecipeName } from "../redux/actions";
import { useDispatch } from "react-redux";

export const NewRecipe = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control } = useForm();
    const [ingredientIndices, setIngredientIndices] = React.useState([]);
    const [ingredientCounter, setIngredientCounter] = React.useState(0);

    const ingredientStyle = css`
        display: flex;
        justify-content: space-between;
    `;

    const addIngredient = () => {
        setIngredientIndices(prevIndices => [...prevIndices, ingredientCounter]);
        setIngredientCounter(prevCounter => prevCounter + 1);
      };

      const removeIngredient = index => () => {
        setIngredientIndices(prevIndices => [...prevIndices.filter(item => item !== index)]);
        setIngredientCounter(prevCounter => prevCounter - 1);
      };

      const clearIngredients = () => {
        setIngredientIndices([]);
      };

    // if (errors && errors.length) {
    console.log("NewRecipe/formErrors", errors);
    // }

    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="recipeName" placeholder="Recipe name" />
            <fieldset>
                <button type="button" onClick={addIngredient}>Add Ingredient</button>
                {ingredientIndices.map(index => {
                    const fieldName = `ingredient[${index}]`;
                    return (
                        <fieldset name={fieldName} key={fieldName}>
                        <label>
                            Ingredient {index}:
                            <input
                            type="text"
                            name={`${fieldName}.name`}
                            ref={register}
                            />
                        </label>
                        <button type="button" onClick={removeIngredient(index)}>Remove</button>
                        </fieldset>
                    );
                })}
            </fieldset>
            <div>
                <button type="submit">Save Recipe</button>
            </div>
        </form>
    );
}
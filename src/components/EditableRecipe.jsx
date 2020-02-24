import React from "react";
import { css } from "@emotion/core";
import { Author } from "./Author";
import { useForm, useFieldArray } from "react-hook-form";
import { editRecipeName } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const EditableRecipe = ({ recipeId }) => {
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState({});
    const { register, handleSubmit, errors, control } = useForm();

    const ingredientStyle = css`
        display: flex;
        justify-content: space-between;
    `;

    useEffect(() => {
        const abortController = new AbortController();

        fetch(apiBaseUrl + "recipes/" + recipeId, { signal: abortController.signal })
            .then(response => response.json())
            .then(data => setRecipe(data));

        return () => {
            abortController.abort();
        }
    }, []);

    const dispatchEditRecipeNameAction = ({ newRecipeName }) => {
        dispatch(editRecipeName({ recipeId, newRecipeName }));
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
                <TextField type="text" placeholder="Recipe Name" name="newRecipeName" defaultValue={name} ref={register({ required: true })} />
                <Button type="submit" name="saveRecipeName" />
            </form>

            <form onSubmit={handleSubmit(dispatchEditRecipeIngredientsAction)}>
                <h3>Name</h3>
                <TextField type="text" placeholder="Recipe Name" name="newRecipeName" defaultValue={name} ref={register({ required: true })} />
                <Button type="submit" name="saveRecipeName" />
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
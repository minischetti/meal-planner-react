import React from "react";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CREATE_RECIPE_REQUEST, createRecipe } from "../redux/actions";
import { Button, BUTTON_TYPE } from "../components/global/Button";
import { TextField } from "./global/TextField";

export const NewRecipe = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, control } = useForm();

    // Ingredient State
    const [ingredientIndices, setIngredientIndices] = React.useState([]);
    const [ingredientCounter, setIngredientCounter] = React.useState(0);

    // Ingredient Methods
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

    const headerStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const listStyle = css`
        // display: grid;
        // gap: 10px;
        // border: 1px solid #e8e8e8;
    `;

    const listItemStyle = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        // background-color: #e8e8e8;
        &:not(:last-child) {
            border-bottom: 1px solid #e8e8e8;
        }
    `;

    const formSectionStyle = css`
        &:not(:first-child) {
            margin-top: 20px;
        }
    `;

    const formStyle = css`
        display: grid;
        gap: 10px;
    `;

    // Instruction State
    const [instructionIndices, setInstructionIndices] = React.useState([]);
    const [instructionCounter, setInstructionCounter] = React.useState(0);

    // Instruction Methods
    const addInstruction = () => {
        setInstructionIndices(prevIndices => [...prevIndices, instructionCounter]);
        setInstructionCounter(prevCounter => prevCounter + 1);
    };

    const removeInstruction = index => () => {
        setInstructionIndices(prevIndices => [...prevIndices.filter(item => item !== index)]);
        setInstructionCounter(prevCounter => prevCounter - 1);
    };

    const clearInstructions = () => {
        setInstructionIndices([]);
    };

    // if (errors && errors.length) {
    console.log("NewRecipe/formErrors", errors);
    // }

    const onSubmit = data => dispatch(createRecipe(data));

    return (
        <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
                <div css={headerStyle}>
                    <h2>Name</h2>
                </div>
                <TextField name="name" ref={register} />
            </div>

            {/* Ingredients */}
            <div>
                <div css={headerStyle}>
                    <h2>Ingredients</h2>
                    <Button type={BUTTON_TYPE.BUTTON} onClick={addIngredient}>Add Ingredient<ion-icon name="add-circle-outline"></ion-icon></Button>
                </div>
                <div css={listStyle}>
                    {ingredientIndices.map(index => {
                        const fieldName = `ingredients[${index}]`;
                        const displayIndex = index + 1;

                        return (
                            <div css={listItemStyle} name={fieldName} key={fieldName}>
                                <div>{displayIndex}.</div>
                                <TextField type="text" name={`${fieldName}.description`} placeholder="Name" ref={register}/>
                                <label>Optional <input type="checkbox" name={`${fieldName}.optional`} ref={register} /></label>
                                <ion-icon name="trash-outline" onClick={removeIngredient(index)}></ion-icon>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Instructions */}
            <div>
                <div css={headerStyle}>
                    <h2>Instructions</h2>
                    <Button type={BUTTON_TYPE.BUTTON} onClick={addInstruction}>Add Instruction<ion-icon name="add-circle-outline"></ion-icon></Button>
                </div>
                <div css={listStyle}>
                    {instructionIndices.map(index => {
                        const fieldName = `instructions[${index}]`;
                        const displayIndex = index + 1;

                        return (
                            <div css={listItemStyle} name={fieldName} key={fieldName}>
                                <div>{displayIndex}.</div>
                                <TextField type="text" name={`${fieldName}.description`} placeholder="Description" ref={register}/>
                                <ion-icon name="trash-outline" onClick={removeInstruction(index)}></ion-icon>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Save */}
            <div>
                <Button type="submit">Save Recipe<ion-icon name="save-outline"></ion-icon></Button>
            </div>
        </form>
    );
}
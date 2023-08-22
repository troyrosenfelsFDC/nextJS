import React, {useEffect, useState} from 'react';
import Layout, { siteTitle } from '../components/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import formJSON from '../forms/formElement.json';
import { useForm } from "react-hook-form";
import Styles from '../styles/FinalStyles';

let formString = "enrollment";
let selectedForm = formJSON[formString];

export default function Form() {
    const theme = createTheme({
        palette: {
            primary: lime,
            secondary: purple,
        },
    });
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.get("form")) {
            formString = queryParameters.get("form");
        }
        selectedForm = formJSON[formString];
    })

    let { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();

    let { title, fields } = selectedForm;

    let watchFields = []

    const renderFields = (fields, watch) => {
        console.log("Rerender")
        return fields.map(field => {
            let { title, type, name, field_placeholder, field_watch, field_options, validationProps } = field;

            switch(type) {
                case 'text':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type="text" name={name} placeholder={field_placeholder} id={name} {...register(name, validationProps)} />
                            { errors[name] && <span className={"red-text"}>{errors[name]["message"]}</span> }
                        </div>
                    )
                case 'email':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type={"email"} name={name} id={name} {...register(name, validationProps)}></input>
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <input type={"checkbox"} name={name} id={name} {...register(name, validationProps)}></input>
                        </div>
                    )
                case 'select':
                    let options = field_options.map(option => {
                        return (<option key={name+option.option_label} value={option.option_label}>{option.option_label}</option>)
                    })
                    return (
                        <div key={name}>
                            <label htmlFor={name}>{title}</label>
                            <select name={name} id={name} {...register(name, validationProps)}>
                                {options}
                            </select>
                        </div>
                    )
                default:
                    return(
                        <div key={name}>
                            <span className="red-text">Invalid Field</span>
                        </div>
                    )
            }
        })
    }
    const onSubmit = (data) => console.log(data)

    return (
        <Styles>
            <div key={"homekey"}>
                <h1>{title}</h1><ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        { renderFields(fields, watch) }
                        <button type={"submit"} className={"btn btn-primary"}>Submit</button>
                    </form>
                    <pre>{JSON.stringify(watch(), 0, 2)}</pre>
                </ThemeProvider>
            </div>
        </Styles>
    );
}
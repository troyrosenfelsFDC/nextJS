/* eslint-disable jsx-a11y/accessible-emoji */
import React, {useEffect} from 'react';
import { Form, Field } from 'react-final-form';
import formJSON from "../forms/formElement.json";
import Layout, { siteTitle } from '../components/layout';
import Styles from '../styles/FinalStyles';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const renderFields = (fields) => {
    console.log("Rerender")
    return fields.map(field => {
        let { title, type, name, field_placeholder, field_options, validationProps } = field;

        switch(type) {
            case 'text':
                return (
                    <Field
                        name={name}
                        component="input"
                        key={name}
                        validate={value => {
                            if (!value && validationProps) {
                                return validationProps.required;
                            }
                        }}
                    >
                        {({input, meta}) => (
                            <div>
                                <label>{title}</label>
                                <input {...input} type="text" placeholder={field_placeholder} />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                )
            case 'email':
                return (
                    <div key={name}>
                        <label htmlFor={name}>{title}</label>
                        <input type={"email"} name={name} id={name}></input>
                    </div>
                )
            case 'select':
                let options = field_options.map(option => {
                    return (<option key={name+option.option_label} value={option.option_label}>{option.option_label}</option>)
                })
                return (
                    <div key={name}>
                         <label htmlFor={name}>{title}</label>
                        <Field
                            name={name}
                            component="select"
                            type="select"
                        >
                            {options}
                        </Field>
                    </div>
                )
            case 'checkbox':
                return (
                    <div key={name}>
                        <label htmlFor={name}>{title}</label>
                        <Field
                            name={name}
                            id={name}
                            component="input"
                            type="checkbox"
                        />
                    </div>
                )
            default:
                return(
                    <div key={name}>
                        <span>Invalid Field</span>
                    </div>
                )
        }
    })
}

export default function FinalDynForm() {
    const { title, fields } = formJSON["enrollment"];

    return (
        <Styles key={"finalFormStyle"}>
            <div key={"finalForm"}>
                <h1>{title}</h1>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{firstName: '', lastName: ''}}
                    validate={values => {
                        const errors = {}
                        if (!values.firstName) {
                            errors.firstName = "Required";
                        }
                        return errors
                    }}
                    render={({handleSubmit, form, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit}>
                            { renderFields(fields) }
                            <button  type="submit" disabled={submitting || pristine}>Submit</button>
                            {/*<br/>*/}
                            {/*<br/>*/}
                            {/*<br/>*/}
                            {/*<div>*/}
                            {/*    <Field*/}
                            {/*        name="firstName"*/}
                            {/*        component="input"*/}
                            {/*    >*/}
                            {/*        {({input, meta}) => (*/}
                            {/*            <div>*/}
                            {/*                <label>First Name</label>*/}
                            {/*                <input {...input} type="text" placeholder="First! Name" />*/}
                            {/*                {meta.error && meta.touched && <span>{meta.error}</span>}*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*    </Field>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Last Name</label>*/}
                            {/*    <Field*/}
                            {/*        name="lastName"*/}
                            {/*        component="input"*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Last Name"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Employed</label>*/}
                            {/*    <Field name="employed" component="input" type="checkbox"/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Favorite Color</label>*/}
                            {/*    <Field name="favoriteColor" component="select">*/}
                            {/*        <option/>*/}
                            {/*        <option value="#ff0000">❤️ Red</option>*/}
                            {/*        <option value="#00ff00">💚 Green</option>*/}
                            {/*        <option value="#0000ff">💙 Blue</option>*/}
                            {/*    </Field>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Toppings</label>*/}
                            {/*    <Field name="toppings" component="select" multiple>*/}
                            {/*        <option value="chicken">🐓 Chicken</option>*/}
                            {/*        <option value="ham">🐷 Ham</option>*/}
                            {/*        <option value="mushrooms">🍄 Mushrooms</option>*/}
                            {/*        <option value="cheese">🧀 Cheese</option>*/}
                            {/*        <option value="tuna">🐟 Tuna</option>*/}
                            {/*        <option value="pineapple">🍍 Pineapple</option>*/}
                            {/*    </Field>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Sauces</label>*/}
                            {/*    <div>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="sauces"*/}
                            {/*                component="input"*/}
                            {/*                type="checkbox"*/}
                            {/*                value="ketchup"*/}
                            {/*            />{' '}*/}
                            {/*            Ketchup*/}
                            {/*        </label>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="sauces"*/}
                            {/*                component="input"*/}
                            {/*                type="checkbox"*/}
                            {/*                value="mustard"*/}
                            {/*            />{' '}*/}
                            {/*            Mustard*/}
                            {/*        </label>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="sauces"*/}
                            {/*                component="input"*/}
                            {/*                type="checkbox"*/}
                            {/*                value="mayonnaise"*/}
                            {/*            />{' '}*/}
                            {/*            Mayonnaise*/}
                            {/*        </label>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="sauces"*/}
                            {/*                component="input"*/}
                            {/*                type="checkbox"*/}
                            {/*                value="guacamole"*/}
                            {/*            />{' '}*/}
                            {/*            Guacamole 🥑*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Best Stooge</label>*/}
                            {/*    <div>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="stooge"*/}
                            {/*                component="input"*/}
                            {/*                type="radio"*/}
                            {/*                value="larry"*/}
                            {/*            />{' '}*/}
                            {/*            Larry*/}
                            {/*        </label>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="stooge"*/}
                            {/*                component="input"*/}
                            {/*                type="radio"*/}
                            {/*                value="moe"*/}
                            {/*            />{' '}*/}
                            {/*            Moe*/}
                            {/*        </label>*/}
                            {/*        <label>*/}
                            {/*            <Field*/}
                            {/*                name="stooge"*/}
                            {/*                component="input"*/}
                            {/*                type="radio"*/}
                            {/*                value="curly"*/}
                            {/*            />{' '}*/}
                            {/*            Curly*/}
                            {/*        </label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <label>Notes</label>*/}
                            {/*    <Field name="notes" component="textarea" placeholder="Notes"/>*/}
                            {/*</div>*/}
                            {/*<div className="buttons">*/}
                            {/*    <button type="submit" disabled={submitting || pristine}>*/}
                            {/*        Submit*/}
                            {/*    </button>*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        onClick={form.reset}*/}
                            {/*        disabled={submitting || pristine}*/}
                            {/*    >*/}
                            {/*        Reset*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    )}
                />
            </div>
        </Styles>
    )
}

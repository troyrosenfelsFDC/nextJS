import React, {useEffect, useState} from 'react';
import Layout, { siteTitle } from '../components/layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import Element from '../components/Element';
import formJSON from '../forms/formElement.json';
import {FormContext} from "../FormContext";
import { formkik } from "formik";

export default function Home() {
    const theme = createTheme({
        palette: {
            primary: lime,
            secondary: purple,
        },
    });
    let form = "enrollment"
    const [elements, setElements] = useState(null);
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        if (queryParameters.get("form")) {
            form = queryParameters.get("form");
        }
        setElements(formJSON[form]);
    }, [])

    const { fields, page_label } = elements ?? {}
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(elements);
        alert(JSON.stringify(elements.fields.map(e => [e.field_id, e.field_value]), null, 2));
    }
    const handleChange = (id, event) => {
        const newElements = {...elements};
        newElements.fields.forEach(field => {
            const { field_id, field_type } = field
            if (id === field_id) {
                switch (field_type) {
                    case 'checkbox':
                        field['field_value'] = event.target.checked;
                        break;
                    default:
                        field['field_value'] = event.target.value;
                        break;
                }
            }
            setElements(newElements);
        });
    }
    return (
        <FormContext.Provider  value={{ handleChange }}>
            <Layout home>
                <div>
                    <h1>{page_label}</h1>
                    <ThemeProvider theme={theme}>
                        <formkik>
                            {fields ? fields.map((field, i) => <Element key={i}  field={field}/>) : null}

                            <button type={"submit"} className={"btn btn-primary"} onClick={(event)=>handleSubmit(event)}>Submit</button>
                            {/*<FormLabel color="primary" htmlFor="firstName">First Name</FormLabel>*/}
                            {/*<TextField fullWidth id="firstName" name="firstName" placeholder="Jane" />*/}

                            {/*<label htmlFor="lastName">Last Name</label>*/}
                            {/*<TextField fullWidth id="lastName" name="lastName" placeholder="Doe" />*/}

                            {/*<label htmlFor="email">Email</label>*/}
                            {/*<TextField*/}
                            {/*    fullWidth*/}
                            {/*    id="email"*/}
                            {/*    name="email"*/}
                            {/*    placeholder="jane@acme.com"*/}
                            {/*    type="email"*/}
                            {/*/>*/}
                            {/*<button type="submit">Submit</button>*/}
                        </formkik>
                    </ThemeProvider>
                </div>
            </Layout>
        </FormContext.Provider>
    );
}
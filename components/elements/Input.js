import React, {useContext} from "react";
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import {FormContext} from "../../FormContext";

export default function Input(register, { field_type, field_id, field_label, field_placeholder, field_value, field_aria_descriptor }) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <FormLabel htmlFor="template" className="form-label">
                {field_label}
            </FormLabel>
            <input {...register(field_id)} />
            {/*<TextField fullWidth type={field_type} className="form-control" id={field_id} aria-describedby={field_id+"describe"} placeholder={field_placeholder?field_placeholder:''} value={field_value} onChange={event => handleChange(field_id, event)}/>*/}
            <div id={field_id+"describe"} className="form-text">
                {field_aria_descriptor}
            </div>
            <br/>
        </div>
    );
}
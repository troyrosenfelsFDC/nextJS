import FormLabel from '@mui/material/FormLabel';
import {FormContext} from "../../FormContext";
import {useContext} from "react";

export default function Checkbox({ field_id, field_label, field_value, field_aria_descriptor }) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <FormLabel htmlFor="template" className="form-label">
                <input type="checkbox" className="form-check-input" id={field_id} aria-describedby={field_id+"describe"} checked={field_value} onChange={event => handleChange(field_id, event)}/>
                {field_label}
            </FormLabel>
            <div id={field_id+"describe"} className="form-text">
                {field_aria_descriptor}
            </div>
            <br/>
        </div>
    );
}
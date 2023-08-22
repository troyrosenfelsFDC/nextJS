import FormLabel from '@mui/material/FormLabel';
import {useContext} from "react";
import {FormContext} from "../../FormContext";

export default function Select({ field_id, field_label, field_placeholder, field_value, field_options, field_aria_descriptor }) {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <FormLabel className={"form-label"}>{field_label}</FormLabel>
            <br/>
            <select className="form-select" aria-label="Default select example"onChange={event => handleChange(field_id, event)}>
                <option>Open this select menu</option>
                {field_options.length > 0 && field_options.map((option, i) =>
                    <option value={option.option_label} key={i}>{option.option_label}</option>
                )}
            </select>
            <br/>
            <br/>
        </div>
    );
}
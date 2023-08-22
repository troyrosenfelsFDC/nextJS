import Input from './elements/Input';
import Select from './elements/Select';
import Checkbox from './elements/Checkbox';
import React from "react";

const Element = ({field: { field_type, field_id, field_label, field_placeholder, field_value, field_options, field_aria_descriptor }}) => {
    switch (field_type) {
        case 'text':
            return (<Input
                field_type = {field_type}
                field_id = {field_id}
                field_label = {field_label}
                field_placeholder = {field_placeholder}
                field_value = {field_value}
                field_aria_descriptor = {field_aria_descriptor}
            />)
        case 'number':
            return (<Input
                field_type = {field_type}
                field_id = {field_id}
                field_label = {field_label}
                field_placeholder = {field_placeholder}
                field_value = {field_value}
                field_aria_descriptor = {field_aria_descriptor}
            />)
        case 'select':
            return (<Select
                field_id = {field_id}
                field_label = {field_label}
                field_placeholder = {field_placeholder}
                field_value = {field_value}
                field_options = {field_options}
                field_aria_descriptor = {field_aria_descriptor}
            />)
        case 'checkbox':
            return (<Checkbox
                field_id = {field_id}
                field_label = {field_label}
                field_value = {field_value}
                field_aria_descriptor = {field_aria_descriptor}
            />)
        default:
            return null;
    }
}

export default Element;
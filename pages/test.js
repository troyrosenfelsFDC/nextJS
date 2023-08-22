import {useEffect} from "react";
import formJSON from "../forms/formElement.json";
import FinalForm from "./finalDynForm";
import Styles from '../styles/FinalStyles';

let formString = "enrollment";
let selectedForm = formJSON[formString];

export default function test() {
    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        console.log(queryParameters.get("form"));
        if (queryParameters.get("form")) {
            formString = queryParameters.get("form");
        }
        selectedForm = formJSON[formString];
        console.log(selectedForm);
    })
    return (
        <Styles>{FinalForm(selectedForm)}</Styles>
    )
}
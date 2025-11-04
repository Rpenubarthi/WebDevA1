"use client";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ReduxExamples from "./ReduxExamples";
import store from "./store";
import { Provider } from "react-redux";



export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }

    return (
        <Provider store={store}>
            <div id="wd-lab4">
                <h2>Lab 4</h2>
                <h3>Ruthvik Penubarthi</h3>
                <a href="https://github.com/Rpenubarthi/WebDevA1/tree/A4">Link to Repository</a>
                <ClickEvent />
                <PassingDataOnEvent />
                <PassingFunctions theFunction={sayHello} />
                <EventObject />
                <Counter />
                <BooleanStateVariables />
                <StringStateVariables />
                <DateStateVariable />
                <ObjectStateVariable />
                <ArrayStateVariable />
                <ReduxExamples />
            </div>
        </Provider>
    );
}
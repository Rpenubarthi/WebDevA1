import { useState, useEffect, use } from "react";
export default function BooleanStateVariables() {
    const [done, setDone] = useState(true);
    const [text, setText] = useState("Done");

    // Was testing out useEffect as well
    useEffect(() => {
        done ? setText("Done") : setText("Not done")
    }, [done]);

    return (
        <div id="wd-boolean-state-variables">
            <h2>Boolean State Variables</h2>
            <p>{text}</p>
            <label className="form-control">
                <input type="checkbox" checked={done}
                    onChange={() => setDone(!done)} /> Done
            </label>
            {done && <div className="alert alert-success">
                Yay! you are done</div>}
            <hr /></div>);
}

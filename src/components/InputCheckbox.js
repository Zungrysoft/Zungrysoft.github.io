import '../App.css';
import React, { useEffect } from 'react';

function InputCheckbox({ label, startValue, onChange }) {
    // Validation
    useEffect(() => {
        // If the startValue is not 1 or 0, set it to be
        if (startValue !== 0 && startValue !== 1) {
            onChange(0);
        }
    });

    let rnum = Math.trunc(Math.random() * 524280);
    return (
        <div>
            <label className="condition-label" htmlFor={"label_" + rnum}>{label + ": "}</label>
            <input
                className="input-checkbox"
                type="checkbox"
                id={"label_" + rnum}
                checked={startValue}
                onChange={(e) => {onChange(e.target.checked ? 1 : 0)}}
            />
            
        </div>
    )
}

export default InputCheckbox;

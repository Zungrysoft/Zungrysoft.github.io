import '../App.css';
import React, { useEffect } from 'react';

import InputId from './InputId.js';
import InputRange from './InputRange.js';
import InputCheckbox from './InputCheckbox.js';
import InputColor from './InputColor.js';

import { getDataByType } from '../helpers/jsonData.js';

function Input({ type, id, jsonKey, startValue, onChange, version }) {
    let mode = null
    let labelName = ""
    let data = getDataByType(type);


    // Validation
    useEffect(() => {
        // If there is no data for this key, set value to 0
        if ( !(id in data) || !((jsonKey + "_mode") in data[id]) || !((jsonKey + "_display") in data[id])) {
            if (startValue !== 0) {
                onChange(0);
            }
        }
    }, [id, data, jsonKey]);


    // If this id is not in the json table, just exit
    if ( !(id in data) ) {
        return <div/>
    }
    // If there is no data for this key, exit out
    if ( !((jsonKey + "_mode") in data[id]) || !((jsonKey + "_display") in data[id])) {
        return <div/>
    }


    // Pull out data
    mode = data[id][jsonKey + "_mode"]
    labelName = data[id][jsonKey + "_display"]

    // Build label object
    let label = <p className="condition-label">{labelName + ": "}</p>
    
    if (mode === "input") {
        return (
            <div>
                {label}
                <input
                    className="input-item"
                    type="text"
                    value={startValue}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }
    else if (mode === "value_range") {
        return (
            <div>
                {label}
                <InputRange
                    startValue={startValue}
                    data={data[id]}
                    onChange={onChange}
                    jsonKey={jsonKey}
                />
            </div>
        );
    }
    else if (mode === "value_range_amp") {
        return (
            <div>
                {label}
                <InputRange
                    startValue={startValue}
                    data={data[id]}
                    onChange={onChange}
                    jsonKey={jsonKey}
                    style={1}
                />
            </div>
        );
    }
    else if (mode === "checkbox") {
        return (
            <div>
                <InputCheckbox
                    label={labelName}
                    startValue={startValue}
                    onChange={onChange}
                />
            </div>
        );
    }
    else if (mode === "color_dec") {
        return (
            <div>
                <InputColor
                    label={labelName}
                    startValue={startValue}
                    data={data[id]}
                    onChange={onChange}
                    jsonKey={jsonKey}
                />
            </div>
        );
    }
    else {
        return (
            <div>
                {label}
                <InputId
                    type={mode}
                    startValue={startValue}
                    onChange={onChange}
                    version={version}
                />
            </div>
        );
    }
}

export default Input;

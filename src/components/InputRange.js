import '../App.css';
import React, { useEffect } from 'react';

function amplifierNumeral(num) {
    if (num == 0) {return "I";}
    if (num == 1) {return "II";}
    if (num == 2) {return "III";}
    if (num == 3) {return "IV";}
    if (num == 4) {return "V";}
    if (num == 5) {return "VI";}
    if (num == 6) {return "VII";}
    if (num == 7) {return "VIII";}
    if (num == 8) {return "IX";}
    if (num == 9) {return "X";}
}

function InputRange({ startValue, data, jsonKey, onChange, style }) {
    let optionList = [];

    let minKey = jsonKey + "_min";
    let maxKey = jsonKey + "_max";

    // Validation
    useEffect(() => {
        if (minKey in data && maxKey in data) {
            // Validate that the value is between min and max
            if (startValue < data[minKey] || startValue > data[maxKey]) {
                onChange(data[minKey]);
            }
        }
    });

    // Make sure there is a min and max key
    if (!(minKey in data && maxKey in data)) {
        return <div/>
    }
    
    // Validate that min > max
    if (data[minKey] > data[maxKey]) {
        return <div/>
    }

    // Create option list from min and max
    for (let i = data[minKey]; i <= data[maxKey]; i ++) {
        optionList.push(
            <option value={i} key={i}>
                {style == 1 ? amplifierNumeral(i) : i}
            </option>
        );
    }

    return (
        <div>
            <select className="input-item" value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputRange;

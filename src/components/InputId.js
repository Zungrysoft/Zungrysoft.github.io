import '../App.css';
import React, { useEffect } from 'react';
import { getDataByType } from '../helpers/jsonData.js';
import { getValidEntries } from '../helpers/conditionUtils.js';

function getCategory( type, id ) {
    if (0 <= id && id < 100) {return "Utility";}
    if (800 <= id && id < 900) {return "Logic";}
    if (id >= 1000) {return "User-Defined";}

    if (type === 0) {
        if (100 <= id && id < 200) {return "Attributes";}
        if (200 <= id && id < 300) {return "Bonuses";}
        if (300 <= id && id < 350) {return "Passive Potion Effects";}
        if (350 <= id && id < 400) {return "Cleanse Potion Effects";}
        if (400 <= id && id < 500) {return "Item Modification";}
        if (500 <= id && id < 600) {return "Special Attacks";}
    }
    else if (type === 1) {
        if (100 <= id && id < 200) {return "Combat";}
        if (200 <= id && id < 300) {return "Actions";}
        if (300 <= id && id < 400) {return "Entity Data";}
        if (400 <= id && id < 500) {return "Item Data";}
    }
    else if (type === 2) {
        if (100 <= id && id < 200) {return "Contextual";}
        if (500 <= id && id < 600) {return "Directional";}
    }
    else if (type === "sound") {
        if (100 <= id && id < 200) {return "Passive";}
        if (200 <= id && id < 300) {return "Instant";}
        if (300 <= id && id < 400) {return "Attack";}
    }

    return "Misc"
}

function InputId({ type, startValue, onChange, context, version }) {
    let data = getDataByType(type);
    let valid = getValidEntries(data, context, version);
    let labelName = "";
    let optionGroups = [];
    let useCategories = false;
    
    // Effects
    if (type === 0) {
        labelName = "Effect";
        useCategories = true;
    }
    // Conditions
    else if (type === 1) {
        labelName = "Condition";
        useCategories = true;
    }
    // Filters
    else if (type === 2) {
        labelName = "Filter";
        useCategories = true;
    }
    // Other dropdowns
    else if (type === "sound") {
        useCategories = true;
    }

    // Validation
    useEffect(() => {
        if (Object.keys(valid).length > 0) {           
            // If the current value is not within the valid list, set it to something in the list
            if (!(startValue in valid)) {
                onChange(Object.keys(valid)[0]);
            }
        }
    });

    // Don't do anything if the data is empty
    if (Object.keys(valid).length < 1) {
        return <div/>
    }

    // Create option list from json data
    let prev = "";
    let curList = [];
    Object.keys(valid).forEach((id) => {
        // Whenever the category changes, form a new group from collected elements
        if (useCategories) {
            let category = getCategory(type, id);
            if (category != prev) {
                optionGroups.push(
                    <optgroup label={prev} key={optionGroups.length}>
                        {curList}
                    </optgroup>
                );
                curList = [];
                prev = category;
            }
        }
        // Determine the label for the option
        let labelName = valid[id].display;
        // Add asterisk if this is an instant condition
        if ("instant" in valid[id] && valid[id].instant == true) {
            labelName = "*" + labelName;
        }
        
        curList.push(
            <option value={id} key={id}>
                {labelName}
            </option>
        )
    });
    
    if (useCategories) {
        // Collect remaining elements at the end
        optionGroups.push(
            <optgroup label={prev} key={optionGroups.length}>
                {curList}
            </optgroup>
        );
        // The above code inserts an unwanted first group. This line removes it.
        optionGroups = optionGroups.splice(1);
    }
    else {
        // Bypasses option grouping by setting the optionGroups list equal to the options list
        optionGroups = curList;
    }

    return (
        <div>
            {labelName == "" ? <div/> : <p className="condition-label">{labelName + ": "}</p>}
            <select className="input-item" value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionGroups}
            </select>
        </div>
    )
}

export default InputId;

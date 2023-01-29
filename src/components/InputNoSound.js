import '../App.css';
import React, { useEffect } from 'react';
import InputCheckbox from './InputCheckbox.js';

import { getEffectData } from '../helpers/jsonData.js';

function InputSlot({ id, label, startValue, onChange }) {
    // Make sure the effect has sounds to cancel
    let hasSound = false;
    if ("has_sound" in getEffectData()[id] && getEffectData()[id].has_sound) {
        hasSound = true;
    }

    // Validation
    useEffect(() => {
        // No sounds to cancel. Set nosound to false
        if (!hasSound && startValue !== false) {
            onChange(false);
        }
    }, [hasSound]);

    //Return element
    if (hasSound) {
        return (
            <InputCheckbox
                label={label}
                startValue={startValue}
                onChange={onChange}
            />
        )
    }
    return <div/>
}

export default InputSlot;

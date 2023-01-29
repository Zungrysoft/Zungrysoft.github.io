import '../App.css';
import { getEffectData, getConditionData, getFilterData } from '../helpers/jsonData.js';

function Note({ type, id }) {
    let data = {};
    let note = "";

    // Effects
    if (type === 0) {
        data = getEffectData();
    }
    // Conditions
    else if (type === 1) {
        data = getConditionData();
    }
    // Filters
    else if (type === 2) {
        data = getFilterData();
    }

    // If this id is not in the json table, just exit
    if ( !(id in data) ) {
        return <div/>
    }

    // Exit out if there is no note for this Condition
    if ( !("note" in data[id]) ) {
        return <div/>
    }

    // Read data
    note = data[id].note

    return (
        <div>
            <i>
                <p className="condition-note">{"(" + note + ")"}</p>
            </i>
        </div>
    )
}

export default Note;

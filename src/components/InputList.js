import '../App.css';

function InputList({ startValue, data, label, onChange, version }) {
    let optionList = [];

    // Create option list from json data
    Object.keys(data).forEach(function(key, _) {
        if (!("version_min" in data[key]) || version >= data[key].version_min) {
            optionList.push(
                <option value={key} key={key}>
                    {data[key].display}
                </option>
            );
        }
    });

    return (
        <div>
            <p className="label">{label + ": "}</p>
            <select value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputList;

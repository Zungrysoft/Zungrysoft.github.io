import '../App.css';

function Checkbox({ label, startValue, onChange }) {
    let rnum = Math.trunc(Math.random() * 524280)
    return (
        <div>
            <label className="condition-label" htmlFor={"label_" + rnum}>{label + ": "}</label>
            <input
                className="input-checkbox"
                type="checkbox"
                id={"label_" + rnum}
                checked={startValue}
                onChange={(e) => {onChange(e.target.checked)}}
            />
        </div>
    )
}

export default Checkbox;

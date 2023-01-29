import '../App.css';

let levels = {
    1:{display:"I"},
    2:{display:"II"},
    3:{display:"III"},
    4:{display:"IV"},
    5:{display:"V"},
    6:{display:"VI"},
    7:{display:"VII"},
    8:{display:"VIII"},
    9:{display:"IX"},
    10:{display:"X"},
}

function buttonClass(data, lvl, selected) {
    if (lvl === selected) {
        return "enchantment-number-selected";
    }
    if (lvl > data.maxLvl) {
        return "enchantment-number-faded";
    }
    return "enchantment-number";
}

function Enchantment({ enchantment, startValue, onChange }) {
    return (
        <tbody>
            <tr>
                <td>
                    <label className="enchantment-label">{enchantment.display + ": "}</label>
                    {Object.keys(levels).map((lvl) => 
                        <button
                            className={buttonClass(enchantment, lvl, startValue)}
                            onClick={(e) => {
                                if (lvl === startValue) {
                                    onChange(0);
                                }
                                else {
                                    onChange(lvl);
                                }
                            }}
                            key={lvl}
                        >
                            {levels[lvl].display}
                        </button>
                    )}
                </td>
            </tr>
        </tbody>
    )
}

export default Enchantment;

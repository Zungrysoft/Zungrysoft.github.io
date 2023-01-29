import '../App.css';

import randomizerWords from '../data/randomizer_words.json';
import randomizerFormats from '../data/randomizer_formats.json';
import ButtonRandomize from '../components/ButtonRandomize.js';

function pickFromList(list) {
    let randomVal = Math.trunc(Math.random() * list.length);
    return list[randomVal];
}

function pickFromWeightedList(list) {
    // Figure out what the total weight of all items is
    let totalWeight = 0;
    list.forEach((item) => {
        totalWeight += item.weight;
    })

    // Pick a number within that range
    let randomVal = Math.trunc(Math.random() * totalWeight);

    // Select item based on that
    for (let i = 0; i < list.length; i ++) {
        randomVal -= list[i].weight;
        if (randomVal < 0) {
            return list[i];
        }
    }
    return list[0];
}

function armorPiece(str) {
    if (Math.random() > 0.4) {
        return "armor";
    }
    return str;
}

function parseSection(section, itemId) {
    if (section === "[weapon]") {
        let weapon = "trinket";

        if (itemId.includes("sword")) {weapon="sword";}
        if (itemId.includes("axe")) {weapon="axe";}
        if (itemId.includes("pickaxe")) {weapon="pickaxe";}
        if (itemId.includes("shovel")) {weapon="shovel";}
        if (itemId.includes("hoe")) {weapon="hoe";}
        if (itemId.includes("helmet")) {weapon=armorPiece("helmet");}
        if (itemId.includes("chestplate")) {weapon=armorPiece("chestplate");}
        if (itemId.includes("leggings")) {weapon=armorPiece("leggings");}
        if (itemId.includes("boots")) {weapon=armorPiece("boots");}
        if (itemId.includes("shield")) {weapon="shield";}
        if (itemId.includes("bow")) {weapon="bow";}
        if (itemId.includes("crossbow")) {weapon="crossbow";}
        if (itemId.includes("trident")) {weapon="trident";}
        if (itemId.includes("elytra")) {weapon="wings";}
        if (itemId.includes("potion")) {weapon="potion";}
        if (itemId.includes("bottle")) {weapon="potion";}
        if (itemId.includes("stick")) {weapon="staff";}

        return pickFromWeightedList(randomizerWords.weapons[weapon]).value;
    }
    if (section === "[adjective]") {
        return pickFromWeightedList(randomizerWords.adjectives).value;
    }
    if (section === "[emphasis]") {
        return pickFromWeightedList(randomizerWords.emphases).value;
    }
    if (section === "[description]") {
        return pickFromWeightedList(randomizerWords.descriptions).value;
    }
    if (section === "[person]") {
        return pickFromWeightedList(randomizerWords.names).value;
    }
    if (section === "[noun]") {
        return pickFromWeightedList(randomizerWords.nouns).value;
    }
    if (section === "[noun_plural]") {
        let ret = pickFromWeightedList(randomizerWords.nouns);
        // See if a special-case plural form exists for this word
        if ("value_plural" in ret) {
            return ret.value_plural;
        }
        // Don't pluralize words that already end in s
        if (ret.value.substr(ret.value.length-1,1) === 's') {
            return ret.value;
        }
        return ret.value + "s";
    }
    return section;
}

function randomizeName(itemId) {
    let format = pickFromWeightedList(randomizerFormats.formats);

    let output = "";

    format.sections.forEach((section) => {
        output += parseSection(section, itemId);
    })

    return output;
}

function InputNameWithRandomizer({ startValue, itemId, onChange }) {
    return (
        <div>
            <input
                className="input-box-long"
                type="text"
                value={startValue}
                onChange={(e) => onChange(e.target.value)}
            />
            <ButtonRandomize
                eventClick={() => {
                    return onChange(randomizeName(itemId))
                }}
            />
        </div>
    )
}

export default InputNameWithRandomizer;

import { hexFormat, interpolateColor, hexToDec } from '../helpers/color.js'

// Removes leading commas in built lists
function rlc(str) {
    if (str[1] == ",") {
        str = str.slice(0,1) + str.slice(2);
    }
    if (str[0] == ",") {
        str = str.slice(1);
    }
    return str;
}

// Adds escape characters to text
function escapeChars(str) {
    str = str.replace(/\\/g,"\\\\\\\\");
    str = str.replace(/\'/g,"\\'");
    str = str.replace(/\"/g,"\\\\\"");
    return str;
}

function generateText(text, color, bold, italic) {
    if (text === "") {
        return "";
    }

    text = escapeChars(text);

    let output = ",{";

    output += "\"text\":\"" + text + "\"";
    output += ",\"color\":\"" + hexFormat(color) + "\"";
    output += ",\"italic\":" + italic;
    output += ",\"bold\":" + bold;

    return output + "}";
}

function generateNameMetallic(name) {
    // Special case for if the name has a length of 1
    if (name.text.length <= 1) {
        return generateText(name.text, name.color, name.bold, name.italic);
    }

    let output = "";

    for (let i = 0; i < name.text.length; i ++) {
        let pos = i/(name.text.length-1);
        let factor = 0;

        if (pos < 0.386) {
            factor = 1/(1+Math.pow(2.718,-20*(pos-0.1)));
        }
        else if (pos < 0.6) {
            factor = 1/(1+Math.pow(2.718,15*(pos-0.4)));
        }
        else {
            factor = 1/(1+Math.pow(2.718,-10*(pos-1)));
        }

        output += generateText(
            name.text[i],
            interpolateColor(name.color, name.color2, factor),
            name.bold,
            name.italic,
        );
    }
    
    return rlc(output);
}

function generateNameGradient(name) {
    // Special case for if the name has a length of 1
    if (name.text.length <= 1) {
        return generateText(name.text, name.color, name.bold, name.italic);
    }

    let output = "";

    for (let i = 0; i < name.text.length; i ++) {
        output += generateText(
            name.text[i],
            interpolateColor(name.color, name.color2, i/(name.text.length-1)),
            name.bold,
            name.italic,
        );
    }
    
    return rlc(output);
}

function generateNameWordGradient(name) {
    let output = "";
    let words = name.text.split(' ');
    words.forEach((word, index) => {
        if (index > 0) {
            word = " " + word;
        }
        output += "," + generateNameGradient({
            ...name,
            text: word
        });
    });
    return output;
}

function generateNameWordAlternating(name) {
    let output = "";
    let words = name.text.split(' ');
    words.forEach((word, index) => {
        if (index > 0) {
            word = " " + word;
        }
        let color = index % 2 == 0 ? name.color : name.color2;
        output += generateText(word, color, name.bold, name.italic);
    });
    return output;
}

function generateNameAlternating(name) {
    let output = "";

    for (let i = 0; i < name.text.length; i ++) {
        let color = i % 2 == 0 ? name.color : name.color2;
        output += generateText(name.text[i], color, name.bold, name.italic);
    }
    
    return rlc(output);
}

function isCapital(char) {
    return 65 <= char && char <= 90;
}

function generateNameCapitalized(name) {
    let output = "";

    let curCase = true;
    let queue = "";
    for (let i = 0; i < name.text.length; i ++) {
        let newCase = isCapital(name.text.charCodeAt(i));
        if (newCase !== curCase) {
            let chosenColor = curCase ? name.color2 : name.color;
            output += generateText(queue, chosenColor, name.bold, name.italic);
            
            queue = "";
            curCase = newCase;
        }
        queue += name.text[i];
    }
    let chosenColor = curCase ? name.color2 : name.color;
    output += generateText(queue, chosenColor, name.bold, name.italic);
    
    return rlc(output);
}

function generateName(name) {
    let output = "";
    if (name.colorMode === "alternating") {
        output = generateNameAlternating(name);
    }
    else if (name.colorMode === "word_alternating") {
        output = generateNameWordAlternating(name);
    }
    else if (name.colorMode === "capitalized") {
        output = generateNameCapitalized(name);
    }
    else if (name.colorMode === "gradient") {
        output = generateNameGradient(name);
    }
    else if (name.colorMode === "word_gradient") {
        output = generateNameWordGradient(name);
    }
    else if (name.colorMode === "metallic") {
        output = generateNameMetallic(name);
    }
    else {
        output = generateText(name.text, name.color, name.bold, name.italic);
    }
    return rlc(output);
}

function generateLore(text, color, italic) {
    if (text === "") {
        return "";
    }

    text = escapeChars(text);

    let lines = text.split("\n");
    let output = "";

    lines.forEach((line) => {
        output += ",'{";
        output += "\"text\":\"" + line + "\"";
        output += ",\"color\":\"" + color + "\"";
        output += ",\"italic\":" + italic;
        output += "}'";
    });

    return output;
}

function generateHideFlags(data) {
    let fl = 0;
    // Total up flags
    if (data.model.colorEnabled) {
        fl += 64;
    }

    // Return
    if (fl > 0) {
        return ",HideFlags:" + fl;
    }
    return "";
}

function generateDisplay(data) {
    if (
        data.name.text === "" &&
        data.lore.upsides === "" &&
        data.lore.downsides === "" &&
        data.lore.lore === "" &&
        !data.model.colorEnabled
    ) {
        return "";
    }

    let output = "";

    if (data.model.colorEnabled) {
        output += ",color:" + hexToDec(data.model.color);
    }

    if (data.name.text !== "") {
        output += ",Name:'[" + generateName(data.name) + "]'";
    }

    if (data.lore.upsides !== "" || data.lore.downsides !== "" || data.lore.lore !== "") {
        output += ",Lore:[";
        output += rlc(
            generateLore(data.lore.upsides, "blue", false) +
            generateLore(data.lore.downsides, "red", false) +
            generateLore(data.lore.lore, "dark_gray", true)
        );
        output += "]";
    }

    return ",display:{" + rlc(output) + "}";
}

function bindValue(num) {
    // Convert hex colors to dec
    if (typeof num === "string" && num.slice(0,1) === "#") {
        num = hexToDec(num);
    }

    // Make sure it's an int
    num = parseInt(String(num).replace(/,/g, ""));

    // Bind value to within the safe limits of Minecraft scoreboards
    if (num > 2147483647) {
        num = 2147483647;
    }
    if (num < -2147483648) {
        num = -2147483648;
    }

    return num;
}

function jsonParam(item, key, quotes) {
    if (item && item != 0 && item != "") {
        return "," + key + ":" + quotes + item + quotes;
    }
    return "";
}

function jsonChildren(children, key) {
    let output = "";

    if (children.length > 0) {
        output += "," + key + ":[";
        children.forEach((element, index) => {
            if (index > 0) {
                output += ",";
            }
            output += generateCondition(element, false);
        });
        output += "]";
    }

    return output;
}

function generateCondition(structure, isBase) {
    let output = "";

    output += "{";

    // Condition parameters
    if (!isBase) {
        output += "Id:" + structure.id;
        output += jsonParam(bindValue(structure.value),"Value","");
        output += jsonParam(bindValue(structure.value2),"Value2","");
        output += jsonParam(bindValue(structure.value3),"Value3","");
        output += jsonParam(bindValue(structure.value4),"Value4","");
        output += jsonParam(structure.nosound,"NoSound","");
        output += jsonParam(structure.inverted,"Inverted","");
        output += jsonParam(structure.text,"Text","\"");
    }
    
    // Child Conditions
    output += jsonChildren(structure.effects, "Effects");
    output += jsonChildren(structure.conditions, "Conditions");
    output += jsonChildren(structure.filters, "Filters");

    output += "}";

    return rlc(output);
}

function generateEnchantments(enchantments) {
    if (enchantments.length === 0) {
        return "";
    }

    let output = "";
    enchantments.forEach((ench) => {
        output += ",{id:\"" + ench.id + "\",lvl:" + ench.lvl + "}";
    })

    return ",Enchantments:[" + rlc(output) + "]";
}

function generateCommand(data) {
    let output = "";
    
    if (data.includeGive) {
        output += "/give @p " + data.itemId + "{";
    }

    output += data.slot + ":";

    output += generateCondition(data.structure, true);

    output += generateDisplay(data);

    output += generateEnchantments(data.enchantments);

    output += generateHideFlags(data);

    output = rlc(output);

    if (data.includeGive) {
        output += "}";
    }

    return output;
}

function CommandOutput({ data }) {
    let cmd = generateCommand(data);

    return (
        <div>
            <div>
                <code className="command-text" id="cmdText">{cmd}</code>
            </div>
        </div>
    );
    //return <div/>
}

export default CommandOutput;

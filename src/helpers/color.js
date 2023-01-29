function isHexChar(char) {
    return (48 <= char && char <= 57) || (97 <= char && char <= 122);
}

export function hexFormat(color) {
     // Check if it's a string
     if (typeof color !== "string") {
        return "#000000";
     }

    // Strip off # or 0x
    if (color.slice(0,1) === "#") {
        color = color.slice(1);
    }
    else if (color.slice(0,2) === "0x") {
        color = color.slice(2);
    }

    // Upper-Case it
    color = color.toLowerCase();

    // Make sure all characters are legal hex chars
    for (let i = 0; i < color.length; i ++) {
        if (!isHexChar(color.charCodeAt(i))) {
            color = color.slice(0,i) + color.slice(i+1);
            i -= 1;
        }
    }

    // Make sure it is six characters long
    if (color.length > 6) {
        color = color.slice(0,6);
    }
    while (color.length < 6) {
        color = "0" + color;
    }

    // Put # back on
    color = "#" + color;

    return color;
}

function charToNum(c) {
    let ascii = c.charCodeAt(0);

    // 0-9
    if (48 <= ascii && ascii <= 57) {
        return ascii - 48;
    }
    // a-f
    if (97 <= ascii && ascii <= 122) {
        return ascii - 87;
    }

    return 0;
}

// Converts color from a hex string to an integer
export function hexToDec(color) {
    // Remove leading #
    if (color.slice(0,1) === "#") {
        color = color.slice(1);
    }

    let factor = 1;
    let result = 0;
    for (let i = 5; i >= 0; i --) {
        result += factor * charToNum(color.slice(i,i+1));
        factor *= 16;
    }
    return result
}

function fixHex(h) {
    while (h.length < 2) {
        h = "0" + h;
    }
    return h;
}

function rgbToHex(c) {
    c.r = Math.trunc(c.r);
    c.g = Math.trunc(c.g);
    c.b = Math.trunc(c.b);

    return "#" + fixHex(c.r.toString(16)) + fixHex(c.g.toString(16)) + fixHex(c.b.toString(16));
}

function hexToRgb(color) {
    color = hexFormat(color);
    let red = charToNum(color[1]) * 16 + charToNum(color[2]);
    let green = charToNum(color[3]) * 16 + charToNum(color[4]);
    let blue = charToNum(color[5]) * 16 + charToNum(color[6]);
    
    return {r:red, g:green, b:blue}
}

function interpolate(num1, num2, factor) {
    if (factor > 1) {
        factor = 1;
    }
    if (factor < 0) {
        factor = 0;
    }

    return (num1 * (1-factor)) + (num2 * factor);
}

export function interpolateColor(color1, color2, factor) {
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);

    let result = {
        r: interpolate(c1.r, c2.r, factor),
        g: interpolate(c1.g, c2.g, factor),
        b: interpolate(c1.b, c2.b, factor),
    }

    return rgbToHex(result);
} 

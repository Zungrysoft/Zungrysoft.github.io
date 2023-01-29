import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

import loadableData from '../data/loadables.json';
import soundData from '../data/sounds.json';
import rangeData from '../data/ranges.json';
import slotData from '../data/slots.json';
import mobTypeData from '../data/mob_types.json';
import durationData from '../data/durations.json';
import resourceData from '../data/resources.json';
import equipmentData from '../data/equipment.json';
import angleData from '../data/angles.json';
import potionEffectData from '../data/potion_effects.json';
import limitedColorData from '../data/limited_colors.json';
import tridentPatternData from '../data/trident_patterns.json';

function userDefined() {
    let ret = {};
    for (let i = 1; i <= 40; i ++) {
        ret[i + 1000] = {
            "display":"User-Defined #" + i,
            "note":"See user_defined.txt for more info.",
            "value_mode":"input",
            "value_display":"Value",
            "value2_mode":"input",
            "value2_display":"Value2",
            "text_mode":"input",
            "text_display":"Text",
            "has_sound":true,
            "for_trident":true,
        }
    }
    return ret;
}

export function getEffectData() {
    return {
        ...effectData,
        ...userDefined(),
    }
}

export function getConditionData() {
    return {
        ...conditionData,
        ...userDefined(),
    }
}

export function getFilterData() {
    return {
        ...filterData,
        ...userDefined(),
    }
}

export function getDataByType(type) {
    if (type === 0) {
        return getEffectData();
    }
    else if (type === 1) {
        return getConditionData();
    }
    else if (type === 2) {
        return getFilterData();
    }
    else if (type === "loadable") {
        return loadableData;
    }
    else if (type === "sound") {
        return soundData;
    }
    else if (type === "range") {
        return rangeData;
    }
    else if (type === "slot") {
        return slotData;
    }
    else if (type === "mob_type") {
        return mobTypeData;
    }
    else if (type === "duration") {
        return durationData;
    }
    else if (type === "resource") {
        return resourceData;
    }
    else if (type === "equipment") {
        return equipmentData;
    }
    else if (type === "angle") {
        return angleData;
    }
    else if (type === "potion_effect") {
        return potionEffectData;
    }
    else if (type === "trident_pattern") {
        return tridentPatternData;
    }
    else if (type === "limited_color") {
        return limitedColorData;
    }
    else {
        return {}
    }
}

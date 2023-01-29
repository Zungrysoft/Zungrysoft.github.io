import { getFilterData } from '../helpers/jsonData.js';

// Context tracks whether the filter is causing conditions to
// be run on players or mobs. Some conditions need to be disabled
// depending on the context
export function getFilterContext(oldContext, id, type) {
    // If this isn't a filter, the context shouldn't change
    // Only filters can change context
    if (type !== 2) {
        return oldContext;
    }
    if (!getFilterData()[id]) {
        return oldContext;
    }
    if ("context" in getFilterData()[id]) {
        return getFilterData()[id].context;
    }
    return oldContext;
}

// Checks whether or not a particular id can be used under the circumstances
export function isDisabled(id,data,context,version) {
    // Versioning
    if ("version_min" in data[id] && version < data[id].version_min) {
        return true;
    }
    if ("version_max" in data[id] && version > data[id].version_max) {
        return true;
    }

    // Filter context
    if (!context) {
        return false;
    }

    if (context === "trident") {
        if ("trident_only" in data[id] && data[id]["trident_only"]) {
            return false;
        }
        if ("for_trident" in data[id] && data[id]["for_trident"]) {
            return false;
        }
        return true;
    }

    if (context !== "player" && context !== "self" && "player_only" in data[id] && data[id]["player_only"]) {
        return true;
    }
    if (context !== "self" && "self_only" in data[id] && data[id]["self_only"]) {
        return true;
    }
    if (context !== "mob" && "monster_only" in data[id] && data[id]["monster_only"]) {
        return true;
    }
    if (context !== "trident" && "trident_only" in data[id] && data[id]["trident_only"]) {
        return true;
    }

    return false;
}

// Trims down data to just the id's that are allowed under the circumstances
export function getValidEntries(data, context, version) {
    let ret = {};
    Object.keys(data).forEach((id) => {
        if (!isDisabled(id,data,context,version)) {
            ret[id] = data[id];
        }
    })
    return ret;
}

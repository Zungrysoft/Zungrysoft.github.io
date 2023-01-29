import React,{ Component } from 'react';
import AddEffectButton from './AddEffectButton.js';
import AddConditionButton from './AddConditionButton.js';
import AddFilterButton from './AddFilterButton.js';
import ButtonDelete from './ButtonDelete.js';
import ButtonDuplicate from './ButtonDuplicate.js';
import ButtonShiftUp from './ButtonShiftUp.js';
import ButtonShiftDown from './ButtonShiftDown.js';
import InputId from './InputId.js';
import Input from './Input.js';
import InputCheckbox from './InputCheckbox.js';
import InputNoSound from './InputNoSound.js';
import Note from './Note.js';
import '../App.css';

import { getFilterContext } from '../helpers/conditionUtils.js';

// Whether this item can contain more conditions in it
function hasChildren(type, id) {
    if (type === 0) {
        return false;
    }
    return true;
}

function boxType(type, depth) {
    if (type === 1) {
        if (depth % 2 === 0) {
            return "bounding-box-condition";
        }
        return "bounding-box-condition-alt";
    }
    if (type === 2) {
        return "bounding-box-filter";
    }

    return "bounding-box-effect";
}

function newCondition() {
    return {
        id: 0,
        value: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        inverted: false,
        nosound: false,
        text: "",
        effects: [],
        conditions: [],
        filters: [],
    };
}

function duplicateEntry(list, toCopy) {
    for (let i = 0; i < list.length; i ++) {
        if (list[i] === toCopy) {
            list.splice(i, 0, structuredClone(toCopy));
            break;
        }
    }
    return list;
}

function shiftUp(list, toShift) {
    for (let i = 1; i < list.length; i ++) {
        if (list[i] === toShift) {
            let swapper = list[i];
            list[i] = list[i-1];
            list[i-1] = swapper;
            break;
        }
    }
    return list;
}

function shiftDown(list, toShift) {
    for (let i = 0; i < list.length-1; i ++) {
        if (list[i] === toShift) {
            let swapper = list[i];
            list[i] = list[i+1];
            list[i+1] = swapper;
            break;
        }
    }
    return list;
}

function Condition({
    type, structure, onChange,
    eventDuplicate, eventShiftUp, eventShiftDown, 
    only, depth, context, version,
}) {
    return (
        <div className={boxType(type, depth)}>
            {depth > 0 ? <div>
                <ButtonDelete
                    eventClick={(e) => {
                        onChange({})
                    }}
                />
                <ButtonDuplicate
                    eventClick={(e) => {
                        eventDuplicate()
                    }}
                />
                {only ? <div/> :
                    <ButtonShiftUp
                        eventClick={(e) => {
                            eventShiftUp()
                        }}
                    />
                }
                {only ? <div/> :
                    <ButtonShiftDown
                        eventClick={(e) => {
                            eventShiftDown()
                        }}
                    />
                }
                <div>
                    <div className="entry">
                        <InputId
                            type={type}
                            startValue={structure.id}
                            context={context}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    id: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value"
                            startValue={structure.value}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value2"
                            startValue={structure.value2}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value2: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value3"
                            startValue={structure.value3}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value3: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value4"
                            startValue={structure.value4}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value4: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="text"
                            startValue={structure.text}
                            version={version}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    text: val
                                })
                            }}
                        />
                    </div>
                    {type === 0 ?
                        <div className="entry">
                            <InputNoSound
                                label="No Sounds or Particles"
                                id={structure.id}
                                startValue={structure.nosound}
                                onChange={(val) => {
                                    onChange({
                                        ...structure,
                                        nosound: val
                                    })
                                }}
                            />
                        </div>
                    : <div/>}
                    {type === 1 ?
                        <div className="entry">
                            <InputCheckbox
                                label="Inverted"
                                startValue={structure.inverted}
                                onChange={(val) => {
                                    onChange({
                                        ...structure,
                                        inverted: val
                                    })
                                }}
                            />
                        </div>
                    : <div/>}
                    <Note
                        type={type}
                        id={structure.id}
                    />
                </div>
            </div> : <div/>}
            {hasChildren(type, structure.id) ? <div>
                <div>
                    <AddEffectButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                effects: structure.effects.concat(newCondition())
                            })
                        }}
                    />
                </div>
                <div>
                    <AddConditionButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                conditions: structure.conditions.concat(newCondition())
                            })
                        }}
                    />
                </div>
                <div>
                    <AddFilterButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                filters: structure.filters.concat(newCondition())
                            })
                        }}
                    />
                </div>
            </div> : <div/>}
            {hasChildren(type, structure.id) ? <div>
                {/* Child Effects */}
                {structure.effects.map((effect, index) => (
                    <div key={index}>
                        <Condition
                            structure={effect}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    effects: structure.effects.map(
                                        x => x === effect ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            eventDuplicate={() => {
                                onChange({
                                    ...structure,
                                    effects: duplicateEntry(structure.effects,effect)
                                })
                            }}
                            eventShiftUp={() => {
                                onChange({
                                    ...structure,
                                    effects: shiftUp(structure.effects,effect)
                                })
                            }}
                            eventShiftDown={() => {
                                onChange({
                                    ...structure,
                                    effects: shiftDown(structure.effects,effect)
                                })
                            }}
                            only={structure.effects.length === 1}
                            depth={depth+1}
                            type={0}
                            context={getFilterContext(context, structure.id, type)}
                            version={version}
                        />
                    </div>
                ))}
                {/* Child Conditions */}
                {structure.conditions.map((condition, index) => (
                    <div key={index}>
                        <Condition
                            structure={condition}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    conditions: structure.conditions.map(
                                        x => x === condition ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            eventDuplicate={() => {
                                onChange({
                                    ...structure,
                                    conditions: duplicateEntry(structure.conditions,condition)
                                })
                            }}
                            eventShiftUp={() => {
                                onChange({
                                    ...structure,
                                    conditions: shiftUp(structure.conditions,condition)
                                })
                            }}
                            eventShiftDown={() => {
                                onChange({
                                    ...structure,
                                    conditions: shiftDown(structure.conditions,condition)
                                })
                            }}
                            only={structure.conditions.length === 1}
                            depth={depth+1}
                            type={1}
                            context={getFilterContext(context, structure.id, type)}
                            version={version}
                        />
                    </div>
                ))}
                {/* Child Filters */}
                {structure.filters.map((filter, index) => (
                    <div key={index}>
                        <Condition
                            structure={filter}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    filters: structure.filters.map(
                                        x => x === filter ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            eventDuplicate={() => {
                                onChange({
                                    ...structure,
                                    filters: duplicateEntry(structure.filters,filter)
                                })
                            }}
                            eventShiftUp={() => {
                                onChange({
                                    ...structure,
                                    filters: shiftUp(structure.filters,filter)
                                })
                            }}
                            eventShiftDown={() => {
                                onChange({
                                    ...structure,
                                    filters: shiftDown(structure.filters,filter)
                                })
                            }}
                            only={structure.filters.length === 1}
                            depth={depth+1}
                            type={2}
                            context={getFilterContext(context, structure.id, type)}
                            version={version}
                        />
                    </div>
                ))}
            </div> : <div/>}
        </div>
    );
}

export default Condition;

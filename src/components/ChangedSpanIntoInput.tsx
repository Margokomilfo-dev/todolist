import React, {ChangeEvent, useState} from "react";

type ChangedSpanIntoInputPropsType = {
    title: string
}
export function ChangedSpanIntoInput(props: ChangedSpanIntoInputPropsType) {
    let [editMod, setEditMod] = useState(false)
    let [value, setValue] = useState('')
    //----ON-------
    const editModOn = () => {
        setEditMod(true)
        setValue(props.title)
    }
    //----OFF-----
    const editModOff = () => {
        setEditMod(false)
    }
    //-----input------
    const onChangeInputText = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return(
        <div>
            {editMod
                ? <input onBlur={editModOff} value={value} onChange={onChangeInputText} autoFocus/>
                : <div onDoubleClick={editModOn}>{props.title}</div>
            }
        </div>
    )
}
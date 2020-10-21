import React, {ChangeEvent, useState} from "react"

type ChangedSpanIntoInputPropsType = {
    title: string
    changeItemText: (value: string) => void
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
        props.changeItemText(value)
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
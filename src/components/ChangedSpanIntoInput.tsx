import React, {ChangeEvent, useState} from "react"
import {TextField} from "@material-ui/core"
import s from "./Todolist/Todolist.module.css";

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
    const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            {editMod
                ? <TextField id="standard-size-small"
                               size="small"
                               onBlur={editModOff}
                               value={value}
                               onChange={onChangeInputText} autoFocus/>
                : <div onDoubleClick={editModOn}>{props.title}</div>
            }
        </div>
    )
}
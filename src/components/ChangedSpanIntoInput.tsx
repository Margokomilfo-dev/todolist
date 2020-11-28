import React, {ChangeEvent, useCallback, useState} from "react"
import {TextField} from "@material-ui/core"

type ChangedSpanIntoInputPropsType = {
    title: string
    changeItemText: (value: string) => void
}

export const ChangedSpanIntoInput = React.memo( (props: ChangedSpanIntoInputPropsType) => {
    console.log('ChangedSpanIntoInput')
    let [editMod, setEditMod] = useState(false)
    let [value, setValue] = useState('')
    //----ON-------
    const editModOn = useCallback(() => {
        setEditMod(true)
        setValue(props.title)
    }, [props.title])
    //----OFF-----
    const editModOff = useCallback(() => {
        setEditMod(false)
        props.changeItemText(value)
    }, [props.changeItemText])
    //-----input------
    const onChangeInputText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

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
})
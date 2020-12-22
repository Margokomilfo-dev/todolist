import React, {ChangeEvent, useCallback, useState} from 'react'
import {TextField} from '@material-ui/core'

export type ChangedSpanIntoInputPropsType = {
    title: string
    changeItemText: (value: string) => void
}

export const ChangedSpanIntoInput: React.FC<ChangedSpanIntoInputPropsType> = React.memo(({title, changeItemText}) => {
    let [editMod, setEditMod] = useState(false)
    let [value, setValue] = useState('')
    //----ON-------
    const editModOn = useCallback(() => {
        setEditMod(true)
        setValue(title)
    }, [title])
    //----OFF-----
    const editModOff = useCallback(() => {
        setEditMod(false)
        changeItemText(value)
    }, [changeItemText, value])
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
                : <div onDoubleClick={editModOn}>{title}</div>
            }
        </div>
    )
})
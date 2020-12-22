import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {TextField} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone'

export type AddFormPropsType = {
    addNewItem: (inputValue: string) => void
}
export const AddForm: React.FC<AddFormPropsType> = React.memo(({addNewItem}) => {
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string | null>('')

    let addTask = useCallback((inputValue: string) => {
        if (inputValue.trim()) {
            addNewItem(inputValue)
            setInputValue('')
        } else {
            setError('field is required')
        }
    }, [addNewItem])


    let onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputValue.trim() && setError(null)
        setInputValue(e.currentTarget.value)
    }

    let addInputText = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (inputValue.trim() && e.key === 'Enter') {
            addNewItem(inputValue)
            setInputValue('')
        }
    }

    return (
        <div className={s.taskInput}>
            <TextField id="outlined-error-helper-text"
                       label={error ? 'error' : 'new task'}
                       variant="outlined"
                       color={'secondary'}
                       value={inputValue}
                       onChange={onInputChange}
                       onKeyPress={addInputText}
                       error={Boolean(error)}
            />
            <IconButton onClick={() => addTask(inputValue)}>
                <AddCircleOutlineTwoToneIcon color={'primary'} style={{padding: '0px'}}/>
            </IconButton>
            {error ? <div className={s.error}> {error} </div> : null}
        </div>
    )
})
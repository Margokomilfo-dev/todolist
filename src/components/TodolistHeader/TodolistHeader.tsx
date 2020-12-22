import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {ChangedSpanIntoInput} from '../ChangedSpanIntoInput/ChangedSpanIntoInput'
import React, {useCallback} from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

type TodolistHeaderPropsType = {
    title: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodolistHeader: React.FC<TodolistHeaderPropsType> = React.memo(
    ({removeTodolist, changeTodolistTitle, title, todolistId}) => {
        let deleteTodolist = useCallback(() => {
            removeTodolist(todolistId)
        }, [removeTodolist, todolistId])

        let onChangeTitleText = useCallback((newTitle: string, todolistId: string) => {
            changeTodolistTitle(newTitle, todolistId)
        }, [changeTodolistTitle])
        return (
            <div className={s.todolistHeader}>
                <div className={s.todolistTitle}>
                    <ChangedSpanIntoInput title={title} changeItemText={(newTitle) => {
                        onChangeTitleText(newTitle, todolistId)
                    }}/>
                </div>
                <div>
                    <IconButton aria-label="delete" onClick={deleteTodolist}>
                        <DeleteIcon color={'secondary'}/>
                    </IconButton>
                </div>
            </div>
        )
    })
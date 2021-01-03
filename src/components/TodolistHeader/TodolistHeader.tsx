import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {ChangedSpanIntoInput} from '../ChangedSpanIntoInput/ChangedSpanIntoInput'
import React, {useCallback} from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {TodolistDomainType} from '../../features/TodolistsList/todolistsReducer'

type TodolistHeaderPropsType = {
    todolist: TodolistDomainType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodolistHeader: React.FC<TodolistHeaderPropsType> = React.memo(
    ({removeTodolist, changeTodolistTitle, todolist}) => {
        let deleteTodolist = useCallback(() => {
            removeTodolist(todolist.id)
        }, [removeTodolist, todolist.id])

        let onChangeTitleText = useCallback((newTitle: string, todolistId: string) => {
            changeTodolistTitle(newTitle, todolistId)
        }, [changeTodolistTitle])
        return (
            <div className={s.todolistHeader}>
                <div className={s.todolistTitle}>
                    <ChangedSpanIntoInput title={todolist.title} changeItemText={(newTitle) => {
                        onChangeTitleText(newTitle, todolist.id)
                    }}/>
                </div>
                <div>
                    <IconButton aria-label="delete" onClick={deleteTodolist} disabled={todolist.entityStatus === 'loading'} >
                        <DeleteIcon color={'secondary'}/>
                    </IconButton>
                </div>
            </div>
        )
    })
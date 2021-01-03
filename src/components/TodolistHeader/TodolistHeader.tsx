import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {ChangedSpanIntoInput} from '../ChangedSpanIntoInput/ChangedSpanIntoInput'
import React, {useCallback} from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {StatusType} from '../../app/appReducer'

type TodolistHeaderPropsType = {
    title: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodolistHeader: React.FC<TodolistHeaderPropsType> = React.memo(
    ({removeTodolist, changeTodolistTitle, title, todolistId}) => {
        const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
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
                    <IconButton aria-label="delete" onClick={deleteTodolist} disabled={status === 'loading'} >
                        <DeleteIcon color={'secondary'}/>
                    </IconButton>
                </div>
            </div>
        )
    })
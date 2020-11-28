import s from "./Todolist.module.css"
import {ChangedSpanIntoInput} from "./ChangedSpanIntoInput"
import React, {useCallback} from "react"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete";

type TodolistHeaderPropsType = {
    title: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodolistHeader = React.memo((props: TodolistHeaderPropsType) => {
    console.log('TodolistHeader')
    let deleteTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist])

    let onChangeTitleText = useCallback((newTitle: string, todolistId: string) => {
        props.changeTodolistTitle(newTitle, todolistId)
    }, [ props.changeTodolistTitle])
    return (
        <div className={s.todolistHeader}>
            <div className={s.todolistTitle}>
                <ChangedSpanIntoInput title={props.title} changeItemText={(newTitle) => {
                    onChangeTitleText(newTitle, props.todolistId)
                }}/>
            </div>

            <div>
                <IconButton aria-label="delete" onClick={deleteTodolist}>
                    <DeleteIcon color={"secondary"}/>
                </IconButton>
            </div>
        </div>
    )
})
import s from "./Todolist/Todolist.module.css"
import {ChangedSpanIntoInput} from "./ChangedSpanIntoInput"
import React from "react"

type TodolistHeaderPropsType = {
    title: string
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function TodolistHeader(props: TodolistHeaderPropsType) {
    //--------delete todolist---------
    let deleteTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    //--------change title of todolist ---------
    let onChangeTitleText = (newTitle: string, todolistId: string) => {
        props.changeTodolistTitle(newTitle, todolistId)
    }
    return (
        <div className={s.todolistHeader}>
            <div className={s.todolistTitle}>
                <ChangedSpanIntoInput title={props.title} changeItemText={(newTitle) => {
                    onChangeTitleText(newTitle, props.todolistId)
                }}/>
            </div>

            <div>
                <button onClick={deleteTodolist} className={s.todolistBtn}>x</button>
            </div>
        </div>
    )
}
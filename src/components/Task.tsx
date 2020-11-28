import {useDispatch} from "react-redux";
import {actions} from "../store/tasksReducer/tasksReducer";
import s from "./Todolist.module.css";
import {ChangedSpanIntoInput} from "./ChangedSpanIntoInput";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import {TaskType} from "../App";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    let dispatch = useDispatch()
    let onClickCheckBox = (e: boolean, id: string) => {
        //props.onCheckedBox(id, e, props.todolistId)
        dispatch(actions.changeCheckedStatusAC(props.todolistId, id, e))
    }
    const onChangeTaskTitleText = (taskId: string, newTitle: string, todolistId: string) => {
        //props.changeTaskTitleText(taskId, newTitle, todolist.id)
        dispatch(actions.changeTaskTitleTextAC(props.todolistId, taskId, newTitle))
    }
    return (
        <div key={props.task.id} className={`${s.task} + ${props.task.isDone ? s.taskCheckbox : ''}`}>
            <div>
                <input type="checkbox" checked={props.task.isDone} onClick={(e) => {
                    onClickCheckBox(e.currentTarget.checked, props.task.id)
                }}/>
            </div>
            <div className={s.taskTitle}>
                <ChangedSpanIntoInput title={props.task.title} changeItemText={(newTitle) => {
                    onChangeTaskTitleText(props.task.id, newTitle, props.todolistId)
                }}/>
            </div>
            <div className={s.taskBtn}>
                {/*<button onClick={() => { props.removeTask(t.id, props.todolistId)}}>X</button>*/}

                {/*<IconButton aria-label="delete" onClick={() => {props.removeTask(t.id, props.todolistId) }}>*/}
                <IconButton aria-label="delete" onClick={() => {
                    dispatch(actions.removeTaskAC(props.todolistId, props.task.id))
                }}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
}
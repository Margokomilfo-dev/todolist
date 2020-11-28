import {useDispatch} from "react-redux"
import {actions} from "../store/tasksReducer/tasksReducer"
import s from "./Todolist.module.css"
import {ChangedSpanIntoInput} from "./ChangedSpanIntoInput"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import React, {useCallback} from "react"
import {TaskType} from "../App"

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {
    let dispatch = useDispatch()
    let onClickCheckBox = useCallback((e: boolean, id: string) => {
        dispatch(actions.changeCheckedStatusAC(todolistId, id, e))
    }, [dispatch, todolistId])

    const onChangeTaskTitleText = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(actions.changeTaskTitleTextAC(todolistId, taskId, newTitle))
    }, [dispatch])
    return (
        <div key={task.id} className={`${s.task} + ${task.isDone ? s.taskCheckbox : ''}`}>
            <div>
                <input type="checkbox" checked={task.isDone} onClick={(e) => {
                    onClickCheckBox(e.currentTarget.checked, task.id)
                }}/>
            </div>
            <div className={s.taskTitle}>
                <ChangedSpanIntoInput title={task.title} changeItemText={(newTitle) => {
                    onChangeTaskTitleText(task.id, newTitle, todolistId)
                }}/>
            </div>
            <div className={s.taskBtn}>
                <IconButton aria-label="delete" onClick={() => {
                    dispatch(actions.removeTaskAC(todolistId, task.id))
                }}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})
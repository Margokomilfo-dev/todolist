import {useDispatch} from 'react-redux'
import {actions, changeTaskCheckedTC, changeTaskTitleTC, deleteTaskTC} from '../../features/TodolistsList/tasksReducer'
import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {ChangedSpanIntoInput} from '../ChangedSpanIntoInput/ChangedSpanIntoInput'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import React, {useCallback} from 'react'
import {TaskStatuses, TaskType} from '../../api/api'

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {
    let dispatch = useDispatch()
    let onClickCheckBox = useCallback((e: boolean, id: string) => {
        dispatch(actions.changeCheckedStatusAC(todolistId, id, e ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todolistId])

    const onChangeTaskTitleText = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(actions.changeTaskTitleTextAC(todolistId, taskId, newTitle))
    }, [dispatch])
    return (
        <div key={task.id} className={`${s.task} + ${task.status === TaskStatuses.Completed ? s.taskCheckbox : ''}`}>
            <div>
                <input type="checkbox" checked={task.status === TaskStatuses.Completed} onClick={(e) => {
                    dispatch((changeTaskCheckedTC(todolistId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)))
                }}/>
            </div>
            <div className={s.taskTitle}>
                <ChangedSpanIntoInput title={task.title} changeItemText={(newTitle) => {
                    dispatch(changeTaskTitleTC(todolistId, task.id, newTitle))
                }}/>
            </div>
            <div className={s.taskBtn}>
                <IconButton aria-label="delete" onClick={() => {
                    dispatch(deleteTaskTC(todolistId, task.id))
                }}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})
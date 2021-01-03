import {useDispatch, useSelector} from 'react-redux'
import {actions, changeTaskCheckedTC, changeTaskTitleTC, deleteTaskTC} from '../../features/TodolistsList/tasksReducer'
import s from '../../features/TodolistsList/Todolist/Todolist.module.css'
import {ChangedSpanIntoInput} from '../ChangedSpanIntoInput/ChangedSpanIntoInput'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import React, {MouseEvent, useCallback} from 'react'
import {TaskStatuses, TaskType} from '../../api/api'
import {AppRootStateType} from '../../app/store'
import {StatusType} from '../../app/appReducer'

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    let dispatch = useDispatch()

    let onClickCheckBox = (e: MouseEvent<HTMLInputElement>)  => {
        dispatch((changeTaskCheckedTC(todolistId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)))
    }
    const onChangeTaskTitleText = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleTC(todolistId, task.id, newTitle))
        }, [dispatch])

    return (
        <div key={task.id} className={`${s.task} + ${task.status === TaskStatuses.Completed ? s.taskCheckbox : ''}`}>
            <div>
                <input type="checkbox" checked={task.status === TaskStatuses.Completed} onClick={(e) => {
                    onClickCheckBox(e)
                }}/>
            </div>
            <div className={s.taskTitle}>
                <ChangedSpanIntoInput title={task.title} changeItemText={(newTitle) => {
                    onChangeTaskTitleText(newTitle)
                }}/>
            </div>
            <div className={s.taskBtn}>
                <IconButton aria-label="delete"
                            onClick={() => {dispatch(deleteTaskTC(todolistId, task.id))}} >
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
})
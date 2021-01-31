import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolistsReducer'
import {ModelType, tasksApi, TaskStatuses, TaskType, TodolistsType} from '../../api/api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {changeAppStatusAC} from '../../app/appReducer'
import {handleServerAppError, handleServerNetworkError} from '../../utills/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: TasksType = {}

const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        addNewTaskAC: (state, action:PayloadAction<{task: TaskType}>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        removeTaskAC: (state, action:PayloadAction<{todolistId: string, taskId: string}>) => {
            const index =  state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        },
        changeTaskTitleTextAC: (state, action:PayloadAction<{todolistId: string, taskId: string, newTitle: string}>) => {
            const index =  state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index].title = action.payload.newTitle
            }
        },
        changeCheckedStatusAC: (state, action:PayloadAction<{todolistId: string, taskId: string, status: TaskStatuses}>) => {
            const index =  state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId][index].status = action.payload.status
            }
        },
        setTasksAC: (state, action:PayloadAction<{todolistId: string, tasks: Array<TaskType>}>) => {
             state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
    }
})
export const {addNewTaskAC, removeTaskAC, changeTaskTitleTextAC, changeCheckedStatusAC,setTasksAC} = slice.actions
export const tasksReducer = slice.reducer
// thunks
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    tasksApi.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC({todolistId: todolistID, tasks: res.data.items}))
            dispatch(changeAppStatusAC({status: 'succeeded'}))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    tasksApi.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addNewTaskAC({task: res.data.data.item}))
                dispatch(changeAppStatusAC({status: 'succeeded'}))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({ status: 'loading'}))
    // dispatch(changeTodolistEntityStatus(todolistID, 'loading'))
    tasksApi.deleteTask(todolistID, taskID)
        .then(res => {
            if (res.data.resultCode === 0){
                dispatch(removeTaskAC({todolistId: todolistID, taskId: taskID}))
                dispatch(changeAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            console.warn('task not found in the state')
            throw new Error('task not found in the state')
            return
        }
        const model: ModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: title
        }
        dispatch(changeAppStatusAC({status: 'loading'}))
        tasksApi.updateTask(todolistID, taskID, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleTextAC({todolistId: todolistID, taskId: taskID, newTitle: title}))
                    dispatch(changeAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }
export const changeTaskCheckedTC = (todolistID: string, taskID: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            console.warn('task not found in the state')
            throw new Error('task not found in the state')
            return
        }
        const model: ModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: status,
            title: task.title
        }
        dispatch(changeAppStatusAC({status: 'loading'}))
        tasksApi.updateTask(todolistID, taskID, model)
            .then(res => {
                if (res.data.resultCode === 0){
                    dispatch(changeCheckedStatusAC({todolistId: todolistID, taskId: taskID, status: status}))
                    dispatch(changeAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err, dispatch)
            })
    }

// types
export type TasksType = {
    [key: string]: Array<TaskType>
}
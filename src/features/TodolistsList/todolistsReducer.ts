import {todolistsApi, TodolistsType} from '../../api/api'
import {Dispatch} from 'redux'
import {changeAppStatusAC, StatusType} from '../../app/appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utills/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: Array<TodolistDomainType> = []
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        addTodolistAC: (state, action: PayloadAction<{todolist: TodolistsType}>)=> {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        removeTodolistAC: (state, action: PayloadAction<{id: string}>)=> {
            const index =  state.findIndex(t => t.id === action.payload.id)
            if (index > -1) {state.splice(index, 1)}
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{id: string, newTitle: string}>)=> {
            const index =  state.findIndex(t => t.id === action.payload.id)
            state[index].title = action.payload.newTitle
        },
        changeTodolistFilterValueAC: (state, action: PayloadAction<{id: string, newFilterValue: FilterValuesType}>) => {
            const index =  state.findIndex(t => t.id === action.payload.id)
            state[index].filter = action.payload.newFilterValue
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{id: string, status: StatusType}>)=> {
            const index =  state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC: (state, action: PayloadAction<{todolists: Array<TodolistsType>}>)=> {
            return action.payload.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        },
    }
})
export const {addTodolistAC, removeTodolistAC, changeTodolistTitleAC,
              changeTodolistFilterValueAC, changeTodolistEntityStatus, setTodolistsAC } = slice.actions

export const todolistReducer = slice.reducer

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists: res}))
            dispatch(changeAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: todolistID, status: 'loading'}))
    todolistsApi.deleteTodolist(todolistID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({id: todolistID}))
                dispatch(changeAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addNewTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.resultCode === 0){
                dispatch(addTodolistAC({todolist: res.data.item}))
                dispatch(changeAppStatusAC({status: 'succeeded'}))
            }else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)

        })
}
// types
export type FilterValuesType = 'all' | 'active' | 'completed'

export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    todolistsApi.changeTodolistTitle(todolistID, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: todolistID, newTitle: title}))
                dispatch(changeAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
    entityStatus: StatusType
}

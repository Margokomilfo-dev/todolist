import {todolistsApi, TodolistsType} from '../../api/api'
import {Dispatch} from 'redux'
import {changeAppStatusAC, StatusType} from '../../app/appReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utills/error-utils'

// variables
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER_VALUE = 'CHANGE_TODOLIST_FILTER_VALUE'
export const SET_TODOLISTS = 'SET_TODOLISTS'
export const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE_TODOLIST_ENTITY_STATUS'


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState,
                                action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case REMOVE_TODOLIST:
            return [...state.filter(t => t.id !== action.id)]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case CHANGE_TODOLIST_FILTER_VALUE:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newFilterValue} : tl)
        case CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case SET_TODOLISTS: {
            return action.todolists.map(todolist => {
                return {...todolist, filter: 'all', entityStatus: 'idle'}
            })
        }
        default:
            return state
    }
}

// actions
export const addTodolistAC = (todolist: TodolistsType) =>
    ({type: ADD_TODOLIST, todolist} as const)
export const removeTodolistAC = (id: string) =>
    ({type: REMOVE_TODOLIST, id} as const)
export const changeTodolistTitleAC = (id: string, newTitle: string) =>
    ({type: CHANGE_TODOLIST_TITLE, id, newTitle} as const)
export const changeTodolistFilterValueAC = (id: string, newFilterValue: FilterValuesType) =>
    ({type: CHANGE_TODOLIST_FILTER_VALUE, id, newFilterValue} as const)
export const changeTodolistEntityStatus = (id: string, status: StatusType) =>
    ({type: CHANGE_TODOLIST_ENTITY_STATUS, id, status} as const)
export const setTodolistsAC = (todolists: Array<TodolistsType>) =>
    ({type: SET_TODOLISTS, todolists} as const)


// thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res))
            dispatch(changeAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatus(todolistID, 'loading'))
    todolistsApi.deleteTodolist(todolistID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
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
                dispatch(addTodolistAC(res.data.item))
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
                dispatch(changeTodolistTitleAC(todolistID, title))
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

export type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatus>
export type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterValueAC>
    | ReturnType<typeof setTodolistsAC>
    | changeTodolistEntityStatusType
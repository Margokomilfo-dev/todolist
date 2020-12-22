import {todolistsApi, TodolistsType} from '../../api/api'
import {Dispatch} from 'redux'

// variables
export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER_VALUE = 'CHANGE_TODOLIST_FILTER_VALUE'
export const SET_TODOLISTS = 'SET_TODOLISTS'


const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState,
                                action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]
        case REMOVE_TODOLIST:
            return [...state.filter(t => t.id !== action.id)]
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case CHANGE_TODOLIST_FILTER_VALUE:
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newFilterValue} : tl)
        case SET_TODOLISTS: {
            return action.todolists.map(todolist => {
                return {...todolist, filter: 'all'}
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
export const setTodolistsAC = (todolists: Array<TodolistsType>) =>
    ({type: SET_TODOLISTS, todolists} as const)

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res))
        })
}
export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.deleteTodolist(todolistID)
        .then((res) => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const addNewTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.item))
        })
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.changeTodolistTitle(todolistID, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        })
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}
export type ActionsType =
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterValueAC>
    | ReturnType<typeof setTodolistsAC>
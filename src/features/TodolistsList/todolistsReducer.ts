import {todolistsApi, TodolistsType} from '../../api/api'
import {Dispatch} from 'redux'
import {changeStatusAC, ChangeStatusACType, ChangeErrorTextACType, changeErrorTextAC} from '../../app/appReducer'

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
export const setTodolistsTC = () => (dispatch: Dispatch<ActionsType | ChangeStatusACType | ChangeErrorTextACType>) => {
    dispatch(changeStatusAC('loading'))
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res))
            dispatch(changeStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch((changeStatusAC('failed')))
            dispatch(changeErrorTextAC(error))
    })
}
export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch<ActionsType | ChangeStatusACType | ChangeErrorTextACType>) => {
    dispatch(changeStatusAC('loading'))
    todolistsApi.deleteTodolist(todolistID)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
                dispatch(changeStatusAC('succeeded'))
            } else {
                alert('deleteTodolistTC')
            }

        })
}
export const addNewTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType | ChangeStatusACType | ChangeErrorTextACType>) => {
    dispatch(changeStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.resultCode === 0){
                dispatch(addTodolistAC(res.data.item))
                dispatch(changeStatusAC('succeeded'))
            } else if (res.messages.length){
                dispatch(changeStatusAC('failed'))
                dispatch(changeErrorTextAC(res.messages[0]))
            }else {
                dispatch(changeStatusAC('failed'))
                dispatch(changeErrorTextAC('Some error occurred'))
            }
        })
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionsType | ChangeStatusACType>) => {
    dispatch(changeStatusAC('loading'))
    todolistsApi.changeTodolistTitle(todolistID, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistID, title))
            dispatch(changeStatusAC('succeeded'))
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
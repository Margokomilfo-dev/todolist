import {v1} from "uuid"
import {TodolistsType} from "../../api/api";

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER_VALUE = 'CHANGE_TODOLIST_FILTER_VALUE'

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistsType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodolist: TodolistDomainType = {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 1}
            return [...state, newTodolist]
        case REMOVE_TODOLIST:
            let newArrTodolist = state.filter(t => t.id !== action.id)
            return [...newArrTodolist]
        case CHANGE_TODOLIST_TITLE:{
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [ ...state]
        }
        case CHANGE_TODOLIST_FILTER_VALUE:{
            let todolist = state.find(td => td.id === action.id)
            if (todolist) {
                todolist.filter = action.newFilterValue
            } return [ ...state]
        }
        default:
            return state
    }
}
export type ActionsType =
    ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterValueAC>


export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST, title, todolistId: v1()} as const)
export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id} as const)
export const changeTodolistTitleAC = (id: string, newTitle: string) => ({type: CHANGE_TODOLIST_TITLE, id, newTitle} as const)
export const changeTodolistFilterValueAC = (id: string, newFilterValue: FilterValuesType) => ({type: CHANGE_TODOLIST_FILTER_VALUE, id, newFilterValue} as const)
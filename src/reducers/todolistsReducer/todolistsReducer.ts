import {v1} from "uuid"

const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER_VALUE = 'CHANGE_TODOLIST_FILTER_VALUE'
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todolistReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'}
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


export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST, title} as const)
export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id} as const)
export const changeTodolistTitleAC = (id: string, newTitle: string) => ({type: CHANGE_TODOLIST_TITLE, id, newTitle} as const)
export const changeTodolistFilterValueAC = (id: string, newFilterValue: FilterValuesType) => ({type: CHANGE_TODOLIST_FILTER_VALUE, id, newFilterValue} as const)
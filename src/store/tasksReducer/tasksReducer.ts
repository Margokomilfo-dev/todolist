import {TasksType, TaskType} from "../../App";
import {v1} from "uuid";
import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
} from "../todolistsReducer/todolistsReducer";

export enum ActionsTypes {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_CHECKED_STATUS = 'CHANGE_CHECKED_STATUS',
}

type ActionsType = ReturnType<ActionType<typeof actions>>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ActionsTypes.ADD_TASK:
            const newTask: TaskType = {id: action.id, isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case ActionsTypes.REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case ActionsTypes.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.newTitle} : task)
                }
        case ActionsTypes.CHANGE_CHECKED_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.value} : task)
            }
        case ADD_TODOLIST:{
                const stateCopy = {...state}
                stateCopy[action.todolistId] = []
                return stateCopy
            }
        case REMOVE_TODOLIST:{
                const stateCopy = {...state}
                delete stateCopy[action.id]
                return stateCopy
            }
        default:
            return state
    }
}
type ActionType<T> = T extends { [key: string]: infer U } ? U : never
export const actions = {
    addNewTaskAC: (todolistId: string, title: string) => ({type: ActionsTypes.ADD_TASK, todolistId, title, id: v1() } as const),
    removeTaskAC: (todolistId: string, taskId: string) => ({type: ActionsTypes.REMOVE_TASK, todolistId, taskId} as const),
    changeTaskTitleTextAC: (todolistId: string, taskId: string, newTitle: string) => ({ type: ActionsTypes.CHANGE_TASK_TITLE, todolistId, taskId, newTitle } as const),
    changeCheckedStatusAC: (todolistId: string, taskId: string, value: boolean) => ({ type: ActionsTypes.CHANGE_CHECKED_STATUS, todolistId, taskId, value } as const),
}
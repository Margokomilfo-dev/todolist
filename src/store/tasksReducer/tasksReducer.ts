import {v1} from 'uuid'
import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    setTodolistsAC,
    SET_TODOLISTS,
} from '../todolistsReducer/todolistsReducer'
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, todolistsApi} from '../../api/api'
import {Dispatch} from 'redux'

export enum ActionsTypes {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_CHECKED_STATUS = 'CHANGE_CHECKED_STATUS',
    SET_TASKS = 'SET_TASKS'
}

type ActionsType = ReturnType<ActionType<typeof actions>>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export type TasksType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ActionsTypes.ADD_TASK:
            const newTask: TaskType = {
                id: action.id, title: action.title, status: TaskStatuses.New,
                addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low,
                startDate: '', todoListId: action.todolistId
            }
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
                    .map(task => task.id === action.taskId ? {...task, status: action.status} : task)
            }
        case ADD_TODOLIST: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case ActionsTypes.SET_TASKS: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}
type ActionType<T> = T extends { [key: string]: infer U } ? U : never
export const actions = {
    addNewTaskAC: (todolistId: string, title: string) => ({type: ActionsTypes.ADD_TASK, todolistId, title, id: v1()} as const),
    removeTaskAC: (todolistId: string, taskId: string) => ({type: ActionsTypes.REMOVE_TASK, todolistId, taskId} as const),
    changeTaskTitleTextAC: (todolistId: string, taskId: string, newTitle: string) => ({type: ActionsTypes.CHANGE_TASK_TITLE, todolistId, taskId, newTitle} as const),
    changeCheckedStatusAC: (todolistId: string, taskId: string, status: TaskStatuses) => ({type: ActionsTypes.CHANGE_CHECKED_STATUS, todolistId, taskId, status} as const),
    setTasksAC: (todolistId: string, tasks: Array<TaskType>) => ({type: ActionsTypes.SET_TASKS, todolistId, tasks} as const),
}

export const setTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistID)
        .then(res => {
            dispatch(actions.setTasksAC(todolistID, res.data.items))
        })
}
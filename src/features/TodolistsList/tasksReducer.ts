import {
    ADD_TODOLIST, addTodolistAC,
    REMOVE_TODOLIST, removeTodolistAC,
    SET_TODOLISTS, setTodolistsAC
} from './todolistsReducer'
import {ModelType, tasksApi, TaskStatuses, TaskType} from '../../api/api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'

const initialState: TasksType = {}
export const tasksReducer = (state: TasksType = initialState, action: ActionsType) => {
    switch (action.type) {
        case ActionsTypes.ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case ActionsTypes.REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
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
        case ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}
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
        case ActionsTypes.SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const actions = {
    addNewTaskAC: (task: TaskType) =>
        ({type: ActionsTypes.ADD_TASK, task} as const),
    removeTaskAC: (todolistId: string, taskId: string) =>
        ({type: ActionsTypes.REMOVE_TASK, todolistId, taskId} as const),
    changeTaskTitleTextAC: (todolistId: string, taskId: string, newTitle: string) =>
        ({type: ActionsTypes.CHANGE_TASK_TITLE, todolistId, taskId, newTitle} as const),
    changeCheckedStatusAC: (todolistId: string, taskId: string, status: TaskStatuses) =>
        ({type: ActionsTypes.CHANGE_CHECKED_STATUS, todolistId, taskId, status} as const),
    setTasksAC: (todolistId: string, tasks: Array<TaskType>) =>
        ({type: ActionsTypes.SET_TASKS, todolistId, tasks} as const),
}

// thunks
export const setTasksTC = (todolistID: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.getTasks(todolistID)
        .then(res => {
            dispatch(actions.setTasksAC(todolistID, res.data.items))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.createTask(todolistID, title)
        .then(res => {
            dispatch(actions.addNewTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<ActionsType>) => {
    tasksApi.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(actions.removeTaskAC(todolistID, taskID))
        })
}
export const changeTaskTitleTC = (todolistID: string, taskID: string, title: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

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

        tasksApi.updateTask(todolistID, taskID, model)
            .then(res => {
                dispatch(actions.changeTaskTitleTextAC(todolistID, taskID, title))
            })
    }
export const changeTaskCheckedTC = (todolistID: string, taskID: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

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
        tasksApi.updateTask(todolistID, taskID, model)
            .then(res => {
                dispatch(actions.changeCheckedStatusAC(todolistID, taskID, status))
            })
    }

// types
type ActionType<T> = T extends { [key: string]: infer U } ? U : never
type ActionsType = ReturnType<ActionType<typeof actions>>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export enum ActionsTypes {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_CHECKED_STATUS = 'CHANGE_CHECKED_STATUS',
    SET_TASKS = 'SET_TASKS'
}

export type TasksType = {
    [key: string]: Array<TaskType>
}
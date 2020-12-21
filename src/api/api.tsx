import axios from 'axios'

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type AuthDataType = {
    id: number
    email: string
    login: string
}
type ResponseType<T = {}> = {
    fieldsErrors: Array<string>
    resultCode: number
    messages: Array<string>
    data: T
}
type ResponseGetTaskType = {
    error: string
    items: Array<TaskType>
    totalCount: number
}


const model = {
    title: '',
    description: 'description',
    status: 1,
    priority: 1,
    startDate: '11.12.2020',
    deadline: '12.12.2020',
}

export type ModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4'
    }
})

export const todolistsApi = {
    authMe: () => {
        return instance.get<ResponseType<AuthDataType>>('auth/me').then(res => res.data)
    },
    getTodolists: () => {
        return instance.get<Array<TodolistsType>>('todo-lists').then(res => res.data)
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title}).then(res => res.data)
    },
    deleteTodolist: (todolistID: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    changeTodolistTitle: (todolistId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export const tasksApi = {
    getTasks: (todolistId: string) => {
        return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask: (todolistId: string, taskId: string, model: ModelType) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...model})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
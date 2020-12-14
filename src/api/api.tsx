import axios from 'axios'

const task = {
    title: '',
    description: 'description',
    completed: false,
    status: 1,
    priority: 1,
    startDate: '11.12.2020',
    deadline: '12.12.2020',
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4'
    }
})

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
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, title: title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
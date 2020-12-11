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
type TodolistsType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type AuthDataType = {
    id: number
    email: string
    login: string
}

type ResponseTodolistType<T = {}> = {
    fieldsErrors: Array<string>
    resultCode: number
    messages: Array<string>
    data: T
}
type ResponseTaskType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type ResponseGetTaskType = {
    error: string
    items: Array<TaskType>
    totalCount: number
}

export const todolistsApi = {
    authMe: () => {
        return instance.get<ResponseTodolistType<AuthDataType>>('auth/me').then(res => res.data)
    },
    getTodolists: () => {
        return instance.get<Array<TodolistsType>>('todo-lists').then(res => res.data)
    },
    createTodolist: (title: string) => {
        return instance.post<ResponseTodolistType<{ item: TodolistsType }>>('todo-lists', {title}).then(res => res.data)
    },
    deleteTodolist: (todolistID: string) => {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistID}`)
    },
    changeTodolistTitle: (todolistId: string, title: string) => {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    }

}

export const tasksApi = {
    getTasks: (todolistId: string) => {
        return instance.get<ResponseGetTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<ResponseTaskType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => {
        return instance.put<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task, title: title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }


}
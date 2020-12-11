import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4'
    }
})

export const todolistApi = {
    AuthMe: () => {
        return instance.get('auth/me').then(res => res.data)
    },
    GetTodolists: () => {
        return instance.get('todo-lists').then(res => res.data)
    },
    CreateTodolist: (title: string) => {
        return instance.post('todo-lists', {title}).then(res => res.data)
    },
    DeleteTodolist: (todolistID: string) => {
        return instance.delete(`todo-lists/${todolistID}`)
    },
    ChangeTodolistTitle: (todolistId: string, title: string) => {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }

}
import React, {useEffect, useState} from 'react';
import {Meta} from '@storybook/react/types-6-0'
import axios from 'axios'

export default {
    title: 'API/Todolists ',
} as Meta

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4'
    }
})

export const AuthMe = () => {
    const [state, setState] = useState<any>('')
    useEffect(() => {
        instance.get('auth/me')
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data.data)
                } else {
                    setState(res.data.messages[0])
                }
            })
    }, [])
    console.log(state)

    return (
        <div>
            <div>id: {state.id}</div>
            <div>login: {state.login}</div>
            <div>email: {state.email}</div>
            <br/>
            {/*{JSON.stringify(state)}*/}
            <div>{state.login}, Welcome to Storybook!!!</div>
        </div>
    )
}


export const getTodolists = () => {
    const [state, setState] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)
    useEffect(() => {
        instance.get('todo-lists')
            .then((res) => {
                !res.data.length && setState(['notning!'])
                res.data.length && setState(res.data)
                setCount(res.data.length)
            })
    }, [])

    const newState = state.map(td => <div key={td.id}> title: {td.title}, todolist ID: {td.id}</div>)
    return (
        <div>
            {/*{JSON.stringify(state)}*/}
            <div>{newState}</div>
            <div>Count of todolists: {count}</div>
        </div>
    )
}

export const createTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [error, setError] = useState<any>(null)

    const createTodolist = () => {
        instance.post('/todo-lists', {title: title})
            .then(res => {
                if (res.data.resultCode === 0) {
                    setState(res.data.data.item)
                    setTitle('')
                } else {
                    setError(res.data.messages)
                }
            })
    }
    return (
        <div>
            <div><input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}
                        placeholder={`please, input todolist's title`}/></div>
            <div>
                <button onClick={createTodolist}> create new Todolist</button>
            </div>
            {!error && state && <div>New todolist: <br/> title: {state.title}, todolist ID: {state.id}</div>}
            {error && <div>{error}</div>}
            {/*{JSON.stringify(state)}*/}
        </div>
    )
}
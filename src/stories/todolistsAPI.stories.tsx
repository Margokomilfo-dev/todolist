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
        instance.post('todo-lists', {title: title})
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

export const deleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [error, setError] = useState<any>(null)

    const deleteTodolist = () => {
        instance.delete(`todo-lists/${todolistID}`)
            .then(res => {
                setState('DONE!')
                setTodolistID('')
            })
            .catch(res => {
                setError(res.message)
            })
    }
    return (
        <div>
            <div><input type="text" value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}
                        placeholder={`please, input todolistID`}/></div>
            <div>
                <button onClick={deleteTodolist}> delete Todolist</button>
            </div>
            <div>{state}</div>
            {error && <div>{error}</div>}
            {/*{JSON.stringify(state)}*/}
        </div>
    )
}


export const changeTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<any>(null)

    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)


    useEffect(() => {
        instance.get('todo-lists')
            .then((res) => {
                !res.data.length && setAllTodolists(['notning!'])
                res.data.length && setAllTodolists(res.data)
                setCount(res.data.length)
            })
    }, [state])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> title: {td.title}, todolist ID: {td.id}</div>)
    const changeTodolistTitle = () => {
        instance.put(`todo-lists/${todolistId}`, {title: title})
            .then(res => {
                setState('DONE!')
                setTodolistId('')
                setTitle('')
            })
            .catch(res => {
                setError(res.message)
            })
    }

    console.log(error)
    return (
        <div>
            <div><input type="text" value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}
                        placeholder={`please, input todolistID`}/></div>
            <div><input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}
                        placeholder={`please, input newTitle`}/></div>
            <div>
                <button onClick={changeTodolistTitle}> change title of Todolist</button>
            </div>

            <div>{state}</div>
            {error && <div>Nothing changed!!!! <br/> Error: {error}</div>}

            <br/>
            <div>Todolists: <br/>{allTodolistsMap}</div>
            <div>Count of todolists: {count}</div>

            {/*{JSON.stringify(state)}*/}
        </div>
    )
}


import React, {useEffect, useState} from 'react';
import {Meta} from '@storybook/react/types-6-0'
import {todolistsApi} from '../api/api';

export default {
    title: 'API/Todolists'
} as Meta

export const AuthMe = () => {
    const [state, setState] = useState<any>('')
    useEffect(() => {
        todolistsApi.authMe()
            .then(res => {
                if (res.resultCode === 0) {
                    setState(res.data)
                } else {
                    setState(res.messages[0])
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

export const GetTodolists = () => {
    const [state, setState] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                !res.length && setState(['notning!'])
                res.length && setState(res)
                setCount(res.length)
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

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [error, setError] = useState<any>(null)

    const createTodolist = () => {
        todolistsApi.createTodolist(title)
            .then(res => {
                if (res.resultCode === 0) {
                    setState(res.data.item)
                    setTitle('')
                } else {
                    setError(res.messages)
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

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState('')
    const [error, setError] = useState<any>(null)

    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistID)
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

export const ChangeTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<any>(null)

    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)


    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                !res.length && setAllTodolists(['notning!'])
                res.length && setAllTodolists(res)
                setCount(res.length)
            })
    }, [state])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> , ID: {td.id}, title: {td.title}</div>)
    const changeTodolistTitle = () => {
        todolistsApi.changeTodolistTitle(todolistId, title)
            .then(res => {
                setState('DONE!')
                setTodolistId('')
                setTitle('')
            })
            .catch(res => {
                setError(res.message)
            })
    }

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


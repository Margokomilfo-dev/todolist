import React, {useEffect, useState} from 'react';
import { Meta } from '@storybook/react/types-6-0'
import axios from 'axios'

export default {
    title: 'API/Todolists ',
} as Meta

const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
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
                if(res.data.resultCode === 0){
                    setState(res.data.data)
                } else {
                    setState(res.data.messages[0])
                }
            })
    }, [])
    console.log(state)

    return(
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

    console.log(state)

    const newState = state.map(td => <div key={td.id}> {td.index} title: {td.title}, todolist ID: {td.id}</div>)
    return (
        <div>
            {/*{JSON.stringify(state)}*/}
            <div>{newState}</div>
            <div>Count of todolists: {count}</div>
        </div>
    )
}
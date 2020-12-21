import React, {useEffect, useState} from 'react'
import {Meta} from '@storybook/react/types-6-0'
import {TaskPriorities, tasksApi, TaskStatuses, todolistsApi} from '../api/api'

export default {
    title: 'API/Tasks'
} as Meta

export const GetTasks = () => {
    //All todolists
    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists().then(res => {
            !res.length && setAllTodolists(['notning!'])
            res.length && setAllTodolists(res)
            setCount(res.length)
        })
    }, [])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> ID: {td.id}, title: {td.title}</div>)
    //Tasks
    const [todolistID, setTodolistID] = useState('')
    const [tasks, setTasks] = useState<Array<any>>([])
    const getTasks = () => {
        tasksApi.getTasks(todolistID).then(res => {
            debugger
            setTasks(res.data.items)
            setTodolistID('')
        }).catch(res => {
            setTasks(res.message)
        })
    }
    const todolistTasks = tasks.map(t => <div>id: {t.id}, title: {t.title}</div>)

    return (
        <div>
            <input type="text" value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}
                   placeholder={'please input todolistID'}/> <br/>
            <button onClick={getTasks}>Get tasks from todolist</button>
            : {todolistID}
            <br/>
            <div>{todolistTasks}</div>
            <br/>
            All todolists: <br/>
            <div>{allTodolistsMap}</div>
            <div>Count of todolists: {count}</div>
        </div>
    )
}

export const CreateTask = () => {
//All Todolists
    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                !res.length && setAllTodolists(['notning!'])
                res.length && setAllTodolists(res)
                setCount(res.length)
            })
    }, [])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> ID: {td.id}, title: {td.title}</div>)
//---------------------------------
    const [title, setTitle] = useState<string>('')

    const [todolistID, setTodolistID] = useState('')
    const [tasks, setTasks] = useState<any>('')
    const createTasks = () => {
        tasksApi.createTask(todolistID, title).then(res => {
            setTasks('Done!')
            setTodolistID('')
            setTitle('')
        })
    }
    return (
        <div>
            <input type="text" value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}
                   placeholder={'please input todolistID'}/> <br/>
            <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}
                   placeholder={'please input TITLE of task'}/> <br/>
            <button onClick={createTasks}>Get tasks from todolist</button>
            : {todolistID}
            <br/>
            <div>{tasks}</div>
            <br/>
            All todolists: <br/>
            <div>{allTodolistsMap}</div>
            <div>Count of todolists: {count}</div>
        </div>
    )
}

export const UpdateTaskTitle = () => {
//All todolists
    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists().then(res => {
            !res.length && setAllTodolists(['notning!'])
            res.length && setAllTodolists(res)
            setCount(res.length)
        })
    }, [])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> ID: {td.id}, title: {td.title}</div>)
    //Tasks
    const [todolistID, setTodolistID] = useState('')
    const [tasks, setTasks] = useState<Array<any>>([])
    const getTasks = () => {
        tasksApi.getTasks(todolistID).then(res => {
            setTasks(res.data.items)
        }).catch(res => {
            setTasks(res.message)
        })
    }
    const todolistTasks = tasks.map(t => <div>id: {t.id}, title: {t.title}</div>)
//-----------------------------------
    const [title, setTitle] = useState<string>('')
    const [taskID, setTaskID] = useState('')
    const [status, setStatus] = useState('')

    const changeTaskTitle = () => {
        tasksApi.updateTask(todolistID, taskID, {deadline: '', description: '', priority: TaskPriorities.Low, startDate: '', status: TaskStatuses.New, title: title}).then(res => {
            setTaskID('')
            setTitle('')
            setStatus('DONE!')
        })
    }
    return (
        <div>
            All todolists: <br/>
            <div>{allTodolistsMap}</div>
            <div>Count of todolists: {count}</div>
            <br/>
            <input type="text" value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}
                   placeholder={'please input todolistID'}/> <br/>
            <button onClick={getTasks}>Get tasks from todolist</button>
            : {todolistID}
            <br/>
            {tasks &&
                <div>{todolistTasks}</div>
            }

            <br/>

            <input type="text" value={taskID} onChange={e => setTaskID(e.currentTarget.value)}
                   placeholder={'please input taskID'}/> <br/>
            <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}
                   placeholder={'please input new title'}/> <br/>
            <button onClick={changeTaskTitle}>Change task title</button>
            <div>{status}</div>
            <br/>
            <br/>
        </div>
    )
}

export const DeleteTask = () => {
//All todolists
    const [allTodolists, setAllTodolists] = useState<Array<any>>([])
    const [count, setCount] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodolists().then(res => {
            !res.length && setAllTodolists(['notning!'])
            res.length && setAllTodolists(res)
            setCount(res.length)
        })
    }, [])

    const allTodolistsMap = allTodolists.map(td => <div key={td.id}> ID: {td.id}, title: {td.title}</div>)
    //Tasks
    const [todolistID, setTodolistID] = useState('')
    const [tasks, setTasks] = useState<Array<any>>([])
    const getTasks = () => {
        tasksApi.getTasks(todolistID).then(res => {
            setTasks(res.data.items)
        }).catch(res => {
            setTasks(res.message)
        })
    }
    const todolistTasks = tasks.map(t => <div>id: {t.id}, title: {t.title}</div>)
//-----------------------------------

    const [taskID, setTaskID] = useState('')
    const [status, setStatus] = useState('')

    const deleteTask = () => {
        tasksApi.deleteTask(todolistID, taskID).then(res => {
            debugger
            setTaskID('')
            setStatus('DONE!')
        })
    }

    return (
        <div>
            All todolists: <br/>
            <div>{allTodolistsMap}</div>
            <div>Count of todolists: {count}</div>
            <br/>
            <input type="text" value={todolistID} onChange={e => setTodolistID(e.currentTarget.value)}
                   placeholder={'please input todolistID'}/> <br/>
            <button onClick={getTasks}>Get tasks from todolist</button>
            : {todolistID}
            <br/>
            {tasks &&
            <div>{todolistTasks}</div>
            }

            <br/>

            <input type="text" value={taskID} onChange={e => setTaskID(e.currentTarget.value)}
                   placeholder={'please input taskID'}/> <br/>

            <button onClick={deleteTask}>Delete task</button>
            <div>{status}</div>
            <br/>
            <br/>

        </div>
    )
}
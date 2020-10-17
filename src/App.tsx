import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist'
import {v1} from "uuid"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const todolistID3 = v1()
    const todolistID4 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What I want to learn', filter: 'all'},
        {id: todolistID2, title: 'React', filter: 'all'},
        {id: todolistID3, title: 'JS', filter: 'all'},
        {id: todolistID4, title: 'Useful', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), isDone: true, title: 'HTML/CSS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'tasks from Ignat'},
            {id: v1(), isDone: true, title: 'Social Network'},
            {id: v1(), isDone: false, title: 'CodeWars'},
            {id: v1(), isDone: false, title: 'Native JS'},
            {id: v1(), isDone: false, title: 'React/TypeScript'}
        ],
        [todolistID2]: [
            {id: v1(), isDone: true, title: 'Путь самурая'},
            {id: v1(), isDone: false, title: 'Реакт- кабзда как просто'},
            {id: v1(), isDone: false, title: 'SocialNetwork'},
            {id: v1(), isDone: true, title: 'Tasks from Ignat'},
            {id: v1(), isDone: false, title: 'documentation'}
        ],
        [todolistID3]: [
            {id: v1(), isDone: true, title: 'Codewars.com'},
            {id: v1(), isDone: false, title: 'native JS'},
            {id: v1(), isDone: false, title: 'code.mu'},
            {id: v1(), isDone: true, title: 'lessons on Sundays'},
            {id: v1(), isDone: false, title: 'documentation'},
            {id: v1(), isDone: false, title: 'x3'}
        ],
        [todolistID4]: [
            {id: v1(), isDone: false, title: 'task from Ignat'},
            {id: v1(), isDone: false, title: 'code.mu'},
            {id: v1(), isDone: true, title: 'Codewars.com'}
        ]
    })
//-----------todolists---------
    const removeTodolist = (todolistId: string) => {
         let ourTodolists = todolists.filter(t => t.id !== todolistId)

        setTodolists(ourTodolists)

    }

//------------tasks------------
    const removeTask = (taskId: string, todolistId: string) => {
        let tasksForTodolist = tasks[todolistId]
        let newTasksArrWithoutTask = tasksForTodolist.filter((t) => t.id !== taskId)
        tasks[todolistId] = newTasksArrWithoutTask
        setTasks({...tasks})
    }

    const addNewTask = (inputValue: string, todolistId: string) => {
        let newTask = {id: v1(), isDone: false, title: inputValue}
        let ourTodolist = tasks[todolistId]
        let ourTodolistWithNewTask = [newTask, ...ourTodolist]
        tasks[todolistId] = ourTodolistWithNewTask
        setTasks({...tasks})
    }

//-----------checkBox------------
    const onCheckedBox = (id: string, value: boolean, todolistId: string) => {
        let ourTodolist = tasks[todolistId]
        let checkedTask = ourTodolist.find(t => t.id === id)
        if (checkedTask) {
            checkedTask.isDone = value
        }
        setTasks({...tasks})
    }

//----------filterValue-------

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let ourTodolist = todolists.find(t => t.id === todolistId)
        if (ourTodolist) {
            ourTodolist.filter = value
        }
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let newArrTasks = tasks[tl.id]
                    if (tl.filter === 'active') {
                        newArrTasks = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        newArrTasks = tasks[tl.id].filter(t => t.isDone)
                    }
                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            newArrTasks={newArrTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addNewTask={addNewTask}
                            removeTodolist={removeTodolist}
                            onCheckedBox={onCheckedBox}
                        />
                    )
                })
            }
        </div>
    )
}

export default App;


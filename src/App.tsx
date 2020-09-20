import React from 'react'
import './App.css'
import { Todolist } from './components/Todolist';


export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


function App() {
    const task1: Array<TasksType> = [
        {id: 1, isDone: true, title: 'Html'},
        {id: 2, isDone: false, title: 'CSS'},
        {id: 3, isDone: true, title: 'JS'},
        {id: 4, isDone: true, title: 'tasks from Ignat'},
        {id: 5, isDone: true, title: 'Social Network'},
        {id: 6, isDone: false, title: 'CodeWars'}
    ]
    const task2: Array<TasksType> = [
        {id: 1, isDone: true, title: 'Путь самурая'},
        {id: 2, isDone: false, title: 'Реакт- кабзда как просто'},
        {id: 3, isDone: false, title: 'SocialNetwork'},
        {id: 4, isDone: true, title: 'Tasks from Ignat'},
        {id: 5, isDone: false, title: 'documentation'},
        {id: 6, isDone: false, title: 'x3'}
    ]
    const task3: Array<TasksType> = [
        {id: 1, isDone: true, title: 'Codewars.com'},
        {id: 2, isDone: false, title: 'native JS'},
        {id: 3, isDone: false, title: 'code.mu'},
        {id: 4, isDone: true, title: 'lessons on Sundays'},
        {id: 5, isDone: false, title: 'documentation'},
        {id: 6, isDone: false, title: 'x3'}
    ]
    return (
        <div className="App">
            <Todolist title='What to learn' tasks = {task1}/>
            <Todolist title='React' tasks = {task2}/>
            <Todolist title='JS' tasks = {task3}/>
        </div>
    );
}

export default App;


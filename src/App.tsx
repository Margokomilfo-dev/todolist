import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist';


//----------types

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

//----------const

const tasks1 = [
    {id: 1, isDone: true, title: 'HTML/CSS'},
    {id: 2, isDone: false, title: 'React'},
    {id: 3, isDone: true, title: 'JS'},
    {id: 4, isDone: true, title: 'tasks from Ignat'},
    {id: 5, isDone: true, title: 'Social Network'},
    {id: 6, isDone: false, title: 'CodeWars'},
    {id: 7, isDone: false, title: 'Native JS'},
    {id: 8, isDone: false, title: 'React/TypeScript'},

]


function App() {

    //-----------------tasks

    let [tasks, setTask] = useState<Array<TasksType>>(tasks1)
    const removeTask = (id: number) => {setTask(tasks.filter(t => t.id !== id))}

    //-----------------filterValue

    let [filterValue, setFilterValue] = useState<FilterValuesType>('all')

    let newArrTasks = tasks
    if (filterValue === 'active') { newArrTasks = tasks.filter(t => !t.isDone)}
    if (filterValue === 'completed') { newArrTasks = tasks.filter(t => t.isDone)}
    const changeFilter = (value: FilterValuesType) => {setFilterValue(value)}


    return (
        <div className="App">
            <Todolist title='What to learn'
                      newArrTasks={newArrTasks} removeTask={removeTask} changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;


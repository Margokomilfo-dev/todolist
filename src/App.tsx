import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist'
import {v1} from "uuid"

//----------types
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

//----------const
const tasks1 = [
    {id: v1(), isDone: true, title: 'HTML/CSS'},
    {id: v1(), isDone: false, title: 'React'},
    {id: v1(), isDone: true, title: 'JS'},
    {id: v1(), isDone: true, title: 'tasks from Ignat'},
    {id: v1(), isDone: true, title: 'Social Network'},
    {id: v1(), isDone: false, title: 'CodeWars'},
    {id: v1(), isDone: false, title: 'Native JS'},
    {id: v1(), isDone: false, title: 'React/TypeScript'}
]

function App() {

//------------data----------
    let [tasks, setTasks] = useState<Array<TasksType>>(tasks1)
    let [filterValue, setFilterValue] = useState<FilterValuesType>('all')
    console.log(filterValue)

//------------tasks------------
    const removeTask = (id: string) => {setTasks(tasks.filter(t => t.id !== id))}

    const addNewTask = (inputValue: string) => {
        let newTask = {id: v1(), isDone: false, title: inputValue }
        let newTasksArr = [ newTask, ...tasks]
        setTasks(newTasksArr)
    }

//-----------checkBox------------
    const onCheckedBox = (id: string, value: boolean) => {
        let checkedTask = tasks.find(t => t.id === id)
         if (checkedTask){
             checkedTask.isDone = value
         }
        setTasks([...tasks])


    }
//     const onChecked = (id: string) => {
//          let newArr = tasks.map(t => {
//              if (t.id === id && t.isDone){
//                  return {...t, isDone: false}
//              } else if (t.id === id && !t.isDone){
//                  return {...t, isDone: true}
//              }
//              return {...t}
//          })
//         setTasks(newArr)
//     }

//----------filterValue-------
    let newArrTasks = tasks
    if (filterValue === 'active') { newArrTasks = tasks.filter(t => !t.isDone)}
    if (filterValue === 'completed') { newArrTasks = tasks.filter(t => t.isDone)}
    const changeFilter = (value: FilterValuesType) => {setFilterValue(value)}

    return (
        <div className="App">
            <Todolist title='What to learn'
                      newArrTasks={newArrTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addNewTask={addNewTask}
                      //onChecked={onChecked}
                      onCheckedBox={onCheckedBox}
                      filterValue={filterValue}
            />
        </div>
    );
}

export default App;


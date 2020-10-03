import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksType, FilterValuesType} from "../App";
import s from './Todolist.module.css'


type TodolistPropsType = {
    title: string
    newArrTasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (inputValue: string) => void
    onChecked: (id: string) => void
}

export function Todolist(props: TodolistPropsType) {
    //data
    let [inputValue, setInputValue] = useState<string>('')

    //-----------add task------------
    let addTask = (inputValue: string) => {
        inputValue && props.addNewTask(inputValue)
        setInputValue('')
    }
    //-------------input-------------
    let onInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setInputValue(e.currentTarget.value)
    }
    let addInputText = (e: KeyboardEvent<HTMLInputElement>) => {
       if (inputValue && e.key === 'Enter') {
           props.addNewTask(inputValue)
           setInputValue('')
       }
    }

    //-----------filter------------
    let onFilterAll = () => {props.changeFilter('all')}
    let onFilterActive = () => {props.changeFilter('active')}
    let onFilterCompleted = () => {props.changeFilter('completed')}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange={onInputChange} onKeyPress={addInputText}/>
                <button onClick={() => {addTask(inputValue)}}>+</button>
            </div>
            <div className={s.tasks}>
                {
                    props.newArrTasks.map( t =>
                        <div key={t.id} className={s.task}>
                            <div className={s.taskCheckbox}><input type="checkbox" checked={t.isDone} onClick={() => {props.onChecked(t.id)}} /></div>
                            <div className={s.taskTitle}>{t.title}</div>
                            <div className={s.taskBtn}> <button onClick={() => {props.removeTask(t.id)}}>X</button></div>
                        </div>)
                }
            </div>
            <div>
                <button onClick={onFilterAll}>All</button>
                <button onClick={onFilterActive}>Active</button>
                <button onClick={onFilterCompleted}>Completed</button>
            </div>

        </div>
    )
}



export default Todolist


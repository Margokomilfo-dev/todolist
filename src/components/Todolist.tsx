import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksType, FilterValuesType} from "../App";
import s from './Todolist.module.css'

type TodolistPropsType = {
    todolistId: string
    title: string
    newArrTasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addNewTask: (inputValue: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    onCheckedBox: (id: string, value: boolean, todolistId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

//data
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string | null>('')

//--------delete todolist---------
    let deleteTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
//-----------add task------------
    let addTask = (inputValue: string) => {
        if (inputValue.trim()) {
            props.addNewTask(inputValue, props.todolistId)
            setInputValue('')
        } else {
            setError('field is required')
        }
    }
    let addTasks = () => {
        addTask(inputValue)
    }

//-------------input-------------
    let onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputValue.trim() && setError(null)
        setInputValue(e.currentTarget.value)

    }
    let addInputText = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null)
        if (inputValue.trim() && e.key === 'Enter') {
            props.addNewTask(inputValue, props.todolistId)
            setInputValue('')
        }
    }

    let onClickCheckBox = (e: boolean, id: string) => {
        props.onCheckedBox(id, e, props.todolistId)
    }
//-----------filter------------
    let onFilterAll = () => {
        props.changeFilter('all', props.todolistId)
    }
    let onFilterActive = () => {
        props.changeFilter('active', props.todolistId)
    }
    let onFilterCompleted = () => {
        props.changeFilter('completed', props.todolistId)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodolist}>x</button>
            </h3>
            <div className={s.taskInput}>
                <input value={inputValue} onChange={onInputChange} onKeyPress={addInputText}
                       className={error ? s.arrayInputAddTasks : ''}/>
                <button onClick={addTasks}>+</button>
                {error ? <div className={s.error}> {error} </div> : null}


            </div>
            <div className={s.tasks}>
                {props.newArrTasks.map(t =>
                    <div key={t.id} className={`${s.task} + ${t.isDone ? s.taskCheckbox : ''}`}>
                        <div>
                            <input type="checkbox" checked={t.isDone} onClick={(e)=> {onClickCheckBox(e.currentTarget.checked, t.id)}}/>
                        </div>
                        <div className={s.taskTitle}>{t.title}</div>
                        <div className={s.taskBtn}>
                            <button onClick={() => {
                                props.removeTask(t.id, props.todolistId)
                            }}>X
                            </button>
                        </div>
                    </div>)}
            </div>
            <div className={s.filterButtons}>
                <button onClick={onFilterAll} className={props.filter === 'all' ? s.activeButton : ''}> All</button>
                <button onClick={onFilterActive} className={props.filter === 'active' ? s.activeButton : ''}>Active
                </button>
                <button onClick={onFilterCompleted}
                        className={props.filter === 'completed' ? s.activeButton : ''}>Completed
                </button>
            </div>

        </div>
    )
}
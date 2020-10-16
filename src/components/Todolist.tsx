import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksType, FilterValuesType} from "../App";
import s from './Todolist.module.css'

type TodolistPropsType = {
    title: string
    newArrTasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (inputValue: string) => void
    //onChecked: (id: string) => void
    onCheckedBox: (id: string, value: boolean) => void
    filterValue: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

//data
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string | null>('')

//-----------add task------------
    let addTask = (inputValue: string) => {
        if (inputValue.trim()) {
            props.addNewTask(inputValue)
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
            props.addNewTask(inputValue)
            setInputValue('')
        }
    }

//-----------filter------------
    let onFilterAll = () => {
        props.changeFilter('all')
    }
    let onFilterActive = () => {
        props.changeFilter('active')
    }
    let onFilterCompleted = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
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
                            <input type="checkbox" checked={t.isDone} onClick={(e) => {
                                //props.onChecked(t.id)
                                props.onCheckedBox(t.id, e.currentTarget.checked)
                            }}/>
                        </div>
                        <div className={s.taskTitle}>{t.title}</div>
                        <div className={s.taskBtn}>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>X
                            </button>
                        </div>
                    </div>)}
            </div>
            <div className={s.filterButtons}>
                <button onClick={onFilterAll} className={props.filterValue === 'all' ? s.activeButton : ''}> All</button>
                <button onClick={onFilterActive} className={props.filterValue === 'active' ? s.activeButton : ''}>Active</button>
                <button onClick={onFilterCompleted} className={props.filterValue === 'completed' ? s.activeButton : ''}>Completed</button>
            </div>

        </div>
    )
}

export default Todolist


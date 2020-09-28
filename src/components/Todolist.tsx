import React from "react";
import {TasksType, FilterValuesType} from "../App";
import s from './Todolist.module.css'


type TodolistPropsType = {
    title: string
    newArrTasks: Array<TasksType>
    removeTask: (id:number) => void
    changeFilter: (value:FilterValuesType) => void

}


export function Todolist(props: TodolistPropsType) {
    debugger
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div className={s.tasks}>
                {
                    props.newArrTasks.map( t =>
                        <div key={t.id} className={s.task}>
                            <div className={s.taskCheckbox}><input type="checkbox" checked={t.isDone} /></div>
                            <div className={s.taskTitle}>{t.title}</div>
                            <div className={s.taskBtn}> <button onClick={() => {props.removeTask(t.id)}}>X</button></div>
                        </div>)
                }
            </div>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>

        </div>
    )
}



export default Todolist


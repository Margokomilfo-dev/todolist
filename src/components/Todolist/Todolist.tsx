import React from "react"
import {FilterValuesType, TasksType} from "../../App"
import s from './Todolist.module.css'
import {ChangedSpanIntoInput} from "../ChangedSpanIntoInput"
import {TodolistHeader} from "../TodolistHeader"
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {Button} from "@material-ui/core"
import { AddForm } from "./AddForm"

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
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    changeTaskTitleText: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {

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
//------------title------------
    const onChangeTaskTitleText = (taskId: string, newTitle: string, todolistId: string) => {
        props.changeTaskTitleText(taskId, newTitle, props.todolistId)
    }
    //----add tasks---
    const addNewTask = (inputValue: string) => {
        props.addNewTask(inputValue, props.todolistId)
    }
    return (
        <div className={s.todolist}>
            <div>
                <TodolistHeader title={props.title} todolistId={props.todolistId} removeTodolist={props.removeTodolist}
                                changeTodolistTitle={props.changeTodolistTitle}/>
                <AddForm  addNewItem={addNewTask}/>

                <div className={s.tasks}>
                    {props.newArrTasks.map(t =>
                        <div key={t.id} className={`${s.task} + ${t.isDone ? s.taskCheckbox : ''}`}>
                            <div>
                                <input type="checkbox" checked={t.isDone} onClick={(e) => {
                                    onClickCheckBox(e.currentTarget.checked, t.id)
                                }}/>
                            </div>
                            <div className={s.taskTitle}>
                                <ChangedSpanIntoInput title={t.title} changeItemText={(newTitle) => {
                                    onChangeTaskTitleText(t.id, newTitle, props.todolistId)
                                }}/>
                            </div>
                            <div className={s.taskBtn}>
                                {/*<button onClick={() => { props.removeTask(t.id, props.todolistId)}}>X</button>*/}

                                <IconButton aria-label="delete" onClick={() => {props.removeTask(t.id, props.todolistId) }}>
                                    <DeleteIcon />
                                </IconButton>

                            </div>
                        </div>)}
                </div>
            </div>

            <div className={s.filterButtons}>
                <Button onClick={onFilterAll}
                        variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}> All</Button>
                <Button onClick={onFilterActive}
                        variant ={props.filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Active</Button>
                <Button onClick={onFilterCompleted}
                        variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Completed</Button>
            </div>
        </div>
    )
}

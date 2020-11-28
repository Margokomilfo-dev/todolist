import React, {useCallback} from "react"
import {FilterValuesType, TaskType} from "../App"
import s from './Todolist.module.css'
import {TodolistHeader} from "./TodolistHeader"
import {Button} from "@material-ui/core"
import {AddForm} from "./AddForm"
import {useDispatch} from "react-redux"
import {actions} from "../store/tasksReducer/tasksReducer"
import {changeTodolistFilterValueAC} from "../store/todolistsReducer/todolistsReducer"
import {Task} from "./Task"

type TodolistPropsType = {
    todolistId: string
    title: string
    newArrTasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolistId, changeTodolistTitle, title, filter, newArrTasks, removeTodolist}) => {
    let dispatch = useDispatch()

    let allTasks = newArrTasks
    if (filter === 'active') {
        allTasks = newArrTasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        allTasks = newArrTasks.filter(t => t.isDone)
    }
//-----------filter------------
    let onFilterAll = useCallback(() => {
        dispatch(changeTodolistFilterValueAC(todolistId, 'all'))
    }, [dispatch, todolistId])
    let onFilterActive = useCallback(() => {
        dispatch(changeTodolistFilterValueAC(todolistId, 'active'))
    }, [dispatch, todolistId])
    let onFilterCompleted = useCallback(() => {
        dispatch(changeTodolistFilterValueAC(todolistId, 'completed'))
    }, [dispatch, todolistId])
//------------title------------

    //----add tasks---
    const addNewTask = useCallback((inputValue: string) => {
        dispatch(actions.addNewTaskAC(todolistId, inputValue))
    }, [dispatch, todolistId])

    return (
        <div className={s.todolist}>
            <div>
                <TodolistHeader title={title} todolistId={todolistId} removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}/>
                <AddForm  addNewItem={addNewTask}/>

                <div className={s.tasks}>
                    {allTasks.map(t => <Task key={t.id} task={t} todolistId={todolistId}/>)}
                </div>
            </div>

            <div className={s.filterButtons}>
                <Button onClick={onFilterAll}
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}> All</Button>
                <Button onClick={onFilterActive}
                        variant ={filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Active</Button>
                <Button onClick={onFilterCompleted}
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Completed</Button>
            </div>
        </div>
    )
})


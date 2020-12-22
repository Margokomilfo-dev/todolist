import React, {useCallback, useEffect} from 'react'
import s from './Todolist.module.css'
import {TodolistHeader} from "../../../components/TodolistHeader/TodolistHeader"
import {Button} from "@material-ui/core"
import {AddForm} from "../../../components/AddForm/AddForm"
import {useDispatch} from "react-redux"
import {actions, setTasksTC, addTaskTC} from '../tasksReducer'
import {changeTodolistFilterValueAC, FilterValuesType} from "../todolistsReducer"
import {Task} from "../../../components/Task/Task"
import {TaskStatuses, TaskType} from "../../../api/api"


export type TodolistPropsType = {
    removeTask?: any
    changeFilter?: any
    addNewTask?: any
    onCheckedBox?: any
    changeTaskTitleText?: any

    todolistId: string
    title: string
    newArrTasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolistId, changeTodolistTitle, title, filter, newArrTasks, removeTodolist}) => {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTasksTC(todolistId))
    },[])

    let allTasks = newArrTasks
    if (filter === 'active') {
        allTasks = newArrTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        allTasks = newArrTasks.filter(t => t.status === TaskStatuses.Completed)
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
        dispatch(addTaskTC(todolistId, inputValue))
    }, [dispatch, todolistId])

    return (
        <div className={s.todolist}>
            <div>
                <TodolistHeader title={title} todolistId={todolistId} removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}/>
                <AddForm addNewItem={addNewTask}/>

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
                        variant={filter === 'active' ? 'outlined' : 'contained'}
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


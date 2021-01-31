import React, {useCallback, useEffect} from 'react'
import s from './Todolist.module.css'
import {TodolistHeader} from "../../../components/TodolistHeader/TodolistHeader"
import {Button} from "@material-ui/core"
import {AddForm} from "../../../components/AddForm/AddForm"
import {useDispatch} from "react-redux"
import { setTasksTC, addTaskTC} from '../tasksReducer'
import {changeTodolistFilterValueAC, FilterValuesType, TodolistDomainType} from '../todolistsReducer'
import {Task} from "../../../components/Task/Task"
import {TaskStatuses, TaskType} from "../../../api/api"


export type TodolistPropsType = {
    removeTask?: any
    changeFilter?: any
    addNewTask?: any
    onCheckedBox?: any
    changeTaskTitleText?: any

    todolist: TodolistDomainType
    newArrTasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    demo?: boolean
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({ changeTodolistTitle, todolist,
                                                                     newArrTasks, removeTodolist, demo = false,
                                                                     ...props}) => {

    let dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTasksTC(todolist.id))
    },[])

    let allTasks = newArrTasks
    if (todolist.filter === 'active') {
        allTasks = newArrTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        allTasks = newArrTasks.filter(t => t.status === TaskStatuses.Completed)
    }
//-----------filter------------
    let onFilterAll = useCallback(() => {
        dispatch(changeTodolistFilterValueAC({id: todolist.id, newFilterValue: 'all'}))
    }, [dispatch, todolist.id])
    let onFilterActive = useCallback(() => {
        dispatch(changeTodolistFilterValueAC({id: todolist.id,  newFilterValue: 'active'}))
    }, [dispatch, todolist.id])
    let onFilterCompleted = useCallback(() => {
        dispatch(changeTodolistFilterValueAC({id: todolist.id,  newFilterValue: 'completed'}))
    }, [dispatch, todolist.id])
//------------title------------

    //----add tasks---
    const addNewTask = useCallback((inputValue: string) => {
        dispatch(addTaskTC(todolist.id, inputValue))
    }, [dispatch, todolist.id])

    return (
        <div className={s.todolist}>
            <div>
                <TodolistHeader removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle} todolist={todolist}/>
                <AddForm addNewItem={addNewTask} disabled={todolist.entityStatus === 'loading'} />

                <div className={s.tasks}>
                    {allTasks.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)}
                </div>
            </div>

            <div className={s.filterButtons}>
                <Button onClick={onFilterAll}
                        variant={todolist.filter === 'all' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}> All</Button>
                <Button onClick={onFilterActive}
                        variant={todolist.filter === 'active' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Active</Button>
                <Button onClick={onFilterCompleted}
                        variant={todolist.filter === 'completed' ? 'outlined' : 'contained'}
                        size={'small'}
                        style={{margin: '2px', width: '78px', fontSize: '11px'}}>Completed</Button>
            </div>
        </div>
    )
})


import React, {useCallback} from "react"
import {FilterValuesType, TaskType} from "../App"
import s from './Todolist.module.css'
import {TodolistHeader} from "./TodolistHeader"
import {Button} from "@material-ui/core"
import {AddForm} from "./AddForm"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {TodolistType} from "../AppWithRedux";
import {actions} from "../store/tasksReducer/tasksReducer";
import {changeTodolistFilterValueAC} from "../store/todolistsReducer/todolistsReducer";
import {Task} from "./Task";

type TodolistPropsType = {
    todolistId: string
    title: string
    newArrTasks: Array<TaskType>
    removeTask?: (id: string, todolistId: string) => void
    changeFilter?: (value: FilterValuesType, todolistId: string) => void
    addNewTask?: (inputValue: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    onCheckedBox?: (id: string, value: boolean, todolistId: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    changeTaskTitleText?: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    //let todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists[props.todolistId])
    let dispatch = useDispatch()

    let allTasks = props.newArrTasks
    if (props.filter === 'active') {
        allTasks = props.newArrTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        allTasks = props.newArrTasks.filter(t => t.isDone)
    }
//-----------filter------------
    let onFilterAll = useCallback(() => {
        //props.changeFilter('all', props.todolistId)
        dispatch(changeTodolistFilterValueAC(props.todolistId, 'all'))
    }, [dispatch, props.todolistId])
    let onFilterActive = useCallback(() => {
        //props.changeFilter('active', props.todolistId)
        dispatch(changeTodolistFilterValueAC(props.todolistId, 'active'))
    }, [dispatch, props.todolistId])
    let onFilterCompleted = useCallback(() => {
        //props.changeFilter('completed', props.todolistId)
        dispatch(changeTodolistFilterValueAC(props.todolistId, 'completed'))
    }, [dispatch, props.todolistId])
//------------title------------

    //----add tasks---
    const addNewTask = useCallback((inputValue: string) => {
        dispatch(actions.addNewTaskAC(props.todolistId, inputValue))
    }, [dispatch, props.todolistId])

    return (
        <div className={s.todolist}>
            <div>
                <TodolistHeader title={props.title} todolistId={props.todolistId} removeTodolist={props.removeTodolist}
                                changeTodolistTitle={props.changeTodolistTitle}/>
                <AddForm  addNewItem={addNewTask}/>

                <div className={s.tasks}>
                    {allTasks.map(t => <Task key={t.id} task={t} todolistId={props.todolistId}/>)}
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
})


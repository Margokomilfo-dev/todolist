import React, {useState, useReducer} from 'react'
import './App.css'
import {Todolist} from './components/Todolist'
import {v1} from "uuid"
import {AddForm} from "./components/AddForm"
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from "@material-ui/icons"
import {
    addTodolistAC,
    todolistReducer,
    changeTodolistTitleAC,
    removeTodolistAC,
    changeTodolistFilterValueAC
} from "./store/todolistsReducer/todolistsReducer"
import {actions, tasksReducer} from './store/tasksReducer/tasksReducer'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithUseReducer() {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const todolistID3 = v1()
    const todolistID4 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What I want to learn', filter: 'all'},
        {id: todolistID2, title: 'React', filter: 'all'},
        {id: todolistID3, title: 'JS', filter: 'all'},
        {id: todolistID4, title: 'Useful', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), isDone: true, title: 'HTML/CSS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'tasks from Ignat'},
            {id: v1(), isDone: true, title: 'Social Network'},
            {id: v1(), isDone: false, title: 'CodeWars'},
            {id: v1(), isDone: false, title: 'Native JS'},
            {id: v1(), isDone: false, title: 'React/TypeScript'}
        ],
        [todolistID2]: [
            {id: v1(), isDone: true, title: 'Путь самурая'},
            {id: v1(), isDone: false, title: 'Реакт- кабзда как просто'},
            {id: v1(), isDone: false, title: 'SocialNetwork'},
            {id: v1(), isDone: true, title: 'Tasks from Ignat'},
            {id: v1(), isDone: false, title: 'documentation'}
        ],
        [todolistID3]: [
            {id: v1(), isDone: true, title: 'Codewars.com'},
            {id: v1(), isDone: false, title: 'native JS'},
            {id: v1(), isDone: false, title: 'code.mu'},
            {id: v1(), isDone: true, title: 'lessons on Sundays'},
            {id: v1(), isDone: false, title: 'documentation'},
            {id: v1(), isDone: false, title: 'x3'}
        ],
        [todolistID4]: [
            {id: v1(), isDone: false, title: 'task from Ignat'},
            {id: v1(), isDone: false, title: 'code.mu'},
            {id: v1(), isDone: true, title: 'Codewars.com'}
        ]
    })

//-----------todolists---------

    const addNewTodolist = (inputValue: string) => {
        let action = addTodolistAC(inputValue)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolist(changeTodolistTitleAC(title, todolistId))
    }

    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolist(action)
    }

//------------tasks------------
    const removeTask = (taskId: string, todolistId: string) => {
        dispatchToTasks(actions.removeTaskAC(todolistId,taskId))
    }

    const addNewTask = (inputValue: string, todolistId: string) => {
        dispatchToTasks(actions.addNewTaskAC(todolistId, inputValue))
    }
    const changeTaskTitleText = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(actions.changeTaskTitleTextAC(todolistId, taskId, newTitle))
    }
//-----------checkBox------------
    const onCheckedBox = (id: string, value: boolean, todolistId: string) => {
        dispatchToTasks(actions.changeCheckedStatusAC(todolistId, id, value))
    }

//----------filterValue-------

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchToTodolist(changeTodolistFilterValueAC(todolistId, value))
    }

    return (

        <div className='app'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6"> </Typography>
                    <Button color="inherit"> </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding: "10px"}}>
                    <div className="addTodolist">
                        <div className='addTodolistTitle'>Add new TodoList:</div>
                        <AddForm addNewItem={(inputValue) => {
                            addNewTodolist(inputValue)
                        }}/>
                    </div>
                </Grid>

                <Grid container>
                    <div className="allTodolists">
                        {
                            todolists.map(tl => {
                                let newArrTasks = tasks[tl.id]
                                if (tl.filter === 'active') {
                                    newArrTasks = tasks[tl.id].filter(t => !t.isDone)
                                }
                                if (tl.filter === 'completed') {
                                    newArrTasks = tasks[tl.id].filter(t => t.isDone)
                                }
                                return (
                                    <Grid item>
                                        <Paper elevation={5}>
                                            <Todolist
                                                key={tl.id}
                                                todolistId={tl.id}
                                                title={tl.title}
                                                filter={tl.filter}
                                                newArrTasks={newArrTasks}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                addNewTask={addNewTask}
                                                removeTodolist={removeTodolist}
                                                onCheckedBox={onCheckedBox}
                                                changeTodolistTitle={changeTodolistTitle}
                                                changeTaskTitleText={changeTaskTitleText}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </div>
                </Grid>
            </Container>

        </div>
    )
}

export default AppWithUseReducer;

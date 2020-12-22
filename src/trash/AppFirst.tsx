import React, {useState} from 'react'
import '../app/App.css'
import {Todolist} from '../features/TodolistsList/Todolist/Todolist'
import {v1} from "uuid";
import {AddForm} from "../components/AddForm/AddForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from '../api/api';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistsList/todolistsReducer';


export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppFirst() {

    const todolistID1 = v1()
    const todolistID2 = v1()
    const todolistID3 = v1()
    const todolistID4 = v1()

    let order = 21;
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What I want to learn', filter: 'all', addedDate: '', order: order},
        {id: todolistID2, title: 'React', filter: 'all', addedDate: '', order: order},
        {id: todolistID3, title: 'JS', filter: 'all', addedDate: '', order: order},
        {id: todolistID4, title: 'Useful', filter: 'all', addedDate: '', order: order},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML/CSS', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'React', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'tasks from Ignat', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'Social Network', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'CodeWars', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'Native JS', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 },
            {id: v1(), title: 'React/TypeScript', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 }
        ],
        [todolistID2]: [
            {id: v1(),title: 'Путь самурая', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID2 },
            {id: v1(), title: 'Реакт- кабзда как просто', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID2 },
            {id: v1(), title: 'SocialNetwork', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID2 },
            {id: v1(),title: 'Tasks from Ignat', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID2 },
            {id: v1(), title: 'documentation', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID2 }
        ],
        [todolistID3]: [
            {id: v1(),title: 'Codewars.com', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 },
            {id: v1(), title: 'native JS', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 },
            {id: v1(), title: 'code.mu', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 },
            {id: v1(),title: 'lessons on Sundays', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 },
            {id: v1(), title: 'documentation', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 },
            {id: v1(), title: 'x3', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID3 }
        ],
        [todolistID4]: [
            {id: v1(), title: 'task from Ignat', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID4 },
            {id: v1(), title: 'code.mu', status: TaskStatuses.Completed, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID4 },
            {id: v1(),title: 'Codewars.com', status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID4 }
        ]
    })

//-----------todolists---------

    const addNewTodolist = (inputValue: string) => {
        let newTodolist: TodolistDomainType = {id: v1(), title: inputValue, filter: 'all', addedDate: '', order: order}
        setTodolists([...todolists, newTodolist])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        let ourTodolist = todolists.find(t => t.id === todolistId)
        if (ourTodolist) {
            ourTodolist.title = title
        }
        setTasks({...tasks})
    }

    const removeTodolist = (todolistId: string) => {
        let ourTodolists = todolists.filter(t => t.id !== todolistId)
        setTodolists(ourTodolists)
    }

//------------tasks------------
    const removeTask = (taskId: string, todolistId: string) => {
        let tasksForTodolist = tasks[todolistId]
        let newTasksArrWithoutTask = tasksForTodolist.filter((t) => t.id !== taskId)
        tasks[todolistId] = newTasksArrWithoutTask
        setTasks({...tasks})
    }

    const addNewTask = (inputValue: string, todolistId: string) => {
        let newTask = {id: v1(), title: inputValue, status: TaskStatuses.New, addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId:todolistID1 }
        let ourTodolist = tasks[todolistId]
        let ourTodolistWithNewTask = [...ourTodolist, newTask]
        tasks[todolistId] = ourTodolistWithNewTask
        setTasks({...tasks})
    }
    const changeTaskTitleText = (taskId: string, newTitle: string, todolistId: string) => {
        let ourTodolist = tasks[todolistId]
        let ourTask = ourTodolist.find(t => t.id === taskId)
        if (ourTask) {
            ourTask.title = newTitle
        }
        setTasks({...tasks})
    }
//-----------checkBox------------
    const onCheckedBox = (id: string, status: TaskStatuses, todolistId: string) => {
        let ourTodolist = tasks[todolistId]
        let checkedTask = ourTodolist.find(t => t.id === id)
        if (checkedTask) {
            checkedTask.status = status
        }
        setTasks({...tasks})
    }

//----------filterValue-------

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let ourTodolist = todolists.find(t => t.id === todolistId)
        if (ourTodolist) {
            ourTodolist.filter = value
        }
        setTasks({...tasks})
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
                                    newArrTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                                }
                                if (tl.filter === 'completed') {
                                    newArrTasks = tasks[tl.id].filter(t =>  t.status === TaskStatuses.Completed)
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

export default AppFirst;


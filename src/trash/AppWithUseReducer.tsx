import React, {useReducer} from 'react'
import '../app/App.css'
import {Todolist} from '../features/TodolistsList/Todolist/Todolist'
import {v1} from "uuid"
import {AddForm} from "../components/AddForm/AddForm"
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from "@material-ui/icons"
import {
    addTodolistAC,
    todolistReducer,
    changeTodolistTitleAC,
    removeTodolistAC,
    changeTodolistFilterValueAC,
    FilterValuesType
} from "../features/TodolistsList/todolistsReducer"
import {actions, tasksReducer} from '../features/TodolistsList/tasksReducer'
import {TaskPriorities, TaskStatuses} from "../api/api";

function AppWithUseReducer() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todolists, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What I want to learn', filter: 'all', addedDate: '', order: 1},
        {id: todolistID2, title: 'React', filter: 'all', addedDate: '', order: 2},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    })

//-----------todolists---------

    const addNewTodolist = (inputValue: string) => {
        let action = addTodolistAC({id: 'todolist1', addedDate: '', order: 0, title: inputValue})
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
        dispatchToTasks(actions.removeTaskAC(todolistId, taskId))
    }

    const addNewTask = (inputValue: string, todolistId: string) => {
        dispatchToTasks(actions.addNewTaskAC({todoListId: todolistId,title: inputValue, status: TaskStatuses.New, addedDate: '' ,
            deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', id: 'exists'}))
    }
    const changeTaskTitleText = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(actions.changeTaskTitleTextAC(todolistId, taskId, newTitle))
    }
//-----------checkBox------------
    const onCheckedBox = (id: string, status: TaskStatuses, todolistId: string) => {
        dispatchToTasks(actions.changeCheckedStatusAC(todolistId, id, status))
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
                                    newArrTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                                }
                                if (tl.filter === 'completed') {
                                    newArrTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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


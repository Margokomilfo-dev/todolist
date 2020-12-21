import React, {useCallback, useEffect} from 'react'
import './App.css'
import {Todolist} from './components/Todolist/Todolist'
import {AddForm} from "./components/AddForm/AddForm"
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from "@material-ui/icons"
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    setTodolistsTC,
    deleteTodolistTC,
    addNewTodolistTC,
    changeTodolistTitleTC
} from './store/todolistsReducer/todolistsReducer'
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./store/store"
import { TasksType } from './store/tasksReducer/tasksReducer'

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])

    const addNewTodolist = useCallback((inputValue: string) => {
        dispatch(addNewTodolistTC(inputValue))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

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
                                return (
                                    <Grid item>
                                        <Paper elevation={5}>
                                            <Todolist
                                                key={tl.id}
                                                todolistId={tl.id}
                                                title={tl.title}
                                                filter={tl.filter}
                                                newArrTasks={newArrTasks}
                                                removeTodolist={removeTodolist}
                                                changeTodolistTitle={changeTodolistTitle}
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

export default AppWithRedux;


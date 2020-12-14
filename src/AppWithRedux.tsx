import React, {useCallback} from 'react'
import './App.css'
import {Todolist} from './components/Todolist/Todolist'
import {AddForm} from "./components/AddForm/AddForm"
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core'
import {Menu} from "@material-ui/icons"
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./store/todolistsReducer/todolistsReducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./store/store"

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


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    let dispatch = useDispatch()

    const addNewTodolist = useCallback((inputValue: string) => {
        let action = addTodolistAC(inputValue)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
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


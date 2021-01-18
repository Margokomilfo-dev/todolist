import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
    addNewTodolistTC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from './todolistsReducer'
import {TasksType} from './tasksReducer'
import {Grid, Paper} from '@material-ui/core'
import {AddForm} from '../../components/AddForm/AddForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    useEffect(() => {
        if (demo || !isLogin) {
            return
        }
        dispatch(setTodolistsTC())
    }, [])

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let dispatch = useDispatch()


    const addNewTodolist = useCallback((inputValue: string) => {
        dispatch(addNewTodolistTC(inputValue))
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    if (!isLogin) {
        return <Redirect to={'/login'}/>
    }
    return (

        <>
            <Grid container style={{padding: '10px'}}>
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
                                            todolist={tl}
                                            newArrTasks={newArrTasks}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                            demo={demo}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </div>
            </Grid>
        </>
    )
}
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

export const TodolistsList: React.FC = () => {
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
        </>
    )
}
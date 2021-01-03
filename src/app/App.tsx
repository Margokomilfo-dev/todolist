import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography, LinearProgress, Snackbar} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {StatusType} from './appReducer'
import CustomizedSnackbars from '../components/SnackBar/SnackBar'

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}) {
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
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
                {status === 'loading' && <LinearProgress color="secondary" />}

            </AppBar>
            <Container>
                <TodolistsList demo={demo}/>
            </Container>
            <div className='snackBar'>
                <CustomizedSnackbars/>
            </div>

        </div>
    )
}

export default App



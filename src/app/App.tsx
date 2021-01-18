import React from 'react'
import './App.css'
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress,
} from '@material-ui/core'
import {Menu, Reddit} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {StatusType} from './appReducer'
import CustomizedSnackbars from '../components/SnackBar/SnackBar'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Login} from '../features/Login/Login'

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
                {status === 'loading' && <LinearProgress color="secondary"/>}

            </AppBar>
            <Container>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>

            </Container>
            <div className='snackBar'>
                <CustomizedSnackbars/>
            </div>

        </div>
    )
}

export default App



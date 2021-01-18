import React, {useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
    LinearProgress, CircularProgress,
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, StatusType} from './appReducer'
import CustomizedSnackbars from '../components/SnackBar/SnackBar'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {loginOutTS} from '../features/Login/authReducer'

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}) {

    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logout = () => {
        dispatch(loginOutTS())
    }
    if (!isInitialized) {
        return <div
            style={{position: 'fixed',  textAlign: 'center', width: '100%'}}>
            loading... <br/>
            <CircularProgress/>
        </div>
    }

        return (
            <div className='app'>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            {isLogin && <Button color='inherit' onClick={logout}>Log out</Button>}
                        </Typography>
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



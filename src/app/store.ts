import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from "../features/TodolistsList/tasksReducer";
import {todolistReducer} from "../features/TodolistsList/todolistsReducer";
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './appReducer'
import { authReducer } from '../features/Login/authReducer';
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

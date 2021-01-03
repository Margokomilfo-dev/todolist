import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from "../features/TodolistsList/tasksReducer";
import {todolistReducer} from "../features/TodolistsList/todolistsReducer";
import thunk from 'redux-thunk'
import {appReducer} from './appReducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

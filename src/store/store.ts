import {combineReducers, createStore} from 'redux';
import {tasksReducer} from "./tasksReducer/tasksReducer";
import {todolistReducer} from "./todolistsReducer/todolistsReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

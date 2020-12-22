import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import { tasksReducer } from '../features/TodolistsList/tasksReducer'
import {todolistReducer} from "../features/TodolistsList/todolistsReducer";
import { AppRootStateType } from '../app/store'
import {TaskPriorities, TaskStatuses} from "../api/api";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: 'What I want to learn', filter: 'all',addedDate: '', order: 1},
        {id: "todolistId2", title: 'React', filter: 'all' , addedDate: '', order: 2},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.Completed, title: 'Social Network', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.New, title: 'CodeWars', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.New, title: 'Native JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'},
            {id: v1(), status: TaskStatuses.New, title: 'React/TypeScript', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1'}
        ],
        ["todolistId2"]: [
            {id: v1(), status: TaskStatuses.Completed, title: 'Путь самурая', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID2'},
            {id: v1(), status: TaskStatuses.New, title: 'Реакт- кабзда как просто', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID2'},
            {id: v1(), status: TaskStatuses.New, title: 'SocialNetwork', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID2'},
            {id: v1(), status: TaskStatuses.Completed, title: 'Tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID2'},
            {id: v1(), status: TaskStatuses.New, title: 'documentation', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID2'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (StoryFn: React.FC) => {
    return (
        <Provider store={storyBookStore}>
            <StoryFn/>
        </Provider>
    )
}
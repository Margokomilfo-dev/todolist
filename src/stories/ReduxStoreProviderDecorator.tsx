import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import { tasksReducer } from '../store/tasksReducer/tasksReducer'
import {todolistReducer} from "../store/todolistsReducer/todolistsReducer";
import { AppRootStateType } from '../store/store'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: 'What I want to learn', filter: 'all'},
        {id: "todolistId2", title: 'React', filter: 'all'},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), isDone: true, title: 'HTML/CSS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'tasks from Ignat'},
            {id: v1(), isDone: true, title: 'Social Network'},
            {id: v1(), isDone: false, title: 'CodeWars'},
            {id: v1(), isDone: false, title: 'Native JS'},
            {id: v1(), isDone: false, title: 'React/TypeScript'}
        ],
        ["todolistId2"]: [
            {id: v1(), isDone: true, title: 'Путь самурая'},
            {id: v1(), isDone: false, title: 'Реакт- кабзда как просто'},
            {id: v1(), isDone: false, title: 'SocialNetwork'},
            {id: v1(), isDone: true, title: 'Tasks from Ignat'},
            {id: v1(), isDone: false, title: 'documentation'}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (StoryFn: React.FC) => {
    return (
        <Provider store={storyBookStore}>
            <StoryFn/>
        </Provider>
    )
}
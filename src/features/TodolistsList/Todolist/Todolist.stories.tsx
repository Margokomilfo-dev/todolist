import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0'
import {Todolist, TodolistPropsType} from "./Todolist";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../../api/api";


export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    argTypes: {

    },
    decorators: [ReduxStoreProviderDecorator],
} as Meta


const Template: Story<TodolistPropsType> = (args) => <Todolist {...args}/>

export const TodolistBasicExample = Template.bind({});
TodolistBasicExample.args = {
    todolistId: 'todolistId1',
    title: 'Totolist',
    newArrTasks: [
        {id: v1(), status: TaskStatuses.Completed, title: 'Codewars.com', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' },
        {id: v1(), status: TaskStatuses.New, title: 'native JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' },
        {id: v1(), status: TaskStatuses.New, title: 'code.mu', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' },
        {id: v1(), status: TaskStatuses.Completed, title: 'lessons on Sundays', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' },
        {id: v1(), status: TaskStatuses.New, title: 'documentation', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' },
        {id: v1(), status: TaskStatuses.New, title: 'x3', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: 'todolistID1' }
    ],
    removeTodolist: action('remove todolist'),
    filter: 'all',
    changeTodolistTitle: action('change todolist title'),
}
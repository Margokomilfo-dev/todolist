import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import {Todolist, TodolistPropsType} from "./Todolist";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";


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
        {id: v1(), isDone: true, title: 'Codewars.com'},
        {id: v1(), isDone: false, title: 'native JS'},
        {id: v1(), isDone: false, title: 'code.mu'},
        {id: v1(), isDone: true, title: 'lessons on Sundays'},
        {id: v1(), isDone: false, title: 'documentation'},
        {id: v1(), isDone: false, title: 'x3'}
    ],
    removeTodolist: action('remove todolist'),
    filter: 'all',
    changeTodolistTitle: action('change todolist title'),
}
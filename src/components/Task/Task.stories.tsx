import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";



export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

export const TaskBasicIsDoneExample = Template.bind({});
TaskBasicIsDoneExample.args = {
    task: {id: '1', isDone: false, title: 'first task'},
    todolistId: 'todolistId1',
}

export const TaskBasicIsNotDoneExample = Template.bind({});
TaskBasicIsNotDoneExample.args = {
    task: {id: '2', isDone: true, title: 'second task'},
    todolistId: 'todolistId2',
}
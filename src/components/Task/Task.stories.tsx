import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Task, TaskPropsType} from './Task'
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator'
import {TaskPriorities, TaskStatuses} from '../../api/api'


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

export const TaskBasicIsDoneExample = Template.bind({})
TaskBasicIsDoneExample.args = {
    task: {
        id: '1', status: TaskStatuses.New, title: 'first task', todoListId: 'todolistId1', startDate: '',
        priority: TaskPriorities.Low, order: 1, description: 'nothing', deadline: '', addedDate: ''
    },
    todolistId: 'todolistId1',
}

export const TaskBasicIsNotDoneExample = Template.bind({})
TaskBasicIsNotDoneExample.args = {
    task: {
        id: '2', status: TaskStatuses.Completed, title: 'second task', todoListId: 'todolistId1', startDate: '',
        priority: TaskPriorities.Low, order: 1, description: 'nothing', deadline: '', addedDate: ''
    },
    todolistId: 'todolistId2',
}
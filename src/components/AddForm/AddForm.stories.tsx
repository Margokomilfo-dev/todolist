import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {AddForm, AddFormPropsType} from './AddForm'
import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from '../../stories/ReduxStoreProviderDecorator'


export default {
    title: 'Todolist/AddForm',
    component: AddForm,
    argTypes: {
        onClick: {
            description: 'Add item after click button'
        }
    },
    decorators: [ReduxStoreProviderDecorator],
} as Meta


const Template: Story<AddFormPropsType> = (args) => <AddForm {...args}/>

export const AddFormBasicExample = Template.bind({})
AddFormBasicExample.args = {
    addNewItem: action('Button is clicked'),
    disabled: true
}
import React from 'react'
import {Story, Meta} from '@storybook/react/types-6-0'
import {action} from '@storybook/addon-actions'
import {ChangedSpanIntoInput, ChangedSpanIntoInputPropsType} from './ChangedSpanIntoInput'


export default {
    title: 'Todolist/ChangedSpanIntoInput',
    component: ChangedSpanIntoInput,
    argTypes: {
        title: {
            description: 'value span',
            defaultValue: 'default value',
            name: 'value'
        }
    }
} as Meta


const Template: Story<ChangedSpanIntoInputPropsType> = (args) => <ChangedSpanIntoInput {...args}/>

export const ChangedSpanIntoInputBasicExample = Template.bind({})
ChangedSpanIntoInputBasicExample.args = {
    changeItemText: action('change value')
}
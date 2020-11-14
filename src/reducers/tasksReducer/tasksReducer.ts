import {TasksType} from "../../App";
type actionType = {
    type: string
    [key: string]: any
}
const ADD_TASK = 'ADD_TASK'

export const tasksReducer = (state: Array<TasksType>, action: actionType) => {
    switch (action.type) {
        case ADD_TASK:
            return [...state]
        default:
            return state
    }
}
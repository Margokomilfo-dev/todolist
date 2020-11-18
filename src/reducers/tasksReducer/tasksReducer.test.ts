import {v1} from "uuid";
import {actions, tasksReducer} from "./tasksReducer";
import {TasksType} from "../../App";
import {addTodolistAC, removeTodolistAC} from "../todolistsReducer/todolistsReducer";

let state: TasksType
let state2: TasksType
let todolistID1: string
let todolistID2: string

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    state = {
        [todolistID1]: [
            {id: v1(), isDone: true, title: 'HTML/CSS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: true, title: 'tasks from Ignat'},
        ],
        [todolistID2]: [
            {id: v1(), isDone: true, title: 'Task1'},
            {id: v1(), isDone: false, title: 'Task2'},
        ]
    }
    state2 = {
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
            {id: '4', isDone: true, title: 'JS'},
            {id: '5', isDone: true, title: 'tasks from Ignat'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'Task1'},
            {id: '2', isDone: false, title: 'Task2'},
            {id: '3', isDone: false, title: 'hello'},
        ]
    }
})

test('Add new task', () => {

    const endState: TasksType = tasksReducer(state, actions.addNewTask(todolistID2, 'hello'))
    expect(endState[todolistID2].length).toBe(3)
})

test('Remove task', () => {
    const endState: TasksType = tasksReducer(state2, actions.removeTask(todolistID2, '3'))
    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
            {id: '4', isDone: true, title: 'JS'},
            {id: '5', isDone: true, title: 'tasks from Ignat'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'Task1'},
            {id: '2', isDone: false, title: 'Task2'},
        ]
    })
})

test('Change a title of task', () => {

    const endState: TasksType = tasksReducer(state2, actions.changeTaskTitleText(todolistID2, '1', 'newTask'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
            {id: '4', isDone: true, title: 'JS'},
            {id: '5', isDone: true, title: 'tasks from Ignat'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'newTask'},
            {id: '2', isDone: false, title: 'Task2'},
            {id: '3', isDone: false, title: 'hello'},
        ]
    })
})

test('Change a status of task', () => {

    const endState: TasksType = tasksReducer(state2, actions.changeCheckedStatus(todolistID2, '1', false))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
            {id: '4', isDone: true, title: 'JS'},
            {id: '5', isDone: true, title: 'tasks from Ignat'},
        ],
        [todolistID2]: [
            {id: '1', isDone: false, title: 'Task1'},
            {id: '2', isDone: false, title: 'Task2'},
            {id: '3', isDone: false, title: 'hello'},
        ]
    })
})


test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(state2, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistID2);
    const endState = tasksReducer(state, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistID2"]).not.toBeDefined();
});

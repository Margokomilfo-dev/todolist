import {v1} from "uuid";
import {actions, tasksReducer} from "./tasksReducer";
import {TasksType} from "../../App";
import {addTodolistAC, removeTodolistAC} from "../todolistsReducer/todolistsReducer";

let state: TasksType
const todolistID1: string = v1()
const todolistID2: string = v1()

beforeEach(() => {
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
})

test('Add new task', () => {

    const endState: TasksType = tasksReducer(state, actions.addNewTask(todolistID2, 'hello'))
    expect(endState[todolistID2].length).toBe(3)
})

test('Remove task', () => {
    const state2 = {
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
    const state2 = {
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'Task1'}
        ]
    }

    const endState: TasksType = tasksReducer(state2, actions.changeTaskTitleText(todolistID2, '1', 'newTask'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'newTask'}
        ]
    })
})

test('Change a status of task', () => {
    const state2 = {
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
        ],
        [todolistID2]: [
            {id: '1', isDone: true, title: 'Task1'},
            {id: '2', isDone: true, title: 'Task2'}
        ]
    }

    const endState: TasksType = tasksReducer(state2, actions.changeCheckedStatus(todolistID2, '1', false))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', isDone: true, title: 'HTML/CSS'},
            {id: '2', isDone: false, title: 'React'},
            {id: '3', isDone: false, title: 'hello'},
        ],
        [todolistID2]: [
            {id: '1', isDone: false, title: 'Task1'},
            {id: '2', isDone: true, title: 'Task2'}
        ]
    })
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

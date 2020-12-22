import {v1} from 'uuid'
import {actions, tasksReducer, TasksType} from './tasksReducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolistsReducer'
import {TaskPriorities, TaskStatuses} from '../../api/api'

let state: TasksType
let state2: TasksType
let todolistID1: string
let todolistID2: string

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    state = {
        [todolistID1]: [
            {id: v1(), status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: v1(), status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: v1(), status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: v1(), status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
        ],
        [todolistID2]: [
            {id: v1(), status: TaskStatuses.Completed, title: 'Task1', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: v1(), status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        ]
    }
    state2 = {
        [todolistID1]: [
            {id: '1', status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '2', status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '4', status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '5', status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
        ],
        [todolistID2]: [
            {id: '1', status: TaskStatuses.Completed, title: 'Task1', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        ]
    }
})

test('Add new task', () => {

    const endState: TasksType = tasksReducer(state, actions.addNewTaskAC({todoListId: todolistID2,title: 'hello', status: TaskStatuses.New, addedDate: '' ,
    deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', id: 'exists'}))

    expect(endState[todolistID2].length).toBe(3)
})

test('Remove task', () => {
    const endState: TasksType = tasksReducer(state2, actions.removeTaskAC(todolistID2, '3'))
    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '2', status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '4', status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '5', status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
        ],
        [todolistID2]: [
            {id: '1', status: TaskStatuses.Completed, title: 'Task1', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        ]
    })
})

test('Change a title of task', () => {

    const endState: TasksType = tasksReducer(state2, actions.changeTaskTitleTextAC(todolistID2, '1', 'newTask'))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '2', status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '4', status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '5', status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
        ],
        [todolistID2]: [
            {id: '1', status: TaskStatuses.Completed, title: 'newTask', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        ]
    })
})

test('Change a status of task', () => {

    const endState: TasksType = tasksReducer(state2, actions.changeCheckedStatusAC(todolistID2, '1', TaskStatuses.New))

    expect(endState).toEqual({
        [todolistID1]: [
            {id: '1', status: TaskStatuses.Completed, title: 'HTML/CSS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '2', status: TaskStatuses.New, title: 'React', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '4', status: TaskStatuses.Completed, title: 'JS', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
            {id: '5', status: TaskStatuses.Completed, title: 'tasks from Ignat', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID1},
        ],
        [todolistID2]: [
            {id: '1', status: TaskStatuses.New, title: 'Task1', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
            {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        ]
    })
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({title: 'new todolist', id: 'todolistid3', order: 0, addedDate: ''});

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

test('empty arrays should be added when we set todolists', () => {
    const endState: TasksType = tasksReducer({}, setTodolistsAC([
        {id: '1', title: 'todo1', order: 0, addedDate: ''},
        {id: '2', title: 'todo2', order: 0, addedDate: ''}
    ]))
    //const keys = Object.keys(endState)

    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
    //expect(keys.length).toBe(2)
});
test('tasks should be added', () => {

    const endState: TasksType = tasksReducer({todolistID1: [], todolistID2: []}, actions.setTasksAC('todolistID1', [
        {id: '1', status: TaskStatuses.Completed, title: 'newTask', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
    ] ))
    //const keys = Object.keys(endState)

    expect(endState['todolistID1'].length).toBe(3)
    expect(endState['todolistID1']).toEqual([
        {id: '1', status: TaskStatuses.Completed, title: 'newTask', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        {id: '2', status: TaskStatuses.New, title: 'Task2', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
        {id: '3',status: TaskStatuses.New, title: 'hello', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todolistID2},
    ])
});

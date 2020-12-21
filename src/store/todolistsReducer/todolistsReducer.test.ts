import {v1} from "uuid"
import {
    addTodolistAC, removeTodolistAC, todolistReducer,
    changeTodolistTitleAC, changeTodolistFilterValueAC, TodolistDomainType, setTodolistsAC
} from './todolistsReducer'

let todolists: Array<TodolistDomainType>;
let todolistID1: string
let todolistID2: string

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    todolists = [
        {id: todolistID1, title: 'What I want to learn', filter: 'all', addedDate: '', order: 1},
        {id: todolistID2, title: 'React', filter: 'all', addedDate: '', order: 2},
    ]
});


test('Add new todolist',()=> {
    //data
    const newTitle = 'What to buy'
    //action
    const endState = todolistReducer(todolists, addTodolistAC({id: 'todolist1', addedDate: '', order: 0, title: newTitle}))

    //expect result
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('React')
    expect(endState[0].title).toBe('What to buy')
})

test('Remove todolist',()=> {
    //data
    const todolistId = todolistID1
    //action
    const endState = todolistReducer(todolists, removeTodolistAC(todolistId))
    //expect result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('Change title of todolist',()=> {
    //data
    const newTitle = 'new Title'
    //action
    const endState = todolistReducer(todolists, changeTodolistTitleAC(todolistID2, newTitle))

    //expect result
    expect(endState[1].title).toBe('new Title')
})

test('Change filter of todolist',()=> {
    //data
    const newFilterValue = 'active'
    //action
    const endState = todolistReducer(todolists, changeTodolistFilterValueAC(todolistID2, newFilterValue))

    //expect result
    expect(endState[1].filter).toBe('active')
})
test('Todolist should be set',()=> {

    const endState = todolistReducer([], setTodolistsAC(todolists))
    //expect result
    expect(endState.length).toBe(2)
})

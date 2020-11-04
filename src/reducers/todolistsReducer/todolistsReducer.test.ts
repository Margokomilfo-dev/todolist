import {v1} from "uuid"
import {TodolistType} from "../../App"
import {addTodolistAC,removeTodolistAC,todolistReducer,
    changeTodolistTitleAC,changeTodolistFilterValueAC} from "./todolistsReducer";

test('Add new todolist',()=> {
    //data
    let todolists: Array<TodolistType> = [
        {id: v1(), title: 'What I want to learn', filter: 'all'},
        {id: v1(), title: 'React', filter: 'all'},
    ]

    const newTitle = 'What to buy'

    //action
    const endState = todolistReducer(todolists, addTodolistAC(newTitle))

    //expect result

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to buy')
})

test('Remove todolist',()=> {
    //data
    const todolistID1 = v1()
    const todolistID2 = v1()
    let todolists: Array<TodolistType> = [
        {id: todolistID1, title: 'What I want to learn', filter: 'all'},
        {id: todolistID2, title: 'React', filter: 'all'},
    ]
    const todolistId = todolistID1
    //action
    const endState = todolistReducer(todolists, removeTodolistAC(todolistId))

    //expect result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('Change title of todolist',()=> {
    //data
    const todolistID1 = v1()
    const todolistID2 = v1()
    let todolists: Array<TodolistType> = [
        {id: todolistID1, title: 'What I want to learn', filter: 'all'},
        {id: todolistID2, title: 'React', filter: 'all'},
    ]
    const newTitle = 'new Title'
    //action
    const endState = todolistReducer(todolists, changeTodolistTitleAC(todolistID2, newTitle))

    //expect result
    expect(endState[1].title).toBe('new Title')
})

test('Change filter of todolist',()=> {
    //data
    const todolistID1 = v1()
    const todolistID2 = v1()
    let todolists: Array<TodolistType> = [
        {id: todolistID1, title: 'What I want to learn', filter: 'all'},
        {id: todolistID2, title: 'React', filter: 'all'},
    ]
    const newFilterValue = 'active'
    //action
    const endState = todolistReducer(todolists, changeTodolistFilterValueAC(todolistID2, newFilterValue))

    //expect result
    expect(endState[1].filter).toBe('active')
})
import {tasksReducer} from './tasksReducer'
import {addTodolistAC, todolistReducer} from './todolistsReducer'

test('ids should be equals', () => {

    const endTasksState = tasksReducer({},
        addTodolistAC({id: 'todolist1', addedDate: '', order: 0, title: 'newTitle'}))
    const endTodolistsState = todolistReducer([],
        addTodolistAC({id: 'todolist1', addedDate: '', order: 0, title: 'newTitle'}))

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    
    expect(idFromTasks).toBe('todolist1')
    expect(idFromTodolists).toBe('todolist1')
})
import {StatusType, changeAppStatusAC, appReducer, changeAppErrorTextAC, isInitializedAC} from './appReducer'

type StateType = {
    status: StatusType
    error: null | string,
    isInitialized: boolean
}
let state: StateType
beforeEach(() => {
    state = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('Change status of App', () => {
    const endState = appReducer(state, changeAppStatusAC('succeeded'))
    endState &&
    expect(endState.status).toBe('succeeded')
})
test('Change of error text', () => {
    const endState = appReducer(state, changeAppErrorTextAC('Some error'))
    // endState &&
    expect(endState.error).toBe('Some error')
})
test('Change initialized app - status ', () => {
    const endState = appReducer(state, isInitializedAC (true))
    // endState &&
    expect(endState.isInitialized).toBe(true)
})
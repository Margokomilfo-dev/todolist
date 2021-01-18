import {StatusType, changeAppStatusAC, appReducer, changeAppErrorTextAC} from './appReducer'

type StateType = {
    status: StatusType
    error: null | string
}
let state: StateType
beforeEach(() => {
    state = {
        status: 'idle',
        error: null
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
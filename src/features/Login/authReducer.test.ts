import {authReducer, setIsLoggedInAC} from './authReducer'


test('Change authentication status ', () => {
    const endState = authReducer({isLoggedIn: false}, setIsLoggedInAC({value: true}))
    endState &&
    expect(endState.isLoggedIn).toBe(true)
})
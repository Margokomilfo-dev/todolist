import {authReducer, setIsLoggedInAC} from './authReducer'


test('Change authentication status ', () => {
    const endState = authReducer({isLoggedIn: false}, setIsLoggedInAC(true))
    endState &&
    expect(endState.isLoggedIn).toBe(true)
})
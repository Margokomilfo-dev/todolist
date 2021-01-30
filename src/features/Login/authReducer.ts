import {Dispatch} from 'redux'
import {changeAppStatusAC} from '../../app/appReducer'
import {authApi, LoginPayloadType} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utills/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{value: boolean}>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})


export const {setIsLoggedInAC} = slice.actions
export const authReducer = slice.reducer

// thunks
export const loginTC = (data: LoginPayloadType) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'loading'}))
    authApi.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(changeAppStatusAC({ status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const loginOutTS = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({ status: 'loading'}))
    authApi.logOut()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(changeAppStatusAC({ status: 'succeeded'}))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
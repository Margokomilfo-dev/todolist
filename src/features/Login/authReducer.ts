import {Dispatch} from 'redux'
import {ChangeAppErrorTextACType, changeAppStatusAC, ChangeAppStatusACType} from '../../app/appReducer'
import {authApi, LoginPayloadType, tasksApi} from '../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../utills/error-utils'
import {actions} from '../TodolistsList/tasksReducer'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginPayloadType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(changeAppStatusAC('loading'))
    authApi.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(changeAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const loginOutTS = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(changeAppStatusAC('loading'))
    authApi.logOut()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(changeAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ChangeAppStatusACType | ChangeAppErrorTextACType
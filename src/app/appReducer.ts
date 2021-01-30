import {Dispatch} from 'redux'
import {authApi} from '../api/api'
import { setIsLoggedInAC } from '../features/Login/authReducer'


const intialState: StateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state:StateType = intialState, action: ActionsType): StateType  => {
    switch (action.type) {
        case 'todolist/appReducer/SET_STATUS':
            return {...state, status: action.status}
        case 'todolist/appReducer/SET_ERROR':
            return {...state, error: action.error}
        case 'todolist/appReducer/IS_INIT': {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}
//actionCreators
export const changeAppStatusAC = (status: StatusType) => ({type: typesAppReducer.SET_STATUS, status} as const)
export const changeAppErrorTextAC = (error: null | string) => ({type: typesAppReducer.SET_ERROR, error} as const)
export const isInitializedAC = (value: boolean) => ({type: typesAppReducer.IS_INIT, value} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.authMe().then(res => {
        if (res.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));

        } else {
        }
        dispatch(isInitializedAC(true))
    })
}

//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type StateType = {
    status: StatusType,
    error:  null | string
    isInitialized: boolean
}
export enum typesAppReducer {
    SET_STATUS = 'todolist/appReducer/SET_STATUS',
    SET_ERROR = 'todolist/appReducer/SET_ERROR',
    IS_INIT = 'todolist/appReducer/IS_INIT'
}
export type ChangeAppStatusACType = ReturnType<typeof changeAppStatusAC>
export type ChangeAppErrorTextACType = ReturnType<typeof changeAppErrorTextAC>
type ActionsType =
    | ChangeAppStatusACType
    | ChangeAppErrorTextACType
    | ReturnType<typeof isInitializedAC>

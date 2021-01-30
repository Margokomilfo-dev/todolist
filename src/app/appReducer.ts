import {Dispatch} from 'redux'
import {authApi} from '../api/api'
import { setIsLoggedInAC } from '../features/Login/authReducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const initialState: StateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        changeAppStatusAC: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
        },
        changeAppErrorTextAC: (state, action: PayloadAction< {error: null | string}>) => {
            state.error = action.payload.error
        },
        isInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const {changeAppStatusAC, changeAppErrorTextAC, isInitializedAC} = slice.actions
export const appReducer = slice.reducer


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.authMe().then(res => {
        if (res.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));

        } else {
        }
        dispatch(isInitializedAC({isInitialized: true}))
    })
}

//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type StateType = {
    status: StatusType,
    error:  null | string
    isInitialized: boolean
}
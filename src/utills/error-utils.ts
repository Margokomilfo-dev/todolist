import {
    changeAppErrorTextAC,
    changeAppStatusAC,
} from '../app/appReducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch) => {
    if (res.messages.length) {
        dispatch(changeAppErrorTextAC({error: res.messages[0]}))
    } else {
        dispatch(changeAppErrorTextAC({error: 'Some error occurred'}))
    }
    dispatch(changeAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch) => {
    dispatch(changeAppStatusAC({status: 'failed'}))
    dispatch(changeAppErrorTextAC(err.message ? {error: err.message} : {error: 'Some error occurred'}))
}
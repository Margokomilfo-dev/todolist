import {
    changeAppErrorTextAC,
    ChangeAppErrorTextACType,
    changeAppStatusAC,
    ChangeAppStatusACType
} from '../app/appReducer'
import {ResponseType} from '../api/api'
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<ChangeAppStatusACType | ChangeAppErrorTextACType>) => {
    if (res.messages.length) {
        dispatch(changeAppErrorTextAC(res.messages[0]))
    } else {
        dispatch(changeAppErrorTextAC('Some error occurred'))
    }
    dispatch(changeAppStatusAC('failed'))
}

export const handleServerNetworkError = (err: { message: string }, dispatch: Dispatch<ChangeAppStatusACType | ChangeAppErrorTextACType>) => {
    dispatch(changeAppStatusAC('failed'))
    dispatch(changeAppErrorTextAC(err.message ? err.message : 'Some error occurred'))
}
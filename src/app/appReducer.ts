const intialState: StateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state:StateType = intialState, action: ActionsType): StateType  => {
    switch (action.type) {
        case 'todolist/appReducer/SET_STATUS':
            return {...state, status: action.status}
        case 'todolist/appReducer/SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
//actionCreators
export const changeAppStatusAC = (status: StatusType) => ({type: typesAppReducer.SET_STATUS, status} as const)
export const changeErrorTextAC = (error: null | string) => ({type: typesAppReducer.SET_ERROR, error} as const)


//types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type StateType = {
    status: StatusType,
    error:  null | string
}
export enum typesAppReducer {
    SET_STATUS = 'todolist/appReducer/SET_STATUS',
    SET_ERROR = 'todolist/appReducer/SET_ERROR',
}
export type ChangeAppStatusACType = ReturnType<typeof changeAppStatusAC>
export type ChangeErrorTextACType = ReturnType<typeof changeErrorTextAC>
type ActionsType =
    | ChangeAppStatusACType
    | ChangeErrorTextACType

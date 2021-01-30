import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {changeAppErrorTextAC, StatusType} from '../../app/appReducer'

function SnackBar(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeAppErrorTextAC({error: null}))
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <SnackBar onClose={handleClose} severity="error">
                    {error}
                </SnackBar>
            </Snackbar>
        </div>
    );
}
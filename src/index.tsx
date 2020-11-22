import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AppWithUseReducer from "./AppWithUseReducer";
import AppWithRedux from './AppWithRedux'
import {Provider} from 'react-redux'
import {store} from "./store/store"

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));

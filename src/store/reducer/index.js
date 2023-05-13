import { combineReducers } from 'redux'

// reducers 
import { alert, auth, mode, tab, form, refresh, socket, message } from './utility'

const globalReducer = combineReducers({
    alert,
    auth,
    mode,
    tab,
    form,
    refresh,
    socket,
    message
})

export default globalReducer;
// Actions for Alert
export const setAlert = (parameters) => {
    return {
        type: 'NOTIFY',
        payload: parameters
    }
}
// Actions for Auth
export const setAuth = (parameters) => {
    return {
        type: 'AUTH',
        payload: parameters
    }
}
// Actions for change to dark mode
export const setMode = (parameters) => {
    return {
        type: 'MODE',
        payload: parameters
    }
}
// Actions for change to dark mode
export const setTab = (parameters) => {
    return {
        type: 'TAB',
        payload: parameters
    }
}
// Actions for change to dark mode
export const setForm = (parameters) => {
    return {
        type: 'FORM',
        payload: parameters
    }
}

// for refresh token Box 

export const setRefreshBox = (parameters) => {
    return {
        type: 'REFRESH',
        payload: parameters
    }
}

// for refresh token Box 

export const setSocket = (parameters) => {
    return {
        type: 'SETSOCKET',
        payload: parameters
    }
}

// for refresh token Box 

export const setActiveUser = (parameters) => {
    return {
        type: 'ACTIVE_USER',
        payload: parameters
    }
}

// for refresh token Box 

export const resetUser = (parameters) => {
    return {
        type: 'RESET_USER',
        payload: parameters
    }
}
// for refresh token Box 

export const setMessage = (parameters) => {
    return {
        type: 'NEW_MESSAGE',
        payload: parameters
    }
}
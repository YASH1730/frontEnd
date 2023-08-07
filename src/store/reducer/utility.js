const initialAlert = {
    open: false,
    message: null,
    variant: null
}

export const alert = (state = initialAlert, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.payload;
        default:
            return state;
    }
}

const initialAuth = {
    isAuth: false,
    role: null,
    token: null,
    access: [],

}

export const auth = (state = initialAuth, action) => {
    switch (action.type) {
        case 'AUTH':
            return state = action.payload;
        default:
            return state;
    }
}
const initialMode = {
    type: false

}

export const mode = (state = initialMode, action) => {
    switch (action.type) {
        case 'MODE':
            return state = action.payload;
        default:
            return state;
    }
}
const initialTab = {
    open: false
}

export const tab = (state = initialTab, action) => {
    switch (action.type) {
        case 'TAB':
            return state = { open: action.payload.open };
        default:
            return state;
    }
}
const initialForm = {
    state: false,
    formType: null,
    payload: null,
    row: null,
    setRow: null

}

export const form = (state = initialForm, action) => {
    switch (action.type) {
        case 'FORM':
            return state = action.payload;
        default:
            return state;
    }
}

const initialRefresh = {
    state: false,
}

export const refresh = (state = initialRefresh, action) => {
    switch (action.type) {
        case 'REFRESH':
            return state = action.payload;
        default:
            return state;
    }
}
const initialSocket = {
    id: null,
    active_user : []
}

export const socket = (state = initialSocket, action) => {
    switch (action.type) {
        case 'SETSOCKET':
            return state = {...state,id : action.payload};
        case 'ACTIVE_USER':
            // console.log(action.payload,state)
            return state = {...state,active_user : [...state.active_user,action.payload]};
        case 'LOGOUT':
            // console.log(action.payload,state)
            return state = {...state,active_user : state.active_user.filter(row=>!row[action.payload])};
        default:
            return state;
    }
}
const initialMessage = {
    type: null,
    message : ''
}

export const message = (state = initialMessage, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            console.log(action.payload)
            return state = {...action.payload};
        default:
            return state;
    }
}
const initialState = {
    registerEmail: '',
    password: '',
    loginEmail: '',
    loginToken: '',
    googleID: '',
    appleID: '',
    uniqueURL:'',
    userId:''
}

const authReducers = (state = initialState, action) => {
   switch (action.type) {
       case 'EMAIL':
        return ({ ...state, registerEmail: action.payload })
       case 'PASSWORD':
            return ({ ...state, password: action.payload })
       case 'LOGIN_MAIL':
            return ({ ...state, loginEmail: action.payload })
       case 'LOGIN_TOKEN':
            return ({ ...state, loginToken: action.payload })
       case 'GOOGLE_ID_TOKEN' :
            return ({...state, googleID: action.payload})
       case 'APPLE_ID_TOKEN' :
             return ({...state, appleID: action.payload})
       case 'UNIQUEURL' :
            return ({...state, uniqueURL: action.payload})
       case 'USERID' :
             return ({...state, userId: action.payload})
        default:
            return state;
    }
}

export default authReducers;


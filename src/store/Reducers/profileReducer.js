const initialState = {
   logoUrl:'',
   profileDetails:[],
   profileresponse:[],
   bannerDetails:[],
   postData:[],
   services:[],
   servicesPhoto:[],
   movingData:[]
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOURL':
            return ({ ...state, logoUrl : action.payload })
        case "PROFILEDETAILS":
            return ({...state,profileDetails:action.payload})
        case "PROFILERESPONSE":
            return ({...state,profileresponse:action.payload})
        case "BANNERDETAILS":
            return ({...state,bannerDetails:action.payload})
        case "SERVICES":
            return ({...state,services:action.payload})
        case "POSTDATA":
            return ({...state,postData:action.payload})
        case "SERVICESPHOTO":
            return ({...state,servicesPhoto:action.payload})
        case 'moving_data':
            return ({...state,movingData:action.payload})

        default: return state;
    }
}

export default profileReducer;
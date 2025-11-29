const initialState = {
    movingService: {},
    movingsService: {},
    hvacService: {},
    electricianService: {},
    electriciansService: {},
    plumberService: {},
    houseCleaningService: {},
    windowCleaningService: {},
    carpetCleaningService: {},
    gutterCleaningService: {},
    pressureWashingService: {},
    pressureWashingsService: {},
    getplumbersService:{},
    gethousecleaningService:{},
    workerList:[],
    upcomingjobs:[],
    ongoingJobs:[],
    notificationData:[],
    revenue:[],
    businessverification:[],
    useraccountdetails:[]
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVINGS_SERVICES':
            return ({ ...state, movingsService: action.payload })
        case 'MOVING_SERVICES':
            return ({ ...state, movingService: action.payload })
        case "HVAC_SERVICES":
            return ({ ...state, hvacService: action.payload })
        case "ELECTRICIAN_SERVICES":
            return ({ ...state, electricianService: action.payload })
        case "ELECTRICIANS_SERVICES":
            return ({ ...state, electriciansService: action.payload })
        case "PLUMBER_SERVICES":
            return ({ ...state, plumberService: action.payload })
        case "HOUSE_CLEANING_SERVICES":
            return ({...state, houseCleaningService: action.payload})
        case "GET_HOUSE_CLEANING":
            return ({...state, gethousecleaningService: action.payload})
        case "WINDOW_CLEANING_SERVICES":
            return ({...state, windowCleaningService: action.payload})
        case "CARPET_CLEANING_SERVICES" :
            return ({...state, carpetCleaningService: action.payload})
        case "PRESSURE_WASHING_SERVICES":
            return ({...state, pressureWashingService: action.payload})
        case "PRESSURE_WASHINGS_SERVICES":
            return ({...state, pressureWashingsService: action.payload})
        case "GET_PLUMBERS":
            return ({...state, getplumbersService: action.payload})
        case "GUTTER_CLEANING_SERVICES":
            return ({...state, gutterCleaningService: action.payload})
        case "UPCOMINGJOBS":
            return ({...state, upcomingjobs: action.payload})
        case "ONGOINGJOBS":
            return ({...state, ongoingJobs: action.payload})
        case "WORKER_LIST":
            return ({...state,workerList:action.payload})
        case "NOTIFICATION_DATA":
            return ({...state,notificationData:action.payload})
            case "BUSINESS_VERIFY":
            return ({...state,businessverification:action.payload})
            case "REVENUE":
            return ({...state,revenue:action.payload})
            case "USER_ACCOUNT_DETAILS":
            return ({...state,useraccountdetails:action.payload})
        default: return state;
    }
}

export default dashboardReducer;
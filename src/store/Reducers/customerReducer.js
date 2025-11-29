const initialState = {
    search:[],
    bookings:[],
    savedjobs:[],
    newValues:{},
    customerdetails:{},
    editcustomer:{},
    isChat:false
}

const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH':
            return ({ ...state, search: action.payload ,searchdetails:action?.details, service:null });
        case 'MOVING':
            return ({ ...state, service: action.payload,finaldata:action.finaldata });
        case 'ELECTRICIANS':
            return ({ ...state, service: action.payload,finaldata:action.finaldata });
        case 'PLUMBERS':
            return ({ ...state, service: action.payload,finaldata:action.finaldata });
        case 'HVAC':
            return ({ ...state, service: action.payload });
        case 'FURNITUREASSEMBLY':
            return ({ ...state, service: action.payload });
        case 'HANDYMAN':
            return ({ ...state, service: action.payload });
        case 'TILENGROUT':
            return ({ ...state, service: action.payload });
        case 'CLEANING':
            return ({ ...state, service: action.payload });
        case 'GUTTERCLEANING':
            return ({ ...state, service: action.payload });
        case 'ROOFCLEANING':
            return ({ ...state, service: action.payload });
        case 'PRESSUREWASHING':
            return ({ ...state, service: action.payload ,finaldata:action.finaldata});
        case 'CARPETCLEANING':
            return ({ ...state, service: action.payload,finaldata:action.finaldata });
        case 'RUGCLEANING':
            return ({ ...state, service: action.payload });
        case 'WINDOWCLEANING':
            return ({ ...state, service: action.payload });
        case 'SEARCHSERVICE':
            return ({ ...state, service: action.payload });
        case 'BOOKINGS':
            return ({ ...state, bookings: action.payload });
        case 'SAVEDJOBS':
            return ({ ...state, savedjobs: action.payload });
        case 'CUSTOMER_DETAILS':
            return ({ ...state, customerdetails: action.payload });
        case 'EDIT_CUSTOMER':
            return ({ ...state, editcustomer: action.payload });
        case 'ADDFAVOURITE':
            return ({ ...state, addfavourite: action.payload });
            case 'NEWVALUES':
                return ({ ...state, newValues: action.payload });
                case 'ISCHAT':
                return ({ ...state, isChat: action.payload });
        default: return state;
    }
}

export default CustomerReducer;
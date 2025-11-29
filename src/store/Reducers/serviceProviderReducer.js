const initialState = {
    phoneNumber: '',
    listOfOwners: [],
    companyName: '',
    companyLocation: {},
    businessLicense: [],
    businessDetails: {},
    services:[],
}

const serviceProviderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OWNERSHIP': 
            return ({ ...state, listOfOwners : action.payload })
        case 'PHONENUMBER': 
            return ({ ...state, phoneNumber: action.payload })
        case 'BUSINESSNAME': 
            return ({ ...state, companyName: action.payload })
        case 'COMPANYLOCATION': 
            return ({ ...state, companyLocation: action.payload })
        case 'BUSINESSLICENSE': 
            return ({ ...state, businessLicense: action.payload });
        case 'BUSINESSDETAILS': 
            return ({ ...state, businessDetails: action.payload }); 
        case 'SERVICES': 
            return ({ ...state, services: action.payload });                  
        default: return state;
    }
}

export default serviceProviderReducer;
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import serviceProviderReducer from './serviceProviderReducer';
import profileReducer from './profileReducer';
import dashboardReducer from './dashboardReducer';
import CustomerReducer from './customerReducer';
const reducers = combineReducers({
    auth: authReducer,
    serviceProvider: serviceProviderReducer,
    profileReducer:profileReducer,
    dashboardReducer: dashboardReducer,
    customerReducer:CustomerReducer
  })

export default reducers;
import NetworkOps from "../../services/NetworkOps";
import { ServiceEnum } from "../../services/Urls";

export const getMovingServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'movingServiceData');
    const res = await NetworkOps.post(ServiceEnum.movingServices,data)
    if (res.status === true) {
      dispatch({
        type: 'MOVING_SERVICES',
        payload: res.data
      })
      dispatch(getMovingServiceData())
    }
    return res;
  }

  export const getUpcomingJobs=() => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.upcomingjobs}`)
    if (res.status === true) {
      dispatch({
        type: 'UPCOMINGJOBS',
        payload: res.data
      })
    }
    return res
  }
  
  export const getHVACServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'hvacServiceData');
    const res = await NetworkOps.post(ServiceEnum.hvacServices,data)
    if (res.status === true) {
      dispatch({
        type: 'HVAC_SERVICES',
        payload: res.data
      })
    }
    return res;
  } 

  export const getElectricianServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'electricianServiceData');
    const res = await NetworkOps.post(ServiceEnum.electricianServices,data)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIAN_SERVICES',
        payload: res.data
      })
      dispatch(getElectricianServiceData())
    }
    return res;
  }
  export const getHandyManServiceDetails = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.handymanServices,data)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIAN_SERVICES',
        payload: res.data
      })
    }
    return res;
  }
  export const getFunitureAssemblyServiceDetails = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.furnitureAssembly,data)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIAN_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const getTileandGroutServiceDetails = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.tileandgroutService,data)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIAN_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const getPlumberServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'plumberServiceData');
    const res = await NetworkOps.post(ServiceEnum.plumberServices,data)
    if (res.status === true) {
      dispatch({
        type: 'PLUMBER_SERVICES',
        payload: res.data
      })
      dispatch(getPlumbersDataServiceData())
    }
    return res;
  }
  export const getHouseCleaningServiceData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.gethousecleaningServices)
    if (res.status === true) {
      dispatch({
        type: 'GET_HOUSE_CLEANING',
        payload: res.data
      })
    }
    return res;
  }
  export const getHouseCleaningServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'houseCleaningServiceData');
    const res = await NetworkOps.post(ServiceEnum.houseCleaningServices,data)
    if (res.status === true) {
      dispatch({
        type: 'HOUSE_CLEANING_SERVICES',
        payload: res.data
      })
      dispatch(getHouseCleaningServiceData())
    }
    return res;
  }


  export const getWindowCleaningServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'windowCleaningServiceData');
    const res = await NetworkOps.post(ServiceEnum.windowCleaningServices,data)
    if (res.status === true) {
      dispatch({
        type: 'WINDOW_CLEANING_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const getCarpetCleaningServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'carpetCleaningServiceData');
    const res = await NetworkOps.post(ServiceEnum.carpetCleaningServices,data)
    if (res.status === true) {
      dispatch({
        type: 'CARPET_CLEANING_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

 export const getPressureWashingServiceDetails = (data) => async (dispatch, getState) =>{
  console.log(data,'pressureWashingServiceData');
  const res = await NetworkOps.post(ServiceEnum.pressureWashingServices,data)
  if (res.status === true) {
    dispatch({
      type: 'PRESSURE_WASHING_SERVICES',
      payload: res.data
    })
    dispatch(getPressureWashingDataServiceData())
  }
  return res;
 }

 export const businessverification = (data) => async (dispatch, getState) =>{
  const res = await NetworkOps.post(ServiceEnum.Businessverify,data)
  if (res.status === true) {
    dispatch({
      type: 'BUSINESS_VERIFY',
      payload: res.data
    })
  }
  return res;
 }

  export const getGutterCleaningServiceDetails = (data) => async (dispatch, getstate) => {
    // const uniqueURL = localStorage.getItem('token')
    //const { uniqueURL } = getstate().auth
    console.log(data,'gutterCleaningServiceData');
    const res = await NetworkOps.post(ServiceEnum.gutterCleaningServices,data)
    if (res.status === true) {
      dispatch({
        type: 'GUTTER_CLEANING_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const sendInviteToworker = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.inviteWorker,data)
    return res;
  }

  export const getWorkerList = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.workerList)
    if (res.status === true) {
      dispatch({
        type: 'WORKER_LIST',
        payload: res.data
      })
    }
    console.log(res)
    return res;
  }
  export const getuseraccountdetails = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.useraccountdetails)
    if (res.status === true) {
      dispatch({
        type: 'USER_ACCOUNT_DETAILS',
        payload: res.data
      })
    }
    console.log(res)
    return res;
  }

  export const getTotalrevenue = (value) => async (dispatch, getstate) => {
    const res = await NetworkOps.get(`${ServiceEnum.Revenue}?filter=${value}`)
    if (res.status === true) {
      dispatch({
        type: 'REVENUE',
        payload: res.data
      })
    }
    return res;
  }

  export const getMovingServiceData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.getMovingServices)
    if (res.status === true) {
      dispatch({
        type: 'MOVINGS_SERVICES',
        payload: res.data
      })
    }
    return res;
  }
  export const getElectricianServiceData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.getElectricianServices)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIANS_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const getPressureWashingDataServiceData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.getPressureWahing)
    if (res.status === true) {
      dispatch({
        type: 'PRESSURE_WASHINGS_SERVICES',
        payload: res.data
      })
    }
    return res;
  }

  export const getPlumbersDataServiceData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.getPlumbers)
    if (res.status === true) {
      dispatch({
        type: 'GET_PLUMBERS',
        payload: res.data
      })
    }
    return res;
  }

  export const getNotificationData = () => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.getNotificationData
     )
    if (res.status === true) {
      dispatch({
        type: 'NOTIFICATION_DATA',
        payload: res.data
      })
    }
    return res;
  }

  export const getBookings = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.getBookings)
    if (res.status === true) {
      dispatch({
        type: 'BOOKINGS',
        payload: res.data
      })
    }
  }
  export const getSavedjobs = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.savedjobs)
    if (res.status === true) {
      dispatch({
        type:'SAVEDJOBS',
        payload: res.data
      })
    }
  }
  export const acceptJob = (data,type) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.acceptJob,data)
    console.log(type,'typee')
    if(type==='notif'){
    dispatch(getNotificationData())
    }
    else if(type==='bookings'){
      dispatch(getBookings())
    }
    return res;
  }

  export const assignedJob = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.assignedJob,data)
    dispatch(getUpcomingJobs())
    return res;
  }

  export const getmanageJob = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.manageJob,data)
    console.log(res,"res")
    dispatch(getUpcomingJobs())
    return res;
  }

  export const getOngoingJobs=() => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.ongoingJobs)
    if (res.status === true) {
      dispatch({
        type: 'ONGOINGJOBS',
        payload: res.data
      })
    }
    return res
  }

  export const sendRequest = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.sendRequest,data)
    return res;
  }
  
  export const sendAdminEmail = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.adminSendEmail,data)
    return res;
  }

  export const getAdminDetails = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.getAdminDetails}${data}`)
    return res;
  }
  export const spResetPassword = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.resetPassword,data)
    return res;
  }
  export const insurenceVerification = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.insurenceVaerification,data)
    return res;
  }
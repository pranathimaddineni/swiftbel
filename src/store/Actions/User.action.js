import NetworkOps from "../../services/NetworkOps";
import { ServiceEnum } from "../../services/Urls";
export const search=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.search}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'SEARCH',
        payload: res.data,
        details:res.detail
      })
    }
    return res
  }
  export const moving=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.moving}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'MOVING',
        payload: res.data,
        finaldata:res.finalData
      })
    }
    return res
  }

  export const newMoving=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.newmoving}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'MOVING',
        payload: res.data,
        finaldata:res.finalData
      })
    }
    return res
  }
  export const electricians=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.electricians}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'ELECTRICIANS',
        payload: res.data,
        finaldata:res.finalData
      })
    }
    return res
  }

  export const plumbers=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.Plumbers}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'PLUMBERS',
        payload: res.data,
        finaldata:res.finalData
      })
    }
    return res
  }

  export const hvac=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.hvac}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'HVAC',
        payload: res.data
      })
    }
    return res
  }
  export const roofcleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.roofcleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'ROOFCLEANING',
        payload: res.data
      })
    }
    return res
  }

  export const tilengrout=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.tilengrout}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'TILENGROUT',
        payload: res.data
      })
    }
    return res
  }
  export const furnitureassemblydetails=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.furnitureassemblydetails}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'FURNITUREASSEMBLY',
        payload: res.data
      })
    }
    return res
  }
  export const handyman=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.handyman}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'HANDYMAN',
        payload: res.data
      })
    }
    return res
  }

  export const housecleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.housecleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'CLEANING',
        payload: res.data
      })
    }
    return res
  }
  export const guttercleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.guttercleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'GUTTERCLEANING',
        payload: res.data
      })
    }
    return res
  }

  export const pressurewashing=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.pressurewashing}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'PRESSUREWASHING',
        payload: res.data,
        finaldata:res.finalData
      })
    }
    return res
  }

  export const carpetcleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.carpetcleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'CARPETCLEANING',
        payload: res.data
      })
    }
    return res
  }

  export const rugcleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.rugcleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'RUGCLEANING',
        payload: res.data
      })
    }
    return res
  }

  export const windowcleaning=(value,pageNumber,limit) => async (dispatch, getstate) => {
    const res = await NetworkOps.put(`${ServiceEnum.windowcleaning}?pageNumber=${pageNumber}&serviceProvidersPerPage=${limit}`,value)
    if (res.status === true) {
      dispatch({
        type: 'WINDOWCLEANING',
        payload: res.data
      })
    }
    return res
  }

  export const Searchservice=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.searchservice}`,value)
    if (res.status === true) {
      dispatch({
        type: 'SEARCHSERVICE',
        payload: res.data
      })
    }
    return res
  }
  export const Editcustomerdetails=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.updatecustomerDetails}`,value)
    if (res.status === true) {
      dispatch({
        type: 'EDIT_CUSTOMER',
        payload: res.data
      })
    }
    dispatch(getCustomerDetails())
    return res
  }
  export const addfavourite=(value,type) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.addfavourite}`,value)
    if (res.status === true) {
      dispatch({
        type: 'ADDFAVOURITE',
        payload: res.data
      })
      if(type){
      dispatch(search({
        "placeOfService": "Vancouver",
        "date": "15-Jul-2022",
        "time": "11:00"
        , servicesOffered: type
    }, 1, 50))
  }

    }
    return res
  }
  export const getpaymentIntent=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.stripePaymentIntent}`,value)
    if (res.status === true) {
    }
    return res
  }

  export const paymentBooking=(data,params,type)=>async(dispatch,getstate)=>{
    const details={
      "date": params?.date,
      "time": params?.time,
      "amount": data?.estimatedHourlyPrice
    }
    const res=await NetworkOps.post(`${ServiceEnum.paymentBooking}?sP=${data?.spId}&object=${params?._id}&serviceName=${type}`,details)

    return res;
  }

  export const getAdvancepaymentIntent=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.advancePaymentIntent}`,value)

    return res
  }
  export const getPatentValue=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.savePatent}`,value)
    return res
  }
  export const getCustomerDetails = () => async (dispatch, getstate) => {
    const res = await NetworkOps.get(ServiceEnum.customerDetails)
    if (res.status === true) {
      dispatch({
        type: 'CUSTOMER_DETAILS',
        payload: res.data
      })

    }
  }

  export const getVerificationMailCode=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.verifcationMail}`,value)
    return res
  }

  export const matchotpCode=(value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.matchOtp}`,value)
    return res
  }
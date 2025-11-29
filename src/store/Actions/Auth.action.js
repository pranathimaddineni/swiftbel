
import axios from "axios";
import NetworkOps from "../../services/NetworkOps";
import { ServiceEnum } from "../../services/Urls";


export const registerUser=(data)=>async (dispatch,getstate)=>{
    const res=await NetworkOps.post(ServiceEnum.completeProfile,data)
        if(res.status===true)
        {
            localStorage.setItem('token', res.token)
        localStorage.setItem('isServiceProvider', false);

        dispatch({
            type: 'USERID',
            payload:res?.data._id
          })
        }
    return res
}

export const loginUsers=(data)=>async (dispatch,getstate)=>{
    const res=await NetworkOps.post(ServiceEnum.loginUser,data)
    if(res.status===true)
        {
            dispatch({
                type: 'LOGIN_TOKEN',
                payload: res.token
            })
            dispatch({
                type: 'UNIQUEURL',
                payload: res.uniqueUrl
            })
            localStorage.setItem('token', res.token);
            localStorage.setItem('uniqueUrl', res.uniqueUrl);
            localStorage.setItem('isServiceProvider', res.data.isServiceProvider);
            localStorage.setItem('userName', res?.data?.firstName);

        }
return res
}
export const mobileNo = (value) => async (dispatch, getstate) => {
    dispatch({
        type: 'PHONENUMBER',
        payload: value
    })
    var config = {
        method: 'post',
        url: `https://prod.swiftbel.com/twilio/sendCode?phoneNumber=${value}&channel=sms`,
        headers: { 'Access-Control-Allow-Origin': '*' }
    };
    let res
    await axios(config)
        .then(function (response) {

            res = response.data

        })
        .catch(function (error) {
            res = error.response.data

        })
    return res;
}

export const getVerificationCode = (value) => async (dispatch, getstate) => {
    const { phoneNumber } = getstate().serviceProvider
    var config = {
        method: 'post',
        url: `https://prod.swiftbel.com/twilio/verify?phoneNumber=${phoneNumber}&code=${value}`,
        headers: {}
    };
    let res;
    await axios(config)
        .then(function (response) {
            res = response.data

        })
        .catch(function (error) {
            res = error.response.data

        });
    return res;
}

export const _googleSignUp = (value) => async (dispatch, getstate) => {
    var data = {
        "tokenId": value
    };
    console.log(data);
    const res = await NetworkOps.post(ServiceEnum.googleSignup, data)
    if (res.status === 'success' || res.status === true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uniqueUrl', '');
        localStorage.setItem('isServiceProvider', false);
    }
    return res
}

export const signupWithMail = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.register, data)
    return res
}


export const verifyMail = () => async (dispatch, getstate) => {
    const { userId } = getstate().auth
    const res = await NetworkOps.get(`${ServiceEnum.userDetails}/${userId}`);
    return res
}

// export const confirmOtp = (values) => async (dispatch, getstate) => {
//     const res = await NetworkOps.get(`${ServiceEnum.confirmotp}`,values);
//     return res
// }
export const confirmOtp = (value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.confirmotp}`, value)
    // if (res.status == true) {
    //   dispatch({
    //     type: 'WINDOWCLEANING',
    //     payload: res.data
    //   })
    // }
    return res
}
export const confirmSignupOtp = (value) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(`${ServiceEnum.confirmSignupotp}`, value)
    // if (res.status == true) {
    //   dispatch({
    //     type: 'WINDOWCLEANING',
    //     payload: res.data
    //   })
    // }
    return res
}
export const googleLoginUser = (data) => async (dispatch) => {

    const res = await NetworkOps.post(ServiceEnum.loginUser, data);

    if (res.status === true || res.status === 'success') {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uniqueUrl', res.uniqueUrl);
        localStorage.setItem('isServiceProvider', res.isServiceProvider);
        localStorage.setItem('userName', res?.firstName);
    }

    return res;
}

export const Apple_SignUp = (data) => async (dispatch) => {
    console.log(data);
    const res = await NetworkOps.post(ServiceEnum.appleSignup, data);
    if (res.status === 'success' || res.status === true) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('uniqueUrl', '');
        localStorage.setItem('isServiceProvider', false);
        localStorage.setItem('userName', res?.result?.firstName);
    }

    return res;
}

export const newCreateProfile = (data) => async (dispatch) => {
    console.log(data,"data");
    const details={...data,"thruAdmin":"false"}
    const res = await NetworkOps.post(ServiceEnum.newCreateProfile, details);
    dispatch({
        type: 'EMAIL',
        payload: data.email
    })
    return res;
}
export const newPasswordSet = (data) => async (dispatch, getstate) => {
    const { registerEmail } = getstate().auth
    const details = {
        "email": registerEmail,
        "password": data
    }
    const res = await NetworkOps.post(ServiceEnum.newPasswordSet, details);
    if (res.status === 'success' || res.status === true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uniqueUrl', res.uniqueUrl);
        localStorage.setItem('isServiceProvider', true);
    }
    return res;
}
export const newCreateAdminProfile = (data) => async (dispatch) => {
    const details={...data,"thruAdmin":"true"}
    console.log(data,"data");
    const res = await NetworkOps.post(ServiceEnum.newCreateProfile, details);
    dispatch({
        type: 'EMAIL',
        payload: data.email
    })
    if (res.status === 'success' || res.status === true) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('uniqueUrl', res.data.uniqueUrl);
        localStorage.setItem('isServiceProvider', true);
    }
    return res;
}
export const setNewServices = (data) => async (dispatch,getstate) => {
    console.log(data,"data");
    const { registerEmail } = getstate().auth
    const details = {
        "email": registerEmail,
        "servicesOffered": data
    }
    const res = await NetworkOps.post(ServiceEnum.newSetServices, details);
    return res;
}


export const adminLogin = (data) => async (dispatch, getstate) => {
 
    const res = await NetworkOps.post(ServiceEnum.adminLogin, data);
    if (res.status === 'success' || res.status === true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('uniqueUrl', res.data.uniqueUrl);
        localStorage.setItem('isServiceProvider', true);
    }
    return res;
}


export const adminSignup = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.adminSignup, data);
    return res;
}

export const verifyEmailUser = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.verifyEmail,data);
    return res;
}


export const SubmitResetPassword = (data) => async (dispatch, getstate) => {
    const res = await NetworkOps.post(ServiceEnum.setPassword,data);
    return res;
}
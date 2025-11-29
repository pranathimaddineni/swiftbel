import moment from "moment";
import NetworkOps from "../../services/NetworkOps";
import { ServiceEnum } from "../../services/Urls";

export const addServiceProvider = () => async (dispatch, getstate) => {
  const { companyName, phoneNumber, listOfOwners, companyLocation, businessLicense, businessDetails } = getstate().serviceProvider
  // const {loginToken}= getstate().auth
  const token =  localStorage.getItem('token')
  const ownerData=[]
  var myHeaders = new Headers();
  var formdata = new FormData();
  myHeaders.append("x-api-key",`${token}`);
  myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  formdata.append("businessName", `${companyName}`);
  formdata.append("business_type", `Sole proprietorship`);
  formdata.append("business_number", `${businessDetails.businessNumber}`);
  formdata.append("businessLicenseName", `${businessLicense.fileName}`);
  formdata.append("businessLicense", `${businessLicense.fileData}`);
  formdata.append("address", "{\n        \"address\": \"catwalkstreet\",\n        \"city\": \"vegas\",\n        \"postalCode\": \"2450\",\n        \"country\": \"USA\",\n        \"buildingNumber\": \"90\",\n        \"street\": \"greenway headlines\"\n    }");
  formdata.append("phone", `${phoneNumber}`);
  formdata.append("location", JSON.stringify({ "lng": `${companyLocation.lng}`, "lat": `${companyLocation.lat}` }))
  listOfOwners.map((item, index) => {
    const data = JSON.stringify({
      "firstName": `${item.firstName}`,
      "lastName": `${item.lastName}`,
      "gender": `${item.gender}`,
      "dateOfBirth": `${moment(item.dateOfBirth).format('DD MM YYYY')}`,
      "country": `${item.country}`,
      "address": `${item.address}`,
      "provinceState": `${item.provinceState}`,
      "city": `${item.city}`,
      "photoIdName": `${item.photoIdName}`,
      "phone": `${item.phone}`,
      "email": `${item.email}`,
      "birth_city": `${item.birth_city}`,
      "birth_province_state": `${item.birth_province_state}`,
      "birth_country": `${item.birth_country}`,
    })
   return ownerData.push(data);
  })
  formdata.append(`listOfOwners[]`, ownerData)
  console.log(formdata, "ownerData")
  //   listOfOwners.map((item, index) => {
  //     formdata.append(`listOfOwners[${index}]photoId`,"/Users/prakashchanchal/Library/Developer/CoreSimulator/Devices/11E2351B-6FB8-48B4-AA11-FF631F1892D6/data/Containers/Data/Application/2FB39456-34E1-4A68-877A-0D3CEF7ADDCF/tmp/react-native-image-crop-picker/A3DF6E7E-C4A9-41AF-A378-1144885C61BF.jpg")
  //   })
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  let res;
  await fetch("https://prod.swiftbel.com/serviceProvider/createAccount", requestOptions)
    .then(response => response.text())
    .then(result => {
      res = result
      const res1=JSON.parse(result)
      localStorage.setItem('token', res1.token);
      localStorage.setItem('uniqueUrl', res1.uniqueUrl);
      localStorage.setItem('isServiceProvider', res1.data.isServiceProvider);
      localStorage.setItem('userName', res1?.data?.firstName);

      console.log(result, "result", res)
    })
    .catch(error =>  console.log('error'));
  return res;
}

// export const getProfileDetails = (uniqueURL) => async (dispatch, getstate) => {
//   //const { uniqueURL } = getstate().auth
//   let res
//   if(isAuthenticated()){
//     res= await NetworkOps.get(`v1/business/${uniqueURL}`)
//   }
//   else{
//   res= await NetworkOps.get(`business/${uniqueURL}`)
//   }
//   if (res.status === true) {
//     dispatch({
//       type: 'PROFILEDETAILS',
//       payload: res.data
//     })
//     dispatch({
//       type:'SERVICESPHOTO',
//       payload:res.servicesOfferedPhoto
//     })
//     dispatch({
//       type:'PROFILERESPONSE',
//       payload:res
//     })
//   }
//   return res.data;
// }

export const getBannerDetails = () => async (dispatch, getstate) => {
  const res = await NetworkOps.get(ServiceEnum.getBannerDetaiils)
  if (res.status === true) {
    dispatch({
      type: 'BANNERDETAILS',
      payload: res.data
    })

  }
}

export const getServices = () => async (dispatch, getstate) => {
  const res = await NetworkOps.get(ServiceEnum.getServices)
  console.log(res,"res")
  if (res.status === true) {
    dispatch({
      type: 'SERVICES',
      payload: res.data
    })
  }

}
export const UploadBannerImage = (data, type) => async (dispatch, getstate) => {
  const  uniqueURL  = localStorage.getItem('uniqueUrl')
  var details = new FormData();
  if (type === 'logo') {
    details.append("logoImage", data);
  }
  if (type === 'banner') {
    details.append("bannerImage", data);
  }
  const res = await NetworkOps.post(ServiceEnum.uploadBannerImage, details)
  await dispatch(getProfileDetails(uniqueURL))
  return res;
}
export const getPostData = () => async (dispatch, getstate) => {
  const res = await NetworkOps.get(ServiceEnum.getPost)
  if (res?.status === true) {
    dispatch({
      type: 'POSTDATA',
      payload: res.data
    })
  }

}
export const deletePost = (id) => async (dispatch, getstate) => {
const data={
  "ObjectId":id
}
console.log(data,"data")
  const  uniqueURL  = localStorage.getItem('uniqueUrl')
  const res = await NetworkOps.delete(ServiceEnum.deletPost,data);
  await dispatch(getProfileDetails(uniqueURL));
  return res;
}

export const UploadPost = (data, caption) => async (dispatch, getstate) => {
  const  uniqueURL  = localStorage.getItem('uniqueUrl')
  var details = new FormData();
  Object.keys(data).map((item, index) => {
   return details.append(`photos${item}`, data[item]);
  })
  details.append('comment', `${caption}`);
  const res = await NetworkOps.post(ServiceEnum.addNewPost, details)
  await dispatch(getPostData())
  await dispatch(getProfileDetails(uniqueURL))
  return res;
}
// export const updateProfile = (data) => async (dispatch, getstate) => {
//   const { language,industry,day,fromTime,toTime,info,url } =data
//   console.log(industry,info,"industry")
//   console.log(url,"urls")
//   let details={
//   "workingHours":{
//     "to":toTime,
//     "From":fromTime
//   }

//   }
//   industry.length>0?details["servicesOffered"]=industry:null
//   language.length>0?details["languagesSupported"]=language:null
//   day.length>0?details["workingDays"]=day:null
//   //Area.length>0?details["placeOfService"]=Area:null
//  // info[0]?.aboutCompany?details["aboutUs"]=info[0].aboutCompany:null
//   info[0]?.founded?details["foundedIn"]=info[0].founded:null
//   info[0]?.address?details["address"]=info[0].address:null
//   info[0]?.city?details["headquarterIn"]=info[0]?.city:null
//   info[0]?.city?details["industry"]=info[0]?.aboutCompany:null
//   noOfEmployees?details["companySize"]=info[0]?.noOfEmployees:null


//   if(url!="")
//   {
//     console.log('>>>>>>>>>>>>>')
//     details["uniqueUrl"]=url
//   }

//   console.log(details,"details")


//   const res = await NetworkOps.put(ServiceEnum.editProfile,details)
//   console.log(res,"res")
//   if(res.status===true)
//   {
//   localStorage.setItem('uniqueUrl',res.data.uniqueUrl);
//   await dispatch(getProfileDetails())
// } 
//   return res;

// }
export const updateProfile = (data) => async (dispatch, getstate) => {
  console.log(data,"data")
  const { language, industry, day,time, fromTime, toTime, info, url, workingArea } = data
  let details = {
    "workWeek":time

  }
  if (industry.length > 0)
    details["servicesOffered"] = industry;

  if (language.length > 0)
    details["languagesSupported"] = language;

  if (day.length > 0)
    details["workingDays"] = day;

  if (info?.founded)
    details["foundedIn"] = info.founded;

      if(info?.aboutUs)
      details["aboutUs"]=info.aboutUs;
        //Area.length>0?details["placeOfService"]=Area:null
       // info[0]?.aboutCompany?details["aboutUs"]=info[0].aboutCompany:null
      if(info?.address)
       details["address"]=info.address

      if(info?.yourMotto)
        details["tagLine"]=info?.yourMotto
       
       if( info?.headquater)
       details["headquarterIn"]=info?.headquater
       
       if(info?.CompanySize)
       details["companySize"]=info?.CompanySize

       if(workingArea.length>0)
       details["placeOfService"]=workingArea
        
      if(info?.url)
      {
        details["uniqueUrl"]=info?.url
      }
      const res = await NetworkOps.put(ServiceEnum.editProfile,details)
     console.log(res,"res")
      if(res.status===true)
      {
      localStorage.setItem('uniqueUrl',res.data.uniqueUrl);
      const  uniqueURL  = localStorage.getItem('uniqueUrl')
      await dispatch(getProfileDetails(uniqueURL))
    } 
      return res;
}


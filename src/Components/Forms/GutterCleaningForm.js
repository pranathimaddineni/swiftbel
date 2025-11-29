import { TimeList } from "@/utils/DataList"
import { Button, Form } from "react-bootstrap"
import styled from "styled-components"
import moment from 'moment';
import { useRouter } from "next/router";
import { useState } from "react";
import { Calendar } from "react-calendar";
import Autocomplete from 'react-google-autocomplete';
import Image from "next/image";
import Fadingcircles from '../../../public/assets/faded.gif';
import { carpetcleaning } from "@/store/Actions/User.action";
import { useDispatch } from "react-redux";

function GutterCleaningForm(){
let router = useRouter();
let dispatch = useDispatch();
const mainAddress = router?.query?.address;
const [isloading, setIsloading] = useState(false)
const [datecalendar, setDatecalendar] = useState(false);
const [focusedname, setFocusedname] = useState(false)
const handlefocusing = (name) => {
    setFocusedname(true)
}

const [values,setValues]=useState({
date:moment(new Date()).format('DD MMM YYYY'),
time:'8:00 AM',
address:mainAddress,
floorsInHouse:1,
approxSizeInSqFt:"500 to 1,200 "
})
const stairnumbers = ['0','1', '2', '3', '4','5','6','7','8','9','10']

const [errors, setErrors] = useState(
    {
        "address": false,
    })
    const isValid = () => {
        if (!(values.address && values.address.length > 0 || values?.address!==undefined)) {
            setErrors({ ...errors, address: true })
            setTimeout(() => {
                setErrors({ ...errors, address: false })
            }, 3000);
            return false
        }
        else if (!(values.date && values.date.length > 0)) {
            return false
        }
        else if (!(values.time && values.time.length > 0)) {
            return false
        }
        else
            return true
    }
    const handledate = () => {
        if (datecalendar === false) {
            setDatecalendar(true)
        }
        else
            setDatecalendar(false)
    }
    console.log(values,'valuuus')
    const handlechange = (name) => (event, e) => {
        let value =
            name === 'floorsInHouse' ? parseInt(event.target.value) :
                name === 'date' ? moment(event).format('DD MMM YYYY') :
                name === 'typeofHouse' ? event.target.id :
                event.target.value
        if (name === 'date') {
            setDatecalendar(false)
        }
        setValues({ ...values, [name]: value })
    }
    const onPlaceSelected = (place) => {
        const funaddress = place.formatted_address
        setValues({...values,address:funaddress})
    }
    const handleSubmit = async()=>{
        let res
        if(isValid()){
         setIsloading(true)
         res = await dispatch(carpetcleaning(values,1,10));
         if(res.status===true){
            router.push({pathname:'/carpetcleaning/getPrice',query:{...values,price:res?.data}})
         }
         else if(res.status===false){
            toast.error(res.message);
         }
         else if(res.status===true&&res.message!=='Success'){
            toast.info(res.message);
         }
         setIsloading(false)
         localStorage.setItem('values', JSON.stringify(res?.finalData))
         localStorage.setItem('data', JSON.stringify(res?.data))
         setIsloading(false)
        }
    }
return(
    <Main>
              <Placing >
                    <Dateandtime className='d-flex mb-3'>
                        <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                            Date
                            <p className="datetext">
                                {values?.date ? values?.date : 'Select date'}
                            </p>
                        </Dates>
                        <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                            <div className='substyle'>
                                Preferred time
                                <Time aria-label="Floating label select example" onChange={handlechange('time')}>
                                    <option>{values?.time ? values?.time : 'Select time'}</option>
                                    {TimeList.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>{item}</option>
                                        )
                                    })}

                                </Time>
                            </div>
                        </DetailsDrop>
                    </Dateandtime>
                </Placing>
             <Placing>
             <Details className={errors?.address ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing()}>
                            <div className='subdiv'>
                            {focusedname===true||values?.address?.length > 0 ? 'Address' : ''}
                                <Place
                                    apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                    types={['address', '(cities)', '(regions)']}
                                    options={{
                                        types: ["geocode", "establishment"],
                                        componentRestrictions: {
                                            country: 'ca'
                                        }
                                    }}
                                    placeholder='Enter your Address'
                                    onPlaceSelected={onPlaceSelected}
                                    className={focusedname===true||values?.address?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                    defaultValue={values?.address}
                                />
                            </div>
                        </Details>
                        {datecalendar === true ?
                    <CalendarStyle style={{ zIndex: 10000 }} className='p-3 d-flex justify-content-center'>
                        <Calendar className='react-calendar' onChange={handlechange('date')}
                            minDate={new window.Date()}
                        />
                    </CalendarStyle> : ''}
             <Details className={errors?.rooms ? 'd-flex justify-content-between error' : 'd-flex justify-content-between'}>
                        <Innerdiv className=' justify-content-between' >
                            <div>
                                Number of bedrooms
                                <NoOfRoom aria-label="Floating label select example" onChange={handlechange('additionalRoom')} defaultValue={values?.additionalRoom}>
                                    {/* <option>{values?.additionalRoom ? values?.additionalRoom : 'Select number of rooms'}</option> */}
                                    {roomsnumbers.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>{item}</option>
                                        )
                                    })}

                                </NoOfRoom>
                            </div>
                        </Innerdiv>
                    </Details>
             </Placing>
             <Placing>
<Details onClick={() => handlebool('size')} className={errors?.size ? ' error d-flex justify-content-between' : 'd-flex justify-content-between'}>
    <Innerdiv className='d-flex justify-content-between'>
        <div>
            Approx. size in square feet
            <Text>{values.approxSizeInSqFt}</Text>
        </div>
        <div>
            <Img src={Bool.size === true ? uparrow : downarrow} />
        </div>
    </Innerdiv>
</Details>
{Bool.size === true ?
    <DetailsOptions className='mt-1'>
        {SizeOptions?.map((item, index) => {
            return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
        })}
    </DetailsOptions>
    : ''}
             <Details className={errors?.floors ? 'd-flex justify-content-between error' : 'd-flex justify-content-between'}>
                        <Innerdiv className=' justify-content-between' >
                            <div>
                                Number of Floors
                                <NoOfRoom aria-label="Floating label select example" onChange={handlechange('floorsInHouse')} defaultValue={values?.floorsInHouse} >
                                    {/* <option>{values?.numberofStair ? values?.numberofStair : 'Select number of stairs'}</option> */}
                                    {stairnumbers.map((item, index) => {
                                        return (
                                            <option value={item} key={index}>{item}</option>
                                        )
                                    })}

                                </NoOfRoom>
                            </div>
                        </Innerdiv>
                    </Details>

             </Placing>
                <Actions onClick={()=>handleSubmit()}
                        className={isloading?'blackbackground':'whitebackground'}
                        variant='dark' >
                        {isloading ?
                            <Loaderstyle>
                            <Image className="loadingimg" src={Fadingcircles} alt='loading.....' /></Loaderstyle>
                            : "Calculate your price"
                        }
                </Actions>
    </Main>
)
}
export default GutterCleaningForm

const Main = styled.div`
display:inline;
background:white;
padding:20px;
border-radius:8px;
margin-right:10px;
@media (min-width: 260px) and (max-width: 969px){
   margin-left:45px;
  }
`
const DetailsOptions = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
padding-bottom:5px;
z-index:10000;
position:absolute;
background:#fff;
width:200px;
margin-top:-15px;
.subdiv{
padding-left:12px;
padding-top:6px;
}
padding-left:12px;
padding-top:15px;
.maintext{
    &:hover {
        color: #D81159;
    }
}
`
const Placing = styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
  }
  .error{
    border:3px solid red;
    }
`
const Loaderstyle=styled.div`
align-self:center;
justify-content:center;
width: 100%;
.loadingimg{
width: 8%;
height:auto;
align-self:center;
object-fit:cover;
}
`
const Actions = styled(Button)`
width:96%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
.blackbackground{
background-color:#DDDDDD;
}
.whitebackground{
background-color:#000;
}
@media (min-width: 260px) and (max-width: 969px){
    margin-left:0px;
    width:330px;
 }
`
const Dates = styled.div`
width:258px;
margin-right:-25px;
border-radius:8px;
border:1px solid lightgray;
padding-left:10px;
padding-top:6px;
height:58px;
fontWeight:500;
color:#787373 ;
font-size:12px;
font-family:Inter;
.datetext{
color:black;
font-size:16px;
}
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`
const DetailsDrop = styled.div`
border-radius:8px;
border:1px solid lightgray;
height:58px;
background:white;
background-color:white;
@media (min-width: 260px) and (max-width: 820px){
    width:57%;
}
.substyle{
padding-left:12px;
padding-top:7px;
color:black;
font-size:12px;
font-family:Inter;
color:#787373;
}
`
const Time = styled(Form.Select)`
color:gray;
border-radius:8px;
font-family:Inter;
width:258px;
color:black;
border:none;
font-size:16px;
margin-top:-13px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`
const Dateandtime=styled.div`
border-radius: 8px;
border:1px solid #F3F3F3;
@media (min-width: 260px) and (max-width: 820px){
    width:95.7%;
}
`
const CalendarStyle = styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:-70px;
width:300px;
position:absolute;
`
const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
width:240px;
padding-bottom:5px;
padding-top:2px;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
  }
.focused{
color:Black;
margin-bottom:5px;
font-size:16px;
padding-bottom:0px;
}
.focusing{
color:#787373;
margin-top:3px;
padding-left:-12px;
font-family:Inter;
padding-bottom:0px;
}
.subdiv{
padding-left:12px;
padding-top:5px;
}

`
const Place = styled(Autocomplete)`
height:32px;
width:230px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
margin-top:-7px;
font-size:16px;
font-family:Inter;
font-weight:500;
color:black;
&::placeholder {
  font:Inter;
  font-size:16px;
  color:gray;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
`
const Innerdiv = styled.div`
padding-left:12px;
padding-right:15px;
padding-top:6px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
width: 240px;
`
const NoOfRoom = styled(Form.Select)`
color:gray;
border-radius:8px;
font-family:Inter;
width: 235px;
color:black;
border:none;
font-size:16px;
margin-top:-13px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
@media (min-width: 360px) and (max-width: 820px){
width:333px;
}
`
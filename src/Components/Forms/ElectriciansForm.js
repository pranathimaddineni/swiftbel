import { TimeList } from "@/utils/DataList"
import { Button, Form } from "react-bootstrap"
import styled from "styled-components"
import moment from 'moment';
import { useRouter } from "next/router";
import { useState } from "react";
import { Calendar } from "react-calendar";
import Autocomplete from 'react-google-autocomplete';
import Image from "next/image";
import condocard from '../../../public/assets/Condocard.png';
import housecard from '../../../public/assets/Housecard.png';
import townhouse from '../../../public/assets/Townhousecard.png';
import Fadingcircles from '../../../public/assets/faded.gif';
import servicecallimg from '../../../public/assets/servicecall.png';
import emergencycallimg from '../../../public/assets/emergencycall.png';
import { electricians } from "@/store/Actions/User.action";
import { useDispatch } from "react-redux";

function ElectriciansForm(){
let router = useRouter();
let dispatch = useDispatch();
const mainAddress = router?.query?.address;
const [isloading, setIsloading] = useState(false)
const [datecalendar, setDatecalendar] = useState(false);
const [focusedname, setFocusedname] = useState(false)
const handlefocusing = (name) => {
    setFocusedname(true)
}
const houseoptions= [
    { name: 'House', img: housecard },
    { name: 'Townhouse', img: townhouse },
    { name: 'Condo', img: condocard }
    ]
const servicecalloptions= [
{ name: 'Service call', img: servicecallimg },
{ name: 'Emergency call', img: emergencycallimg },
]
const [values,setValues]=useState({
date:moment(new Date()).format('DD MMM YYYY'),
time:'8:00 AM',
address:mainAddress,
typeofHouse:'House',
typeOfCall:"Service call",
})

const [errors, setErrors] = useState(
    {
        "address": false,
        "problems":false
    })
    const[val,setVal]=useState([])
    function removeElement(arr,element){
        let index=-1
        for(let i in arr){
            if(arr[i]===element){
               index=i
               break
            }
        }
        arr.splice(index,1)
    }
    const isValid = () => {
        if (!(values.address && values.address.length > 0 || values?.address!==undefined)) {
            setErrors({ ...errors, address: true })
            setTimeout(() => {
                setErrors({ ...errors, address: false })
            }, 3000);
            return false
        }
        else if (!(values.typeofHouse && values.typeofHouse.length > 0)) {
            return false
        }
        else if (!(values.typeOfCall && values.typeOfCall.length > 0)) {
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
    console.log(values,'valuuusplum')
    const handlechange = (name) => (event, e) => {
        let value =
                name === 'date' ? moment(event).format('DD MMM YYYY') :
                name === 'typeofHouse' || name ==='typeOfCall' ? event.target.id :
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
         res = await dispatch(electricians(values,1,10));
         if(res.status===true){
            router.push({pathname:'/electricians/getPrice',query:{...values,price:res?.data?.finalPrice,extrahour:res?.data?.secondHour}})
         }
         else if(res.status===false){
            //toast.error(res.message);
         }
         else if(res.status===true&&res.message!=='Success'){
           // toast.info(res.message);
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
             </Placing>
             {datecalendar === true ?
                    <CalendarStyle style={{ zIndex: 10000 }} className='p-3 d-flex justify-content-center'>
                        <Calendar className='react-calendar' onChange={handlechange('date')}
                            minDate={new window.Date()}
                        />
                    </CalendarStyle> : ''}
                    <Placing className="d-flex" >
                    {
                        houseoptions?.map((item, index) =>
                            <HouseContainer style={{ backgroundColor: item.name === values.typeofHouse ? "#F7F5FA" : null,borderColor:item.name===values.typeofHouse?'#957DBD':null }} id={item.name} key={index} onClick={handlechange('typeofHouse')}>
                                < p id={item.name} key={index} className='text'>{item.name}</p>
                                <HouseImage id={item.name} key={index} className='cardImg' src={item.img} />
                            </HouseContainer>
                        )
                    }

                </Placing>
                <Inputhead>Select the type of service you like to book : </Inputhead>

                <Placing className="d-flex" >
                    {
                        servicecalloptions?.map((item, index) =>
                            <HouseContainer style={{ backgroundColor: item.name === values.typeOfCall ? "#F7F5FA" : null,borderColor:item.name===values.typeOfCall?'#957DBD':null }} id={item.name} key={index} onClick={handlechange('typeOfCall')}>
                                <p id={item.name} key={index} className='text'>{item.name}</p>
                                <HouseImage id={item.name} key={index} className='cardImg' src={item.img} />
                            </HouseContainer>
                        )
                    }

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
export default ElectriciansForm

const Main = styled.div`
display:inline;
background:white;
padding:20px;
border-radius:8px;
margin-right:10px;
@media (min-width: 260px) and (max-width: 969px){
    margin-left:40px;
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
const Inputhead=styled.p`
font-family:Inter;
font-size:16px;
font-weight:500;
.subtext{
color:#D81159;
font-size:18px;
font-weight:500;
font-family:Inter;

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
padding-top:5px;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
  }
.focused{
color:Black;
margin-bottom:5px;
font-size:16px;
}
.focusing{
color:#787373;
margin-top:3px;
padding-left:-12px;
font-family:Inter;
}
.subdiv{
padding-left:12px;
padding-top:2px;
}

`
const Place = styled(Autocomplete)`
height:32px;
width:230px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
margin-top:-6px;
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
const HouseContainer = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
display:flex;
flex-direction:column;
align-self:center;
align-items:center;
width:154px;
cursor:pointer;
@media (min-width: 260px) and (max-width: 969px){
    width:100px;
  }
.text{
    margin-bottom:5px;
    margin-top:5px;
    font-family:Inter;
font-style: normal;
font-weight: 400;
color: #000;
}
.cardImg{
    height:44px;
    margin-bottom:10px;
}
`
const HouseImage = styled(Image)`
height:44px;
width:auto;
margin-bottom:10px;
`
const ServicImage = styled(Image)`
background:#fff;
width:154px;
height:100%;
cursor:pointer;
margin-bottom:15px;
margin-right:15px;
border-radius:8px;
border:1px solid #D0CECE;
@media (min-width: 260px) and (max-width: 969px){
    width:160px;
    height:auto;
  }
`

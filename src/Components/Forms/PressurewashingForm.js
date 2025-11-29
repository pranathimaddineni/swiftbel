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
import uparrow from '../../../public/assets/open.png';
import downarrow from '../../../public/assets/close.png';
import { pressurewashing } from "@/store/Actions/User.action";
import { useDispatch } from "react-redux";

function PressurewashingForm(){
let router = useRouter();
let dispatch = useDispatch();
const mainAddress = router?.query?.address;
const [isloading, setIsloading] = useState(false)
const [datecalendar, setDatecalendar] = useState(false);
const [focusedname, setFocusedname] = useState(false)
const[val,setVal]=useState(['Driveway'])
const [length,setLength]=useState(val?.length);
const [multivalues]=useState(['Driveway'])
const handlefocusing = () => {
    setFocusedname(true)
}
const houseoptions= [
    { name: 'House', img: housecard },
    { name: 'Townhouse', img: townhouse },
    { name: 'Condo', img: condocard }
    ]
    const areaoptions= [
        { name: 'Driveway'},
        { name: 'Patio'},
        { name: 'House wash'}
        ]
    const [Bool,setBool]=useState({
        "areas":true,
        "size":false,
      })
const [values,setValues]=useState({
date:moment(new Date()).format('DD MMM YYYY'),
time:'8:00 AM',
address:mainAddress,
typeofHouse:'House',
areasToBeCleaned:["Driveway"],
approxSizeInSqFt:'0 to 1,000',
})
const handlebool=(type)=>{
    if(type==='areas'){
    setBool({...Bool,areas:!Bool.areas,size:false})
    }
    else if(type==='size'){
      setBool({...Bool,size:!Bool.size,areas:false})
    }
  }
const [errors, setErrors] = useState(
    {
        "address": false,
        "problems":false,
        "areas":false
    })
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
      const handlemultiselect=(name)=>(event)=>{
        if(event.target.id===name&&!val.includes(name)){
        multivalues.push(name)
        setLength(length+1)
        }
        else if(event.target.id===name&&val.includes(name)){
        removeElement(multivalues,name)
        setLength(length-1)
        }
        setVal(multivalues)
        setValues({...values,'areasToBeCleaned':multivalues})
        }
        const SizeOptions=['0 to 1,000','1,001 to 1,500','1,501 to 2,000','2,001 to 2,500','2,501 to 3,000']
        console.log(values,'lengt')

    const isValid = () => {
        if (!(values.address && values.address.length > 0 || values?.address!==undefined)) {
            setErrors({ ...errors, address: true })
            setTimeout(() => {
                setErrors({ ...errors, address: false })
            }, 3000);
            return false
        }
        else if(!(values.areasToBeCleaned&&values.areasToBeCleaned.length>0)){
            setErrors({...errors,areas:true})
            setTimeout(() => {
              setErrors({...errors,areas:false})
            }, 3000);
            return false
        }
        else if (!(values.typeofHouse && values.typeofHouse.length > 0)) {
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
    const handlechange=(name)=>(event,e)=>{
        let value=name==='date'? moment(event).format('DD MMM YYYY')
        :name === 'typeofHouse'? event.target.id
        :name==='areasToBeCleaned'||name==='approxSizeInSqFt'?event.target.id
        :event.target.value
        if(name==='date'){
          setDatecalendar(false)
        }
        setValues({...values,[name]:value})
        if(name==='areasToBeCleaned'){
          setBool({...Bool,areas:!Bool.areas})
          }
          else if(name==='approxSizeInSqFt'){
            setBool({...Bool,size:!Bool.size})
          }
        }
    const onPlaceSelected = (place) => {
        const funaddress = place.formatted_address
        setValues({...values,address:funaddress})
    }
    const handleSubmit = async()=>{
        let res
        if(isValid()){
         setIsloading(true)
         res = await dispatch(pressurewashing(values,1,10));
         if(res.status===true){
            router.push({pathname:'/pressurewashing/getPrice',query:{...values,price:res?.data}})
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
    console.log(values,'values')
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
                        <div>
<Details onClick={() => handlebool('size')} className={errors?.size ? ' error d-flex justify-content-between' : 'd-flex justify-content-between'}>
    <Innerdiv className='d-flex justify-content-between'>
        <div>
        Approx. area for washing (Sq.Ft)
            <Text>{values.approxSizeInSqFt}</Text>
        </div>
        <div>
            <Img src={Bool.size === true ? uparrow : downarrow} />
        </div>
    </Innerdiv>
</Details>
{Bool.size === true ?
    <DetailsOptions >
        {SizeOptions?.map((item, index) => {
            return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
        })}
    </DetailsOptions>
    : ''}
    </div>
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
                <Inputhead>Which area(s) of your property do you need presssure washed?</Inputhead>
                 {errors?.areas ?
                 <p className="errormsg">Select at least one area</p>
                :''}
                <Placing className="d-flex mb-4">
                {
                        areaoptions?.map((item, index) =>
                        <Details2 onClick={handlemultiselect(item.name)} style={{ backgroundColor: val.includes(item.name) ? "#F7F5FA" : null,borderColor: val.includes(item.name) ?'#957DBD':null }} id={item.name} key={index} >
                        <Text id={item.name} key={index}>{item.name}</Text>
                            </Details2>
                        )
                    }
                </Placing>

{/* <Form.Group className="mb-3">
    <Details onClick={()=>handlebool('areas')} className={errors?.areas ?' error':
    ''}>
          <Innerdiv className='d-flex justify-content-between'>
            <div>
            Areas to be cleaned
              <Text>Selected({length})</Text>
              </div>
              <div>
                <Img src={Bool.areas===true?uparrow:downarrow}/>
              </div>
              </Innerdiv>
      </Details>
      </Form.Group>
      {Bool.areas===true?
      <Details className='d-flex justify-content-between mt-1 p-3'>
      <Form>
          <Form.Check
            inline
            label="Driveway"
            name="Driveway"
            type='checkbox'
            value="Driveway"
            id="Driveway"
            checked={val.includes('Driveway')}
            onClick={handlemultiselect('Driveway')}
          />
          <br/>
          <Form.Check
            inline
            label="Patio"
            name="Patio"
            type='checkbox'
            value="Patio"
            checked={val.includes('Patio')}
            onClick={handlemultiselect('Patio')}
            id="Patio"
          />
          <br/>
          <Form.Check
            inline
            label="House wash"
            name="House Wash"
            type='checkbox'
            value="House Wash"
            checked={val.includes('House Wash')}
            onClick={handlemultiselect('House Wash')}
            id="House Wash"
          />
    </Form>
        </Details>
        :''} */}

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
export default PressurewashingForm

const Main = styled.div`
display:inline;
background:white;
padding:20px;
border-radius:8px;
margin-right:10px;
.subtext{
color:#787878;
margin-top:-15px;
}
.errormsg{
font-size:14px;
color:red;
font-family:Roobert-medium;
}
@media (min-width: 260px) and (max-width: 969px){
    margin-left:40px;
 }
`
const Img = styled(Image)`
height:7px;
width:11px;
margin-top:15px;
cursor:pointer;
@media (min-width: 260px) and (max-width: 820px){
  margin-right:10px;
  margin-top:20px;
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
margin-top:-5px;
padding-left:12px;
padding-top:15px;
.maintext{
    &:hover {
        color: #D81159;
    }
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
const Details2 = styled.div`
margin-right:10px;
margin-bottom:10px;
border-radius:8px;
border:1px solid lightgray;
background:#fff;
font-family:Inter;
font-size:12px;
width:150px;
text-align:center;
padding-top:15px;
@media (min-width: 260px) and (max-width: 969px){
    width:105px;
    font-size:10px;
  }
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
padding-top:7px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
width: 240px;
@media (min-width: 260px) and (max-width: 820px){
  width:340px;
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

const Text=styled.p`
font-size:14px;
font-family: Roobert-medium;
font-style: normal;
font-weight: 400;
cursor:pointer;
color:black;
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

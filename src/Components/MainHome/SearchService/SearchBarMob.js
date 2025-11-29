import { useEffect, useRef, useState } from 'react';
import { Form, FormSelect, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import Calendar from 'react-calendar';
import { Searchservice } from '@/store/Actions/User.action';
import Fadingcircles from '../../../../public/assets/faded.gif';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext } from 'react';
import { ServiceContext } from '@/pages';
import { TimeList } from '@/utils/DataList';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();
function SearchBarMob() {
    let router = useRouter()
    let services= useContext(ServiceContext)
   let ourservices = services?.data?.map((x)=>x.data)
   let service = ourservices[0]
  const placeRef=useRef(null)
  const destPlaceRef=useRef(null)
  const hours=TimeList;
  const dispatch = useDispatch();
  const [servicename, setServicename] = useState('Moving');
  const [addressfull, setAddressfull] = useState('');
  const [destination, setDestination] = useState('');
  const [values, setValues] = useState({})
  const [isExpend, setIsExpend] = useState("Service")
  const handleShow = () => setIsExpend("Service");
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [timedetails, setTimedetails] = useState({ 'ampm': 'AM' })
  const [isLoading,setIsLoading]=useState(false)
  const OpenedServices=[
    'Pressure Washing',
    'Moving',
    'Carpet Cleaning',
    'Electricians',
     'Plumbers',
    //'Cleaning'
  ]
  useEffect(()=>{
if(isExpend==='address')
{
  //placeRef.current.focus()
  //destPlaceRef.current.focus()
}
  },[isExpend])
  const handlesubmit = async () => {
    let res;
    setIsLoading(true)
    res = await dispatch(Searchservice(values));
    if (res.status === false) {
      console.log(res.message)
      setIsLoading(false)
    }
    else if (res.status === true && res.message === 'Success') {
      router.push({pathname:`/${servicename.toLowerCase().split(" ").join("")||'moving'}`,
       query: {
        //data: res.data,
        //name: servicename||'Moving',
        address: addressfull,
        //date: date,
        //time: time,
        destination:destination
      } })
      setIsLoading(false)
    }
  }

  const DateFormat = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const FinalDate = day + '-' + month + '-' + year;
    return FinalDate;
  };

  const handleData = (name) => (e) => {
    if (date && name === 'hours') {
      setIsExpend("address");
    }
    if (name === 'date') {
      setDate(DateFormat(new Date(e)))
      setValues({ ...values, 'date': DateFormat(new Date(e)) })
    }
    else if (name === 'hours') {
      setTimedetails({ ...timedetails, 'hour': e.target.value })
    }
    else if (name === 'ampm') {

      setTimedetails({ ...timedetails, 'ampm': e.target?.innerHTML })
    }

  }
  const clearAll = () => {
    setIsExpend('Service')
    setTime('')
    setDate('')
    setAddressfull('')
    setDestination('')
    setValues({ ...values, 'placeOfService': '' })
  }
  const handlesearch = (name) => {
    setServicename(decodeURI(name))
    setValues({ ...values, 'servicesOffered': name })
    setIsExpend("Date")
  }
  let onPlaceSelected = (place) => {
    const address = place.formatted_address
    setAddressfull(address)
    setValues({ ...values, 'placeOfService': address })
  }
  let onPlaceSelectedDest = (place) => {
    const address = place.formatted_address
    setDestination(address)
  }
  useEffect(() => {
    if (timedetails?.hour?.length > 0 && timedetails?.ampm?.length > 0) {
      setTime(timedetails?.hour )
      setValues({ ...values, 'time': timedetails?.hour  })
    }
  }, [timedetails])
  return (
    <>
      <div style={{ overflowY: 'scroll', marginBottom: '100px' }}>
        <div style={{ marginBottom: '50px' }} className='p-4'>
          <Form>
            {isExpend === "Service" ? <ExpendService>
              <div className='servicecontainer'>
                <h4 className='pt-3 p-3 '>Choose Service</h4>
                <div className='d-flex' style={{ display: 'flex', overflow: 'auto' }}>
                  {service?.map((x, index) => {
                    return (
                      OpenedServices?.includes(x.name)?
                      <div className=' img-wrapper' style={{ cursor: OpenedServices?.includes(x.name) ? 'pointer' : '' }} key={index} onClick={() => OpenedServices?.includes(x.name) ?handlesearch(x.name):''} >
                        <Serviceimg className={OpenedServices?.includes(x.name) ? '' : 'serviceimg'}  width={240} height={240} style={{ border: servicename === x.name ? '2px solid #D81159' : '', borderRadius: '10px' }} src={x.url} alt='url' />
                        {OpenedServices?.includes(x.name)? '' : <h5 class="overlay">Coming Soon</h5>}
                      </div>
                      :''
                    )
                  })}
                </div>
              </div>
            </ExpendService> :
              <Sel onClick={handleShow}>
                <div className='d-flex justify-content-between'>
                  <p style={{ paddingLeft: '15px', paddingTop: '10px' }}>Home Service</p>
                  {servicename ?
                    <p style={{ color: 'black', paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px' }}>{servicename}</p>
                    :
                    <p style={{ paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px', }}>Select Service</p>
                  }
                </div>
              </Sel>}
            <br />
            {isExpend === "Date" ? <ExpendService>
            <h4 className='pt-3 p-3 '>Date & Time</h4>
              <CalendarStyle>
                <div className='p-3 d-flex justify-content-center'>
                  <Calendar className='react-calendar'
                    minDate={new window.Date()}
                    onChange={handleData('date')}
                  />
                </div>
                <br />
                <div className='d-flex justify-content-center' >
                  <b className='mt-2'>Time :</b> &nbsp;&nbsp;&nbsp;
                  <FormSelect placeholder='hours' onChange={handleData('hours')} style={{ borderRadius: '30px', width: '140px' }}>
                    <option  value=''>Hours</option>
                    {hours.map((x, index) => {
                      return (
                        <option value={x} key={index}>{x}</option>
                      )
                    })}
                  </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br />
              </CalendarStyle>
            </ExpendService> :
              <Sel onClick={() => { setIsExpend("Date") }}>
                <div className='d-flex justify-content-between'>
                  <p style={{ paddingLeft: '15px', paddingTop: '10px' }}>Date & Time</p>
                  {date && time ?
                    <p style={{ color: 'black', paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px' }}>{`${date}, ${time}`} </p>
                    :
                    <p style={{ color: 'black', paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px' }}>Select Date & Time</p>
                  }
                </div>
              </Sel>
            }
            {isExpend === "address"?
            <PlaceContainer>
            <p style={{ color: 'black', paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px' }}> { servicename==='Moving'?'Starting Address':'Address'} </p>
            <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: {
                  country: ['ca']
                }
              }}
              ref={placeRef}
              onBlur={isExpend === "address"?true:false}
              onFocus={true}
              placeholder={ servicename==='Moving' ? 'Where are you moving from ?':'Where would you like the service'}
              onPlaceSelected={onPlaceSelected}
              defaultValue={values?.placeOfService ? values?.placeOfService : ''}
              className="form-control form-control-default"
            />
      {servicename==='Moving'?
      <>
      <hr/>
            <p style={{ color: 'black', paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px' }}>{'Destination Address'} </p>
            <Place
              apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
              types={['address', '(cities)', '(regions)']}
              options={{
                types: ["geocode", "establishment"],
                componentRestrictions: {
                  country: ['ca']
                }
              }}
              ref={destPlaceRef}
              onBlur={isExpend === "address"?true:false}
              onFocus={true}
              placeholder='Where are you moving to ?'
              onPlaceSelected={onPlaceSelectedDest}
              defaultValue={destination ? destination : ''}
              className="form-control form-control-default"
            />
            </>
            :''}
            </PlaceContainer>:
            <Sel style={{marginTop:'15px', height:destination ? '65px':'50px'}} onClick={() => { setIsExpend("address") }}>
              <p style={{ padding: '10px'}}>{destination && servicename==='Moving'? <>{addressfull.slice(0,35)} <span style={{color:'#D81159',fontWeight:600}}> To </span>  {destination.slice(0,35)}</>: addressfull||'Where would you like the service'}</p>
          </Sel>
            }
            <br />
          </Form>
        </div>
        <Footer>
          <div className='d-flex justify-content-center ' >
            <div style={{ width: '150px', marginTop: '20px', textDecorationLine: 'underline', cursor: 'pointer' }} onClick={() => clearAll()} >
              Clear all
            </div>
            &nbsp; &nbsp;
            <Button variant="secondary" style={{ width: '150px', height: '50px', borderRadius: '8px', backgroundColor: '#D81159' }} onClick={() => handlesubmit()}>
              Search
            </Button>
          </div>
        </Footer>
        <LoaderModal
        centered
        show={isLoading}>
        <Image style={{width: '100%', alignSelf: 'center',objectFit:'cover',height:'100%'}} src={Fadingcircles} alt='loading.....' />
        </LoaderModal>
      </div>
    </>
  )
}
export default SearchBarMob

const LoaderModal =styled(Modal)`
.modal-backdrop{
  opacity:0.5 !important;
}
.modal-content {
  background:transparent;
  border:0px solid transparent;

}
`
const ExpendService = styled.div`
border-radius:15px;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
background:#fff;
.header:{
  font-size:18px;
  font-weight:500px;
  font:Roobert-medium;
  margin-top:20px;
}
.text{

}
.img-wrapper:hover .serviceimg{
  -webkit-filter:  grayscale(100%) brightness(51%);
}
.overlay{
  display:none;
}
.img-wrapper{
  position: relative;
}
.img-wrapper:hover  .overlay {
  display:block;
  margin-top:-110px;
  color:white;
  -webkit-filter: blur(0px);
  filter: blur(0px);
  position:absolute;
  margin-left:32px;
  font-family:Inter;
  font-size:14px;
  text-align:center;
  @media (min-width: 260px) and (max-width: 800px){
  font-size:12px;
  margin-top:-100px;
}
`
const Sel = styled.div`
border-radius:15px;
padding-bottom:10px;
background-color:#fff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
height:50px;
color:gray;
`

const Place = styled(Autocomplete)`
height:40px;
margin-left:5px;
width:98%;
margin-top:-20px;
border-radius:15px;
border:0px solid #fff;
&::placeholder {
  font-family: Inter;
  color:gray;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background: #fff;
  }
`
const PlaceContainer=styled.div`
margin-top:25px;
border-radius:15px;
border:0px solid #190F0F;
background:#fff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

`
const Serviceimg = styled(Image)`
    height: 150px;
    margin-left:15px;
    margin-bottom:15px;
    width:120px;
    display:flex;
`
const CalendarStyle = styled.div`

`

// const Toggle = styled.div`
// background-color:#F3F3F3;
// border-radius:26px;
// .activeclass{
//   color:#ffffff;
//   background-color:#000;
//   font-size:15;
//   border-radius:26px;
//   width:47px;
//   text-align:center;
//   padding-top:10px;
// }
// .class{
//   color:#000;
//   background-color:#F3F3F3;
//   font-size:15;
//   border-radius:26px;
//   width:47px;
//   text-align:center;
//   padding-top:10px;
// }
// `
const Footer = styled.div`
display:flex;
position: fixed;
bottom: 0;
height:100px;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
background-color:#fff;
width:100%;
justify-content:center;
align-items:center;
@media (min-width: 746px) and (max-width: 10000px){
    display:none;
}
`
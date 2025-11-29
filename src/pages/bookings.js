import { useState } from 'react'
import { Button, FormSelect, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Logo from '../../public/assets/companyprofilelogo.png'
import box from '../../public/assets/notifyBox.png'
import { useDispatch } from 'react-redux';
import { Calendar } from 'react-calendar';
import moment from 'moment'
import {useRouter } from 'next/router'
import { TimeList } from '@/utils/DataList'
import { acceptJob } from '@/store/Actions/Dashboard.actions'
import { LOCAL_HOST, ServiceEnum } from '@/services/Urls'
import Image from 'next/image'

function bookings(props){
    let router=useRouter()
    const [modifyshow, setModifyshow] = useState(false);
    const [cancelshow, setCancelshow] = useState(false);
    const[refno,setRefno]=useState('')
    const [proposeval,setProposeval]=useState({
        "referenceNo": '',
        "bookingStatus": "confirmed",
        "newTime": "",
        "newDate": " "
      })
    const handlepropose=(name)=>(e)=>{
        let value = name==='newDate'?moment(e).format('LL')
        :e.target.value
        setProposeval({...proposeval,[name]:value})
        }
        const proposesubmit= async()=>{
            let res= await dispatch(acceptJob({...proposeval,"referenceNo":refno},'bookings'))
            if(res.message==='Success'){
                handlemodify()
            }
            return res
         }
         const Confirmcancel=async()=>{
            let res=  await dispatch(acceptJob
                ({
                "referenceNo": refno,
                "bookingStatus": "Declined"
               }
               ,'bookings')
              )
              if(res.status===true){
                handlecancelclose()
                        }
            return res
         }
    const dispatch = useDispatch()
const handlemodify=()=>{
    setModifyshow(false)
}
const handlecancelclose=()=>{
    setCancelshow(false)
}
    const Bookings=props?.bookings?.upcomingJobs

const handlemodifybooking=(id)=>{
setModifyshow(true)
setRefno(id)
}
const handlecancel=(id)=>{
    setCancelshow(true)
     setRefno(id)
    }
    console.log(Bookings,'booking')

    const canceldetails = Bookings?.filter(x=>x.referenceNo===refno)
return(
    <div className='main'>
    <Main>
        <Head>
    <Heading>Bookings</Heading>
    {/* <ButtonGroup>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p /> */}
      {
      Bookings?.length>1?
      Bookings?.map((item,index)=>{
        return(
            <>
            <Segment key={index}>
       <div className='d-flex justify-content-between pb-3'>
<div className='d-flex justify-content-around'>
<div>
<Img src={item?.serviceProvider?.logoImage||Logo}/>
</div>
<div>
    <Title>{item?.serviceProvider?.businessName}</Title>
    <Subtitle>{item?.serviceProvider?.tagLine}</Subtitle>
</div>
</div>
<Statusdiv className='d-flex'>
<Dot className={item?.confirmation==='Accepted'?'confirmed':item?.confirmation==='Declined'?'declined':'pending'}></Dot><Status className={item?.confirmation==='Accepted'?'confirmedtext':item?.confirmation==='Declined'?'declinedtext':'pendingtext'}>{item?.confirmation}</Status>
</Statusdiv>
       </div>
       <br/>
       <div className='d-flex justify-content-between'>
<div className='d-flex justify-content-between'>
<Data>
    <p className='head'>Date</p>
    <p className='text'>{item?.date}</p>
</Data>

<Data >
<p className='head'>Time</p>
<p className='text'>{item?.time}</p>
</Data>
<Data >
<p className='head'>Location</p>
<p className='text'>{item?.location}</p>
</Data>
<Data >
<p className='head'>Service</p>
<p className='text'>{item?.service}</p>
</Data>
</div>
<div className='d-flex'>
<Modify variant={'light'}
onClick={()=>handlemodifybooking(item?.referenceNo)}
>Modify booking</Modify>
<Modify variant={'dark'} onClick={()=>handlecancel(item?.referenceNo)}>Cancel</Modify>
 </div>
       </div>
       <Modal
               size='md'
               show={modifyshow}
               dialogClassName="auth-verification-modal"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               onHide={handlemodify}
             >
               <Header closeButton={handlemodify}>
                 Modify booking
               </Header>
               <Modal.Body>
               <CalendarStyle>
    <div className='p-3 d-flex justify-content-center'>
    <Calendar
    className='react-calendar' minDate={new Date()}
    onChange={handlepropose('newDate')}
    pages={2} />
    </div>
    <br/>
    <br/>
          </CalendarStyle>
                      </Modal.Body>
            <br/>
        <Modal.Footer>
        <div className='d-flex justify-content-between'>
      <FormSelect
      placeholder='time'
      onChange={handlepropose('newTime')}
    style={{borderRadius:'8px',width:'140px'}}>
      <option value=''>Time</option>
      {TimeList.map((x,index)=>{
        return(
          <option value={x} key={index}>{x}</option>
        )
      })}
      </FormSelect>&nbsp;&nbsp;&nbsp;&nbsp;
       <Modify variant='dark'
        onClick={proposesubmit}
        >
         Modify
         </Modify>
      <Modify variant='light' onClick={handlemodify} >
         Cancel
         </Modify>
         &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      </Modal.Footer>
            </Modal>


            <Modal
        size='md'
        show={cancelshow}
        dialogClassName="auth-verification-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handlecancelclose}
      >
        <Header closeButton={handlecancelclose}>
          Confirm changes
        </Header>
          <CancelHead>You want to Cancel booking “{item?.service}” service.
Please confirm the action.</CancelHead>
<br/>
 <CancelData className='d-flex justify-content-around'>
<div>
<div className='data'>
<p className='head'>Date</p>
<p className='text'>{canceldetails[0]?.date}</p>
</div>
<div className='data'>
<p className='head'>Location</p>
<p className='text' style={{width:'150px'}}>{canceldetails[0]?.location}</p>
</div>
</div>
<div>
<div className='data'>
<p className='head'>Time</p>
<p className='text'>{canceldetails[0]?.time}</p>
</div>
<div className='data'>
<p className='head'>Service</p>
<p className='text'>{canceldetails[0]?.service}</p>
</div>
</div>
</CancelData>
<br/>
<br/>
<div className='d-flex justify-content-around'>
<Cancel variant={'light'}
 onClick={handlecancelclose}>Cancel</Cancel>
<Cancel variant={'dark'} onClick={Confirmcancel}>Confirm</Cancel>
 </div>
        <Modal.Footer className='d-flex justify-content-center'>
            <Foot className='d-flex justify-content-center'>
            <p>Сonditions of refunds</p>&nbsp;<p className='terms'>Payment Terms of Service</p>
            </Foot>
        </Modal.Footer>
      </Modal>
      </Segment>
      </>
       )
    })
:
<>
<Headings className='mt-5'>
     <p className='d-flex justify-content-center nobook'>No Bookings Yet </p>
     <div className='d-flex justify-content-center'><Boximage src={box}/></div>
    <div className='d-flex justify-content-center mt-3'><StartBooking onClick={()=>router.push('/')} variant='dark'>Start Booking</StartBooking></div>
  </Headings>
<br/><br/><br/>
  </>
}
</Head>
            </Main>
    {/* <div style={{position: Bookings?.length>3?'':'absolute',bottom: 0,width: '100%', height: '90px'}}>
   <MainFooter/>
   </div> */}
   </div>
)
}
export default bookings

bookings.getInitialProps = async () => {
    const res = await fetch(`${LOCAL_HOST}/${ServiceEnum.getBookings}`)
    const json = await res.json()
    return { bookings: json }
  }


const Main = styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 1311px){
margin-left:10px;
margin-right:10px;
}
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:24px;
padding-bottom:24px;
padding-left:0px;
padding-right:0px;
}
`
const Foot=styled.div`
font-size: 14px;
font:Inter;
padding-top:30px;
.terms{
    color:#D81159;
}
`
const Cancel=styled(Button)`
border-radius: 8px;
padding: 5px 45px;
font-size: 14px;
width:208px;
height 44px;
border:1px solid #F3F3F3;
`

const CancelData=styled.div`
padding-right:70px;
margin-left:-30px;
.head{
    color: #787373;
    font-size: 12px;
    font:Inter;
}
.text{
    font-size: 16px;
    margin-top:-14px;
    font:Inter;
}
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size: 36px;
width:200px;
.nobook{
font-size: 22px;
}
`
const Headings = styled.div`
font-family:Roobert-medium;
font-size: 36px;
border:1px solid lightgray;
padding:30px;
border-radius:8px;
width:300px;
.nobook{
font-size: 22px;
}
`
const Title = styled.p`
font-family:Roobert-medium;
font-size: 24px;
margin-left:10px;
`
const Subtitle = styled.p`
font:Inter;
font-size: 14px;
margin-top:-18px;
margin-left:10px;
`
const Boximage=styled(Image)`
height:100px;
width:100px;
`
const StartBooking=styled(Button)`
width: 206px;
height: 44px;
border-radius: 8px;
font-size: 14px;
`
const Segment = styled(Row)`
background: #FAFAFA;
background-color:#FAFAFA;
border: 1px solid #F3F3F3;
border-radius: 8px;
margin-left:3px;
padding:20px;
margin-top:30px;
@media (min-width: 1500px) and (max-width: 9999px)
{
    width :1400px;
}
`
const Header = styled(Modal.Header)
  `
font-weight: 400;
font-size: 16px;
display: flex;
letter-spacing: 0.01em;
font-family:Open Sans;
color: #787373;
justify-content:center;
text-align:center;
margin-left:10px;
margin-right:10px;
`

const Img = styled(Image)`
border-radius:50%;
height:80px;
width:80px;
margin-right:15px;
`
const Dot = styled.div`
border-radius:50%;
height:7px;
width:7px;
`
const Status=styled.p`
font-size: 14px;
margin-top:-7px;
margin-left:5px;
font:Inter;
`
const Data=styled.div`
padding-right:60px;
.head{
    color: #787373;
    font-size: 12px;
    font:Inter;
}
.text{
    font-size: 16px;
    margin-top:-14px;
    font:Inter;
}

`
const Modify = styled(Button)`
font-family:Roobert-medium;
width:131px;
height:44px;
border:1px solid #F3F3F3;
font-size: 14px;
margin-right:10px;
border-radius: 8px;
`

const Statusdiv=styled.div`
.pending{
background:#FFCF23;
background-color:#FFCF23;
}
.confirmed{
background:#59D811;
background-color:#59D811;
}
.declined{
    background:red;
    background-color:red;
}
.pendingtext{
color:#FFCF23;
}
.confirmedtext{
color:#59D811;
}
.declinedtext{
    color:red;
}
`
const CalendarStyle=styled.div`
.react-calendar {
    max-width: 90%;
    background: white;
    border: 1px solid white;
    height:260px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding-bottom:15px;
    padding-top:0;
  }
`
const CancelHead=styled.p`
font-family: Roobert Medium;
font-size: 18px;
font-weight: 500;
padding-left:28px;
padding-top:40px;
`
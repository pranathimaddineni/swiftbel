
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Button } from 'react-bootstrap'
import back from '../../../../public/assets/back.png'
import tick from '../../../../public/assets/tick.png';
import styled from 'styled-components'
import Image from 'next/image';
import Geocode from "react-geocode";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import HomeCarousel from '@/Components/MainHome/HomeCarousel';
import BookingandManaging from '@/Components/MainHome/BookingandManaging';
import SwiftbelExperince from '@/Components/MainHome/SwiftbelExperience';
import TrackingMap from '@/Components/googlemap/TrackingMap';
import MovingForm from '@/Components/Forms/MovingForm';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
const calculation=()=>{
    const location=useRouter()
    const address = location?.query?.fromAddress;
    const toAddress = location?.query?.toAddress;
    const [index, setIndex] = useState(false)
    const [callback, setCallback] = useState(false)
    const [value, setValue] = useState('')
    const [activeTruck, setActiveTruck] = useState(false)
    const [activeForm, setActiveForm] = useState(false)
    const [from, setFrom] = useState({  })
    const [to, setTo] = useState({ })
    const datadetail = useSelector(state => state.customerReducer);
    useEffect(()=>{
        Geocode.fromAddress(`${address}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setFrom({ lat: lat, lng: lng })
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
        Geocode.fromAddress(`${toAddress}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setTo({ lat: lat, lng: lng })
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
    },[])
    
    const controlIndex=()=>{
        if(activeForm===true)
        {
            setActiveForm(false)
            setActiveTruck(false)
        }
        else if(activeTruck===true)
        {
            setActiveTruck(false)
        }
       else if(index===true){
        setIndex(false)
        }
        else {
       location.push({pathname:'/moving'})
        }
    }
    return(
        <>
         <Head>
<title>Estimate moving price | Book movers online | SwiftBel</title>
<meta name='description' content='Book affordable high qulaity movers with upfront prices with the push of a button'/>
<link rel="icon" href="/favicon.ico" />
</Head>
      <div className="main">
        <MainSegment>
                <Mains>
                    <Heading>
                    <div className="bg-image">
                    <Segment>
                    <br />
                            <Headdiv >
                            <Text onClick={() => controlIndex()} variant='light' className={index === false ? 'displaynone' : ''}><Backicon src={back} /></Text>
                            <div>
                            <h2 className={index === false ? 'displaynone' : ''}>{activeForm === true ? "Here is your estimate" : "Get an estimate"}</h2>
                            <p className='subheader'>{activeForm&&datadetail?.finaldata?.approxSizeInSqFt?`Based on ${datadetail?.finaldata?.numberOfRooms} bedrooms and ${datadetail?.finaldata?.approxSizeInSqFt} sq. ft. your estimate is $${datadetail?.service[0]?.finalPrice}`: "Tell us a bit about your move and we'll help you calculate the cost"}</p>
                            </div>
                            <div></div>
                            </Headdiv >
                            <MovingMain >
                                        <Form className={index === false ? 'displaynone' : ''}>
                                            {callback ? <BookingConfirmed>
                                                <div style={{ justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                                                    <Image alt='' src={tick} style={{ width: '80px', height: '80px' }} />
                                                </div>
                                                <SuccesfulHeader>Estimation request sent</SuccesfulHeader>
                                                <div style={{ paddingLeft: '20px' }}>
                                                    <Text1 style={{ textAlign: 'center' }}>We will call you back shortly!</Text1>
                                                    <Viewpricing variant="dark" size='md' className='reservenow' onClick={() => {
                                                        setCallback(false)
                                                        setActiveForm(false)
                                                        setActiveTruck(false)
                                                        }} >Done</Viewpricing>
                                                </div>
                                            </BookingConfirmed> :
                                               <MovingForm
                                               fromAddres={(item) => {
                                                   Geocode.fromAddress(`${item}`).then(
                                                       (response) => {
                                                           const { lat, lng } = response.results[0].geometry.location;
                                                           setFrom({ lat: lat, lng: lng })
                                                           console.log(lat, lng);
                                                       },
                                                       (error) => {
                                                           console.error(error);
                                                       }
                                                   );
                                               }}
                                               toAddres={(item) => {
                                                   Geocode.fromAddress(`${item}`).then(
                                                       (response) => {
                                                           const { lat, lng } = response.results[0].geometry.location;
                                                           setTo({ lat: lat, lng: lng })
                                                           console.log(lat, lng);
                                                       },
                                                       (error) => {
                                                           console.error(error);
                                                       }
                                                   );
                                               }}
                                               handleSubmit={(item) => {
                                                  // setIndex(true)
                                                  // setEstimaterd(item)
                                               }}
                                               value={(activeForm,activeTruck)=>{
                                                   setActiveForm(activeForm);
                                                   setActiveTruck(activeTruck);
                                               }}
                                               activeTruck={activeTruck}
                                               activeForm={activeForm}
                                               requestCallback={() => setCallback(true)}
                                               setIndex={(item) => setValue(item)}
                                           />}
                                        </Form>
                                        <MapForm >
                                            <TrackingMap
                                                fromAddres={from}
                                                toAddres={to}
                                                center={{
                                                    lat: 49.246292,
                                                    lng: -123.116226
                                                }}
                                                zoom={11}
                                            />
                                        </MapForm>
                                    </MovingMain>
                    </Segment>
                    <div className={index === false ? 'displaynone' : 'displaying'}>
                            <br />
                            <SwiftbelExperince />
                            <br />
                            <BookingandManaging
                                type="moving"
                            />
                            <br />
                           <HomeCarousel/>
                        </div>
                        </div>
                        </Heading>
                        </Mains>
                        </MainSegment>
        </div>
        </>
    )
    }
export default calculation;
const MainSegment = styled.div`
background:#FBFBFB;
@media (min-width: 260px) and (max-width: 820px){
    background:#fff;
overflow-x: hidden;
}
`
const Headdiv = styled.div`
display:flex;
justify-content:space-between;
`
const Form = styled.div`
margin-right:30px;
.estimatedprice{
color:black ;
font-size:24px;
font-family: 'Roobert-medium';
font-style: normal;
font-weight: 500;
margin-left:10px;
@media (min-width: 260px) and (max-width: 1115px){
  margin-top:5px;
  margin-bottom-20px;
 overflow-y:hidden;
 overflow-x:hidden;
  }
}
@media (min-width: 260px) and (max-width: 820px){
    padding-left:25px;
    padding-right:25px;
    margin-right:0px;
    margin-left:0px;
    overflow-y:hidden;
    overflow-x:hidden;
}
`
const MapForm = styled.div`
width:80%;
padding:20px;
background-color:#fff;
@media (min-width: 260px) and (max-width: 920px){
 display:none
}
`
const CardContainer = styled.div`
display:flex;
position:relative;
overflow-y:auto;
flex-grow: 1;
max-height:480px;
justify-content:center;
@media (min-width: 260px) and (max-width: 820px){
    max-height:100%;
}
`
const Viewpricing = styled(Button)`
height:44px;
width:92%;
font-family: Roobert-medium;
font-weight: 500;
font-size: 14px;
letter-spacing: 0.02em;
margin-bottom:1rem;
border-radius:8px;
@media (min-width: 260px) and (max-width: 767px){
    width:80%;
margin-bottom:10px;
margin-left:10px;
            }
            @media (min-width: 768px) and (max-width: 1360px){
                margin-top:0px;
            margin-bottom:20px;
            margin-left:0px;
            }
`
const MovingMain = styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 820px){
    display:inline;

    }
`
const BookingConfirmed = styled.div`
background:white;
border-radius: 8px;
margin-left:20px;
padding-bottom:20px;
padding-top:20px;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
width:500px;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
    margin-bottom:20px;
    margin-right:0px;
}
`
const Mains = styled.div`
display:flex;
justify-content:center;
.displaynone{
@media (min-width: 260px) and (max-width: 820px){

overflow-x: hidden;
}
}
`
const Text = styled(Button)`
font-size: 16px;
cursor:pointer;
border-radius:50%;
color:#787373;
font-weight: 400;
height:40px;
width:40px;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:15px;
    padding-right:15px;
    margin-left:10px;
    display:none;
}
`
const Text1 = styled.p`
font-size: 16px;
text-align:center;
color:#787373;
font-weight: 400;

`
const Backicon = styled(Image)`
height:20px;
width:20px;
margin-top:-3px;
margin-left:-4px;
@media (min-width: 260px) and (max-width: 969px){
margin-left:-8px;
 }
`
const Segment = styled.div`

h2{
    text-align:center;
    @media (min-width: 260px) and (max-width: 820px){
        padding-left:25px;
        padding-right:15px;
        text-align:start;
        
    }
}
.subheader{
    font-size: 16px;
cursor:pointer;
color:#787373;
font-weight: 400;
text-align:center;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:25px;
    padding-right:15px;
    text-align:start;
    
}
}
@media (min-width: 821px) and (max-width: 1500px)
{
    padding-left:70px;
    padding-right:70px;
} 

`
const Heading = styled.div`
width:100%;
@media (min-width: 1501px) and (max-width: 9099px){
    width:1312px;
    padding-left:20px;
}
@media (min-width: 820px) and (max-width: 1310px){
    padding-left:40px;
    paddin-right:40px
}
`

const SuccesfulHeader = styled.h1
    `
font-weight: 600;
font-size: 2rem;
line-height: 120%;
display: flex;
align-items: center;
letter-spacing: 0.01em;
justify-content:center;
display:flex;
margin-top: 2.25rem;
margin-bottom: 1.25rem;
`



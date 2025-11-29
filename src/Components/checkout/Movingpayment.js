import React, { useEffect, useState } from 'react'
import { Button, Offcanvas, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Localmoving from '../../../public/assets/Localmove.png'
import MoverOnly from '../../../public/assets/Mover.png';
import condocard from '../../../public/assets/Condocard.png';
import housecard from '../../../public/assets/Housecard.png';
import townhouse from '../../../public/assets/Townhousecard.png';
import info from '../../../public/assets/info.png';
import Truck from '../../../public/assets/Truck.png';
import { useRouter } from 'next/router'
import Image from 'next/image'

function Movingpayment(props) {
    const [det, setDet] = useState(props?.det||{})
    const [detdata, setDetData] = useState(props?.detdata||{})
  const [type, setType] = useState(props?.type||'')
  const [likeList, setLikeList] = useState('')
  const [truckInfo, setTruckInfo] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const dispatch = useDispatch()
    let locate = useRouter();
    const valu = locate?.query
    const urlFinalPrice = valu?.price
    const urlEstimatedPrice=valu?.estimatedPrice
    console.log(detdata,type,"detailsssssssss")
    const trucktypes = [
        { title: '1  Mover with a truck ', value: 95, label: 'oneMoverWithTruck', img: Truck, },
        { title: '2 Movers with 3 ton truck ', value: 129, label: 'twoMoverthreeTonTruck', img: Truck },
        { title: '3 Movers with 5 ton truck ', value: 169,  img: Truck },
        { title: '4 Movers with 5 ton truck ', value: 210, label: 'fourMoverFiveTonTruck', img: Truck }
    ]
    const listing=[
        {
            heading:'Travel time to start point (Fixed)',
        data:`1 hour ($${detdata?.travelCharge})`
        },
        {
        heading:'Loading time',
        data:`${Math.ceil(detdata?.loadingTime)} hours ($${Math.ceil(detdata?.loadingCharge)})`
        },
        {
            heading:'Travel between locations:',
        data:`${detdata?.estimatedTime} ($${detdata?.travelBetweenCharge})`,
        className:'diff'
        },
        {
        heading:'Unloading time',
        data:`${Math.ceil(detdata?.unloadingTime)} hours ($${Math.ceil(detdata?.unloadingCharge)})`
        },
      
        ]
        const renderLikeList = () => {
            return <div  style={{marginLeft:'-20px',paddingLeft:'10px',paddingRight:'12px'}}>
                <p className='headinglist'>Estimate Breakdown</p>
                <hr/>
                <p>Estimated cost is based on information provided & similar moves in your area. Actual cost is determined by hourly rate. </p>
                <br/>
                {listing?.map((item,index)=>{return(
                    <div className='d-flex justify-content-between p-1' key={index}>
                    <div >
                        <p className={item?.className==='diff'?'heads':'heads'}>{item?.heading}</p>
                    </div>
                    <div >
                        <p className={item?.className==='diff'?'heads text-end':'heads text-end'}>{item?.data}</p>
                    </div>
                </div>
                )})}
                <hr/>
                <div className='d-flex justify-content-between p-2 mt-3'>
                <p className='heads3'>Total</p>
                <p className='heads3 text-end'> ${detdata?.finalPrice}</p>
                </div>
            </div>
        }
        const renderTruckList = () =>{
            return(
                <div className="likes__list" >
                     <div className='d-flex justify-content-between p-2 mt-4'>
                <p className='heads2'>Given the characteristics of your home, including its type, size, and location, we have determined that this truck size and number of movers will minimize the cost of your move.</p>
                </div>
                </div>
            )
        }
        const handleLeave = () => {
            return setLikeList('')
        }
        const handleHover = () => {
            return setLikeList(renderLikeList())
        }
        const handleTruckinfoLeave = () => {
            return setTruckInfo('')
        }
        const handleTruckinfoHover = () => {
            return setTruckInfo(renderTruckList())
        }
    useEffect(()=>{
        setDet(props?.det)
        setDetData(props?.detdata)
        setType(props?.type)
      },[props?.det,props?.detdata,props?.type])

      const FormDetails = () => {
        return (
            <>

                <TruckContainer >

                   { det?.typeofHouse? <Row>
                        <FormSegment  >
                            <WebView>
                                <div style={{ backgroundColor:det?.typeofHouse?'#FDF5F0':'#FDF3F7' }}>
                                    <div className='d-flex justify-content-center'>
                                        <Image className='cardImg' src={det?.typeofHouse?Localmoving:MoverOnly} />
                                    </div>
                                </div>
                                <hr style={{marginTop:'0px'}}/>
                                <p style={{ textAlign: 'center', marginBottom: '5px', marginTop: '-10px' }}>Type of moving</p>
                                <p className='cardText'>{det?.typeofHouse?"Local Moving":"Movers Only"}</p>
                            </WebView>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>Type of moving</p>
                                        <p className='cardText'>{det?.typeofHouse?"Local Moving":"Movers Only"}</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: det?.typeofHouse?'#FDF5F0':'#FDF3F7'  }}>
                                        <div>
                                            <Image className='cardImg' src={det?.typeofHouse?Localmoving:MoverOnly} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                        <FormSegment  >
                            <WebView>
                                <div style={{ backgroundColor:'#F7F5FA' }}>
                                    <div className='d-flex justify-content-center'>
                                        <Image className='cardImg' src={det?.typeofHouse === "House" ? housecard : det?.typeofHouse === "Condo" ? condocard : townhouse} />
                                    </div>
                                </div>
                                <hr style={{marginTop:'0px'}}/>
                                <p style={{ textAlign: 'center', marginBottom: '5px',  marginTop: '-10px' }}>Type of house</p>
                                <p className='cardText'>{det?.typeofHouse}</p>
                            </WebView>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>Type of house</p>
                                        <p className='cardText'>{det?.typeofHouse}</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: "#F7F5FA" }}>
                                        <div >
                                            <Image className='cardImg' src={det?.typeofHouse === "House" ? housecard : det?.typeofHouse === "Condo" ? condocard : townhouse} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                        <FormSegment  >
                            <WebView>
                            <div className="likes__relavance" onMouseOver={handleTruckinfoHover} onMouseLeave={handleTruckinfoLeave}>
                                <div style={{backgroundColor:'#F5F9F3'}}>
                                    <div className='d-flex justify-content-center'>
                                        <Image className='cardImg' src={Truck} />
                                    </div>
                                </div>
                                <hr style={{marginTop:'0px'}}/>
                                <div className='d-flex justify-content-center'>
                                <p style={{ textAlign: 'center', marginBottom: '5px',  marginTop: '-10px'  }}>${det?.movers} per hour</p>
                                <Image style={{width:'18px',height:'18px',marginTop:'-10px',padding:'3px'}}  src={info}/>
                                </div>

                                <p className='cardText'>{
                                    trucktypes.map((item) => {
                                        if (item.value === det?.movers)
                                            return item.title
                                    })
                                }</p>
                                 {truckInfo}
                        </div>
                            </WebView>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>${det?.movers} per hour</p>
                                        <p className='cardText'>{
                                            trucktypes.map((item) => {
                                                if (item.value === det?.movers)
                                                    return item.title
                                            })
                                        }</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: "#F5F9F3" }}>
                                        <div >
                                            <Image style={{ marginLeft: '10px' }} className='cardImg' src={Truck} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                    </Row>:null }
                    <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Pick up address
                            <Text>{det?.fromAddress}</Text>
                        </div>
                    </FormInnerdiv>
                  {det?.typeofHouse?  <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Destination
                            <Text>{det?.toAddress}</Text>
                        </div>
                    </FormInnerdiv>:null}
                    <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Date and Time
                            <Text>{det?.date}, {det?.time}</Text>
                        </div>
                    </FormInnerdiv>
                    <hr style={{ marginLeft: '-10px', marginRight: '10px' }} />
                 
                    <FormInnerdiv>
   
           {det?.typeofHouse?     <div style={{ marginRight: '20px' }} className='d-flex justify-content-between'>
                    <p>Hourly price</p>
                    <h4>${detdata?.estimatedHourlyPrice} per hour</h4>

                </div>:<div style={{ marginRight: '20px' }} className='d-flex justify-content-between'>
                    <p>Estimated price</p>
                    <h4>${detdata?.finalPrice}</h4>

                </div>}
            </FormInnerdiv>

                    
                    {det?.typeofHouse?renderLikeList():null}
           
                </TruckContainer>
            </>
        )
    }
    return (
        <>
            <MainContainer>
                <br />
                <WebView>
                    {FormDetails()}
                </WebView>
                <MobileView>
                    <ViewDetails onClick={() => setShowSearch(true)} variant="dark" size="lg">
                        View Details
                    </ViewDetails>
                    <MobileModal show={showSearch} onHide={() => setShowSearch(false)} placement={'bottom'} style={{ height: '650px' }}>
                        <Offcanvas.Header closeButton={() => setShowSearch(false)}>
                            <Offcanvas.Title>Details</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div style={{ overflow: 'scroll' }}>
                            {FormDetails()}
                        </div>
                    </MobileModal>
                </MobileView>
            </MainContainer>
        </>
    )
}
export default Movingpayment
const TruckContainer = styled.div`
width:535px;
margin-left:12px;
margin-right:8px;
.likes__relavance{
    position:relative;
    padding:0 0px;
  }
  .likes__list{
    position:absolute;
    box-sizing: border-box;
    left:20%;
    width:400px;
    z-index:999;
    background:white;
    padding-left:16px;
    padding-right:16px;
    border-radius:8px;
    box-shadow: 0 0 1px 1px #787373;
    filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
    @media (min-width: 260px) and (max-width: 969px){
        left:0%;
        right:30%;
        width:300px;
      }
  }
  .heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
}
.headinglist{
color:black;
font-size:20px;

margin-top:15px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
.heads3{
    font-family: Inter;
    font-weight: 500;
    font-size: 18px;
    color: black;
    margin-top:-10px;
}
h4{
    font-size:20px;
}
@media (min-width: 260px) and (max-width: 969px){
    padding-left:30px;
    width:450px;
  }
`
const FormSegment = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
width:170px;
padding:0px;
padding-bottom:0px;
display:flex;
flex-direction:column;
align-self:center;
.cardImg{
    width:auto;
    height:54px;
    margin-top:20px;
    margin-bottom:20px;
}
.cardText{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 12px;
margin-bottom:5px;
text-align: center;
color: #190F0F;
}
@media (min-width: 260px) and (max-width: 969px){
    width:330px;
    .cardImg{
        
        margin-left:20px;
    }
    .cardText{
        text-align: start; 
    }
  }


`
const FormPlacing = styled.div`
display:flex;
.text{
    padding:20px;  
}
.imgcontain{
    display:flex;
    justify-content:center;
}
@media (min-width: 260px) and (max-width: 969px){
    display:flex;
    .imgcontain{
       
        width:100px; 
    }
  }
`

const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`

const FormInnerdiv = styled.div`
padding-top:6px;
margin-left:-7px;
margin-bottom:20px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
h4{
    color:#000;
}
@media (min-width: 260px) and (max-width: 820px){
    width: 350px;
}
`

const MobileDetails = styled.div`
font-family:Inter;
font-style: normal;
font-weight: 500;
font-size: 14px;
color: #190F0F;
padding-top:5px;
`
const MainContainer = styled.div`
border-radius:12px;
border:1px solid #F3F3F3;
padding:15px;
background-color:#FFFFFF;
@media (min-width: 260px) and (max-width: 767px){
    margin-left:15px;
    padding:0px;
    border:0
}
`
const Text = styled.p`
color:black;
font-size: 16px;
font-family: Inter;
font-style: normal;
font-weight: 400;
@media (min-width: 260px) and (max-width: 820px){
    margin-top:5px;
    }

`

const ViewDetails = styled(Button)`
width:100%;
height:11%
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
font-family:Inter;
background-color:#F3F3F3;
background:#F3F3F3;
color:#000;
border:1px solid #000;
`


const MobileView = styled.div`

@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`
const WebView = styled.div`
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }

`
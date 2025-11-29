import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import americanExpress from '../../../public/assets/american-express.png';
import discover from '../../../public/assets/discover.png';
import visa from '../../../public/assets/visa.png';
import applepay from '../../../public/assets/apple-pay.png';
import googlepay from '../../../public/assets/google-pay.png';
import master from '../../../public/assets/mastercard.png';
import tick from '../../../public/assets/pinktick.png';
import list from '../../../public/assets/list.png';
import afterpay from '../../../public/assets/afterpay.png';
import afterpayblack from '../../../public/assets/afterpayblack.png';
import debit from '../../../public/assets/debit.png';
import creditCard from '../../../public/assets/credit-card.png';
//import App from '../paymentTest'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'
import Geocode from "react-geocode";
import { isAuthenticated } from '../../utils/Authentication'
import { useDispatch } from 'react-redux';
import { verifyEmailUser } from '@/store/Actions/Auth.action';
import SignupModal from '../Auth/SignupModal';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AfterpayClearpayForm from './AfterpayForm';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();


const stripePromise = loadStripe('pk_live_51KnIv3IP0V9hIrNScYkpMaRMBSzGwDekxHvEgBoXBo2iTlzOQ13rL927tddCs5JcnWMfVJeC6JJxRcrNtdKz70wY00DcDIUxhf');

function PaymentLeft(props) {
  let locate = useRouter();
  const [det, setDet] = useState(props?.det||{})
  const [detdata, setDetData] = useState(props?.detdata||{})
  const [position, setPosition] = useState({})
  const [type, setType] = useState(props?.type||'')
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [isEmailAvilable, setIsEmailAvlable] = useState(props?.isEmailAvilable||false);
  const [email, setEmail] = useState(props?.email||'')
  const [passwordmodal, setpassworModal] = useState(false)
  const [travelTime,setTravelTime]=useState('')
  const [travelCharge,setTravelCharge]=useState('')
  const valu =locate?.query
  const urlFinalPrice = valu?.price
  const urlEstimatedPrice=valu?.estimatedPrice
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch()

  useEffect(()=>{
    setDet(props?.det)
    setDetData(props?.detdata)
    setType(props?.type)
  },[props?.det,props?.detdata,props?.type])
  console.log(props?.det,props?.detdata,"VAJVDJVDJ")
  const verifyEmail = async (emails) => {
    const data={
      email: emails
    }
    const res = await dispatch(verifyEmailUser(data))
    if (res.status) {
      setIsEmailAvlable(true)
    }
  }
  useEffect(() => {
    init()
  }, [det?.fromAddress, det?.address])

  const paymentnav = () => {
    if (locate?.search) {
      !isEmailAvilable ? setLoginModalShow(true) : setpassworModal(true)
    }
    else if (!isAuthenticated()) {
      setSignUpModalShow(true)
      console.log('not authenticate')
    }
    else {
      navigate.push( {pathname:'/payment'})
      console.log('authenticate')
    }
  }

  //let finaldata = service?.filter(x => x.spId === spid)
  console.log(urlFinalPrice, urlEstimatedPrice,'finaldata')
  let navigate = useRouter()
  const init = async () => {
    // const res = await dispatch(getpaymentIntent(data));
    // console.log(res)
    // if (res.status === true) {
    //   setSecretKey(res.data?.client_secret)
    // }
  }
  let location = useRouter()

  const renderTravel=()=>{
    return(
      <div className="likes__list" >
      <div className='d-flex justify-content-between p-2 mt-4'>
 <p className='heads2'>The hourly rate begins when the movers reach your pickup address and continues until the truck is fully unloaded.</p>
 </div>
 </div>
    )
  }
  const renderTravelCharge=()=>{
    return(
      <div className="likes__list" >
      <div className='d-flex justify-content-between p-2 mt-4'>
 <p className='heads2'>Travel time is a standard fee for the journey from the moving company's office to your pickup address and back after drop-off.</p>
 </div>
 </div>
    )
  }
  const handleLeave = () => {
    return setTravelCharge('')
}
const handleHover = () => {
    return setTravelCharge(renderTravelCharge())
}
const handleTravelLeave = () => {
    return setTravelTime('')
}
const handleTravelHover = () => {
    return setTravelTime(renderTravel())
}

  return (
    <>
      <div style={{padding:'15px'}}>
      <InputWrapper>
        <div className='d-flex justify-content-between'>
        <div>
        <Headings >About your booking:</Headings>
        <div className='d-flex'>
        <Icon src={tick}/>
        <Subtext2>You won’t be charged anything to reserve.</Subtext2>
        </div>
        <div className='d-flex'>
        <Icon src={tick}/>
        <Subtext2>Free cancellation.</Subtext2>
        </div>
        <div className='d-flex'>
        <Icon src={tick}/>
        <Subtext2>We don't charge any additional fees.</Subtext2>
        </div>
        </div>
        <ListWrapper>
        <ListIcon src={list}/>
        </ListWrapper>
    </div>
    {detdata?.estimatedHourlyPrice?  <div className='d-flex justify-content-between '>
 <div className="likes__relavance" onMouseOver={handleHover} onMouseLeave={handleLeave}>
        <Subtext4> <u>Travel charges (fixed 1 hour)</u></Subtext4>
        {travelCharge}
        </div>
        <h7>{type === 'Moving' ? `$${detdata?.estimatedHourlyPrice?.toFixed(2)}` : detdata?.finalPrice?.toFixed(2)||urlFinalPrice}</h7>
      </div>:null}
     {detdata?.estimatedHourlyPrice? <div className='d-flex justify-content-between mt-1'>
      <div className="likes__relavance" onMouseOver={handleTravelHover} onMouseLeave={handleTravelLeave}>
        <Subtext4><u>Hourly rate (CAD)</u></Subtext4>
        {travelTime}
        </div>
        {/* <h4>${finaldata[0]?.finalPrice.toFixed(2)}</h4> */}
        <h7>{type === 'Moving' ? `$${detdata?.estimatedHourlyPrice?.toFixed(2)||urlEstimatedPrice}` : detdata?.finalPrice?.toFixed(2)||urlFinalPrice}</h7>
      </div>:null}
    </InputWrapper>
      <Headings className='mt-1'>Price Details</Headings>

      <div className='d-flex justify-content-between '>
        <Subtext3 className='mt-1'>Due now</Subtext3>
        {/* <h4>${finaldata[0]?.finalPrice.toFixed(2)}</h4> */}
        <h4>$0</h4>
      </div>
      <PayWrapper>
      </PayWrapper>
      <div className='d-flex justify-content-between mt-1'>
        <Subtext4>Payment options</Subtext4>
        <div className='d-flex'>
        <Paymenticon src={applepay} />
          <Paymenticon src={googlepay} />
          <Paymenticon src={visa} />
          <Paymenticon src={master} />
          <Paymenticon src={americanExpress} />
          <Paymenticon src={discover} />
        </div>
      </div>
      {isAuthenticated()? <Toggle className='d-flex'>
                    <div
                        className={index === 0 ? 'activeclass d-flex justify-content-center' : 'class d-flex justify-content-center'}
                    >
                      <Image style={{width:'30px',height:index === 0 ?'26px':'30px',padding:'5px',marginTop:index === 1 ?'-2px':'-1px'}} src={index === 0?debit: creditCard}/>
                        <p id='AM' onClick={() => setIndex(0)}>{"Debit card / Credit card"}</p>
                    </div>
                    <div onClick={() => setIndex(1)} className={index === 1 ? 'activeclass' : 'class'}
                    >
                      <Image  style={{width:'100px',height:'auto'}} src={index === 1?afterpayblack: afterpay}/>
                       
                    </div>
                </Toggle>:null}
      <div className="d-grid gap-2">
        {locate?.pathname === '/details' ?
          <>
            <br />
            <Subtext2>
              By selecting the button below, I agree to the SwiftBel Rules,
              <a style={{ color: '#EB873F',cursor:'pointer' }}
              href='https://www.swiftbel.com/help/legal/cancellation-and-refund-policy'
              rel="noreferrer"
              onClick={() => {
                window.analytics.track("Click cancellation and refund policy", {
                  above_continue_to_pay_button: 'cancellation and refund policy'
                })
              }} target='_blank'> Cancellation and Refund Policy</a> and <a style={{ color: '#EB873F',cursor:'pointer' }}
              href='https://www.swiftbel.com/help/legal/terms-of-service'
              rel="noreferrer" onClick={() => {
                window.analytics.track("Click terms of service")
              }} target='_blank'>Terms of Service</a>.
              If your job requires materials, your Service Provider will
              ask you to authorize those material costs and they will
              be added to the price you pay.
            </Subtext2>
            <Confirm variant="dark" size="lg"
              onClick={() => {
                // window.analytics.track("Click continue to pay", {
                //   color: '#D81159',
                //   hourly_price: type === 'Moving' ? `${detdata?.estimatedHourlyPrice?.toFixed(2)}/hour` : detdata?.finalPrice?.toFixed(2),
                //   deposit: 'CAD 50',
                //   "url": window.location?.pathname
                // });
                paymentnav()
              }}
            >
              Continue to pay
            </Confirm>
            <SignupModal
              email={email}
              signupModal={setSignUpModalShow}
              loginModal={setLoginModalShow}
              loginModalshow={loginModalShow}
              show={signUpModalShow}
              onHide={() => setSignUpModalShow(false)}
            />
          </>
          :
          <Elements stripe={stripePromise} >
           {index===0?<CheckoutForm
            finaldata={detdata}
            customerData={det}
            type={type}
            />: <AfterpayClearpayForm
              finaldata={detdata}
              customerData={det}
            />}
          </Elements>
        }

      </div>
      <br />
</div>
    </>
  )
}
export default PaymentLeft;
const ListWrapper=styled.div`
display:flex;
align-items:center;
margin-bottom:15px;
@media (min-width: 260px) and (max-width: 969px){
  display:none;
}
`
const PayWrapper=styled.div`

`
const ListIcon=styled(Image)`
width:auto;
height:70px;

`
const Icon=styled(Image)`
width:15px;
height:15px;
margin-right:5px;

`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
`
const Bighr = styled.hr`
background-color:lightgray;
background:lightgray;
border:1px solid lightgray
`

const Paymenticon = styled(Image)`
height:25px;
width:25px;
margin-right:5px;
margin-top:-3px;
`

const Subtext2 = styled.p`
font-size: 14px;
font-family:Inter;
color: #787373;
margin-top:-5px;
`
const Subtext3 = styled.p`
font-size:20px;
font-family:Inter;
`
const Subtext4 = styled.p`
font-size:14px;
font-family:Inter;
`
const Headings = styled.p`
font-size: 18px;
line-height: 14px;
font-family:Roobert-medium;
`

const Confirm = styled(Button)`
width:100%;
height:11%
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
font-family: Inter;
background-color:#D81159;
background:#D81159;
color:white;
border:1px solid #D81159;
`
const Toggle = styled.div`
background-color:#F3F3F3;
border-radius:8px;
cursor:pointer;
margin-top:15px;
margin-bottom:15px;
.activeclass{
  color:#ffffff;
  background-color:#000;
  font-size:15;
  border-radius:8px;
  width:50%;
  text-align:center;
  padding-top:13px;
}
.class{
  color:#000;
  background-color:#F3F3F3;
  font-size:15;
  border-radius:8px;
  width:50%;
  text-align:center;
  padding-top:13px;
}
p{
  font-weight:500;
}
@media (min-width: 260px) and (max-width: 969px){
  p{
    font-size:14px;
  }
}
`
const InputWrapper = styled.div`
border: 1px solid lightgray;
border-radius: 10px;
padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom:30px;

  .likes__list{
    position:absolute;
    box-sizing: border-box;
    right:20%;
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
  text-align:center;
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
`
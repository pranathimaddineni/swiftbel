import React, {useState, useEffect} from 'react'
import {useStripe} from '@stripe/react-stripe-js';
import { Button, Form, Modal, ModalBody ,Spinner} from 'react-bootstrap';
import { getAdvancepaymentIntent, getPatentValue, getpaymentIntent, paymentBooking } from '@/store/Actions/User.action';
import { useDispatch } from 'react-redux';
import countryList from 'react-select-country-list'
import arrowaddpost from '../../../public/assets/arrowAddPosts.png'
import tick from '../../../public/assets/tick.png'
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
const AfterpayClearpayForm = (props) => {
    const { finaldata,customerData } = props
  const stripe = useStripe();
const dispatch=useDispatch()
  // billing
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useRouter()
  const [error,setError]=useState('')
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('CA');
  const [modalShow, setModalShow] = useState(false)
  const options = useMemo(() => countryList().getData(), [])
  // shipping
  const [shippingName, setShippingName] = useState('');
  const [shippingLine1, setShippingLine1] = useState('');
  const [shippingLine2, setShippingLine2] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('CA');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        "paymentMethod":["card"],
        "serviceProviderId": finaldata?.spId,
      }
      let clientSecret=''
    // create payment intent on the server
    const res= await dispatch(getpaymentIntent(data));
    if (res.status === true) {
        clientSecret=res.data?.client_secret
     // setSecretKey(res.data?.client_secret)
    }
    else{
      //  addMessage(res.data.message);
      return;
    }
    //addMessage('PaymentIntent created!')
    // confirm payment on the client
    const {error: stripeError} = await stripe.confirmAfterpayClearpayPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
          email,
          address: {
            line1,
            line2,
            city,
            state,
            country,
            postal_code: postalCode,
          },
        },
      },
      shipping: {
        name: shippingName,
        address: {
          line1: shippingLine1,
          line2: shippingLine2,
          city: shippingCity,
          state: shippingState,
          country: shippingCountry,
          postal_code: shippingPostalCode,
        }
      },
      return_url: `${window.location.origin}/payment?return=true`
    })

    if(stripeError) {
    //  addMessage(stripeError.message);
    setError(stripeError.message)
      return;
    }
    else{
        const res1= await dispatch(paymentBooking(finaldata,customerData))
        setModalShow(true)
    }
  }

  return (
    <>
 <SucessfulModal
                show={modalShow}
                size='md'
                onHide={() => {
                    navigate.push({pathname:'/'})
                    setModalShow(false)
                }}
                centered
            >
                <Modal.Header style={{ height: "55px" }} closeButton={() => {
                    navigate.push({pathname:'/'})


                }} >
                    <Image src={arrowaddpost} alt='back' onClick={() => {
                        navigate.push({pathname:'/'})
                        setModalShow(false)

                    }}></Image>

                </Modal.Header>
                <SuccesfulModalBody style={{ alignItems: 'center' ,paddingTop:'40px',paddingBottom:'40px',}}>
                <div style={{justifyContent:'center',display:'flex'}}>
                    <Image alt='' src={tick} style={{ width: '80px', height: '80px' }} />
                    </div>

                    <SuccesfulHeader>Booking request sent</SuccesfulHeader>
                    <Text>We will send an email once the service provider confirms the booking</Text>
                    <Text>We strive to do this within <span style={{ color: '#E24F84' }}> 5 minutes </span> but sometimes it takes longer</Text>
                    </SuccesfulModalBody>
            </SucessfulModal >
      <form id="payment-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Billing</legend>
          <div className='d-flex justify-content-between '>
          <CardCvInputWrapper style={{ marginRight: '10px' }} >
          <Label htmlFor="name">
            Name
          </Label>

          <Input id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
        </CardCvInputWrapper>
        <CardCvInputWrapper>
          <Label htmlFor="email">
            Email
          </Label>
          <Input type="email" placeholder='Email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
         </CardCvInputWrapper>
         </div>
         <div className='d-flex justify-content-between '>
          <CardCvInputWrapper style={{ marginRight: '10px' }} >
          <Label htmlFor="line1">
            Line 1
          </Label>
          <Input id="line1" placeholder='Line1' value={line1} onChange={(e) => setLine1(e.target.value)} required />
          </CardCvInputWrapper>
          <CardCvInputWrapper>
          <Label htmlFor="line2">
            Line 2
          </Label>
          <Input id="line2" placeholder='Line2' value={line2} onChange={(e) => setLine2(e.target.value)} />
          </CardCvInputWrapper>
          </div>
          <div className='d-flex justify-content-between '>
          <CardCvInputWrapper style={{ marginRight: '10px' }}>
          <Label htmlFor="city">
            City
          </Label>
          <Input id="city" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
          </CardCvInputWrapper>
          <CardCvInputWrapper>
          <Label htmlFor="state">
            State
          </Label>
          <Input id="state" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
         </CardCvInputWrapper>
         </div>
         <div className='d-flex justify-content-between '>
          <CardCvInputWrapper style={{ marginRight: '10px' }}>
          <Label htmlFor="postal_code">
            Postal code
          </Label>
          <Input id="postal_code" placeholder='Postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
         </CardCvInputWrapper>
          <CardCvInputWrapper>
          <Label>Country</Label>
                    <Select value={country} onChange={(event) => setCountry(event.target.value)}>

                        {

                            options.map((item) =>
                                <option value={item.value}>{item.label}</option>
                            )
                        }
                    </Select>
          </CardCvInputWrapper>
          </div>
        </fieldset>

        <fieldset>
            <br/>
          <legend>Booking address</legend>
          <div className='d-flex justify-content-between '>
          <CardCvInputWrapper style={{ marginRight: '10px' }}>
          <Label htmlFor="shipping_name">
            Name
          </Label>
          <Input id="shipping_name" placeholder='Shipping name' value={shippingName} onChange={(e) => setShippingName(e.target.value)} required />
</CardCvInputWrapper>
<CardCvInputWrapper>
          <Label htmlFor="shipping_line1">
            Line 1
          </Label>
          <Input id="shipping_line1" placeholder='Shipping line1' value={shippingLine1} onChange={(e) => setShippingLine1(e.target.value)} required />
</CardCvInputWrapper>
</div>
<div className='d-flex justify-content-between '>
<CardCvInputWrapper style={{ marginRight: '10px' }} >
          <Label htmlFor="shipping_line2">
            Line 2
          </Label>
          <Input id="shipping_line2" placeholder='Shipping line2' value={shippingLine2} onChange={(e) => setShippingLine2(e.target.value)} />
</CardCvInputWrapper>
<CardCvInputWrapper>
          <Label htmlFor="shipping_city">
            City
          </Label>
          <Input id="shipping_city" placeholder='Shipping city' value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} />
</CardCvInputWrapper>
</div>
<div className='d-flex justify-content-between '>
<CardCvInputWrapper style={{ marginRight: '10px' }}>
          <Label htmlFor="shipping_state">
            State
          </Label>
          <Input id="shipping_state" placeholder='Shipping state' value={shippingState} onChange={(e) => setShippingState(e.target.value)} />
</CardCvInputWrapper>
<CardCvInputWrapper>
          <Label htmlFor="shipping_postal_code">
            Postal code
          </Label>
          <Input id="shipping_postal_code" placeholder='Shipping postal code'  value={shippingPostalCode} onChange={(e) => setShippingPostalCode(e.target.value)} />
</CardCvInputWrapper>
</div>
<CardInputWrapper>
<Label>Country</Label>
                    <Select value={country} onChange={(event) => setShippingCountry(event.target.value)}>

                        {

                            options.map((item) =>
                                <option value={item.value}>{item.label}</option>
                            )
                        }
                    </Select>
          </CardInputWrapper>
        </fieldset>
        <br />
        {error?<p style={{color:'#D81159',fontSize:'16px'}}>{'Invalid inputs'}</p>:null}
            <Subtext2>
                By selecting the button below, I agree to the SwiftBel Rules,
                <a  style={{ color: '#EB873F',cursor:'pointer' }} href='https://www.swiftbel.com/help/legal/cancellation-and-refund-policy'
                target='_blank' rel="noreferrer"> Cancellation and Refund Policy</a> and <a style={{ color: '#EB873F',cursor:'pointer' }} href='https://www.swiftbel.com/help/legal/terms-of-service'
                onClick={()=>{
                window.analytics.track("Click terms of service")
                }} target='_blank' rel="noreferrer">Terms of Service</a>.
                If your job requires materials, your Service Provider will
                ask you to authorize those material costs and they will
                be added to the price you pay.
            </Subtext2>
            <Confirm onClick={handleSubmit} id="submit" disabled={false}  variant='dark' size="lg" >
                Reserve now - SwiftBel
            </Confirm>
      </form>
    </>
  )
}
export default AfterpayClearpayForm;
const Confirm = styled(Button)`
width:100%;
height:56px;
margin-top:15px;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
background-color:#D81159;
background:#D81159;
color:white;
border:1px solid #D81159;
`
const SuccesfulModalBody=styled(ModalBody)`
-webkit-border-radius: 0px !important;     -moz-border-radius: 0px !important;     border-radius: 0px !important;
`
const Label = styled.label`
font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 150%;
margin-bottom:5px;
display: flex;
align-items: center;

`
const Subtext2 = styled.p`
font-size: 14px;
font-family: Inter;
`
const Select = styled(Form.Select)`
font-family: Inter;
border:none;

background-color:#fff;
margin-left:-10px;
margin-top:-10px;
.placeholder {
    font-family: Inter;
}
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border:0px solid #190F0F;
  background-color: #FAFAFA;
}
`
const CardInputWrapper = styled.div`
border: 1px solid #190F0F;
border-radius: 10px;
  padding: 10px;
  margin-top:15px;
`;
const CardCvInputWrapper = styled.div`
width:100%;
border: 1px solid #190F0F;
border-radius: 10px;
  padding: 10px ;
  margin-top:15px;
`;

const Input = styled.input`
width:100%;
border: none;
display:flex;
margin-top:-5px;
background:#fff;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border:0px solid #FAFAFA;
   
  }

`

const PostalInput = styled.input`
width:100%;
border: none;
display:flex;
margin-bottom:-10px;
margin-top:-5px;
background:#fff;
&:focus {
    outline: none;
    box-shadow: 0px 0px 0px white;
    border:0px solid #FAFAFA;
   
  }

`
const SucessfulModal = styled(Modal)`


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
const Text = styled.p
    `
    display:flex;
    text-align:center;
    
margin-top: 0.30rem;


`
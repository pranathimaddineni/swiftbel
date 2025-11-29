import { useState } from 'react'
import { Modal, Offcanvas } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import OtpInput from 'react-otp-input';
import { useEffect } from 'react';
import ResetPassword from './ResetPassword';
import { confirmOtp } from '@/store/Actions/Auth.action';

const MailVerification = (props) => {
    const dispatch = useDispatch();
    let mobileView = global.window && window.innerWidth < 768?true:false

    const [verifiedMail] = useState(true);
    const [passwordModalShow, setPasswordModalShow] = useState(false);
    const [errormsg, setErrormsg] = useState('');

    const [OTP, setOTP] = useState("");
    const navigateToHome = () => {
        //navigate('/business');
        router.replace({ pathname: router?.route,
            query: {}},
            undefined, { shallow: true })
        props.setVerificationModal(false);
    }
    const resendMail = () => {
        console.log(OTP,"dattataat")
        var data = JSON.stringify({
            "email": props?.email,
            "otp":`${OTP}`
        });
        console.log(data,"dattataat")
        var config = {
            method: 'post',
            url: `https://prod.swiftbel.com/user/confirmOtp`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                setErrormsg('Verification mail is resent. Please check your mail.')
                //alert('Verification mail is resent. Please check your mail.')
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
    const nextPassword = async () => {
        //const res = await dispatch(verifyMail())
        const data = {
            "email": props?.email,
            "otp":`${OTP}`
        };
        console.log(data,"data")
        const res2 = await dispatch(confirmOtp(data))
        console.log(res2, 'res2')
        if (res2.status === true) {
            setPasswordModalShow(true)
            props.setVerificationModal(false);
        }
        else {
            setErrormsg('Wrong verification code ! please try again')
            //alert('invalid otp')
        }
        // if (res.status) {
        //     if (res.data.isVerified === true) {
        //         setPasswordModalShow(true)
        //         props.setVerificationModal(false);
        //     }
        //     else {
        //         setVerifiedMail(false);
        //     }
        // }
    }
    useEffect(() => {
        if (OTP?.length > 5) {
            // setOtpval({
            //     email: registerEmail,
            //     otp: OTP
            // })
        }
        console.log(OTP,"otp")
    }, [OTP])

    const renderData=()=>{
        return(
            <SignupForm>
            <Heading>
                <SwiftbelHeader>Verify Your Email</SwiftbelHeader>
            </Heading>
            <p style={{fontFamily:'Inter'}} >We sent an email to <span style={{ fontWeight: 'bold' ,fontFamily:'Inter'}}>{props?.email}</span></p>
            <p style={{fontFamily:'Inter'}}>If you haven't received the verification email,<b style={{fontFamily:'Inter'}}> please check your spam folder.</b>
            <br/>
                Please verify your email then continue
            </p>
             <OtpInput
        value={OTP}
        onChange={setOTP}
        numInputs={6}
        inputStyle={{ borderRadius: '10px', height: '50px', width: '50px' ,margin:'5px'}}
        separator={<span> </span>}
        />
            <p style={{ color: 'red', fontSize: '12px' }} className='mt-3'>{errormsg}</p>

            <ResendButton onClick={resendMail}>Resend verification code</ResendButton>
            <br/>
            <p className='mt-3' style={{fontFamily:'Inter'}}>Need help? Contact us!</p>
            {!verifiedMail ? (
                <p style={{ color: '#D81159', marginBottom: '1rem', paddingLeft: '10px' }}>Please verify your email</p>
            ) : ''}
            <Button
                type="submit"
                variant='dark'
                className='signupSubmit '
                onClick={nextPassword}
            >
                Continue</Button>
        </SignupForm>
        )
    }
    return (
        <div className='modalStyle'>
            <Modal
                {...props}
                show={mobileView ? false : props?.show}
                dialogClassName="auth-verification-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Header closeButton={navigateToHome}>Verify Your Email</Header>
                <Modal.Body>
                    <div className='signup-modal-right'>
                    {renderData()}
                    </div>
                </Modal.Body>
            </Modal>
            <MobileModal show={props?.show} onHide={navigateToHome} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={navigateToHome}>
                    <Offcanvas.Title>Verify Your Email</Offcanvas.Title>
                </Offcanvas.Header>
                {renderData()}
            </MobileModal>
            <ResetPassword
                email={`${props?.email}`}
                setResetPasswordModel={setPasswordModalShow}
                show={passwordModalShow}
                onHide={() =>setPasswordModalShow(false)}
            />
        </div>
    )
}

export default MailVerification;
const Heading = styled.div`
margin-top:20px;
margin-bottom:20px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
          `
          const MobileModal = styled(Offcanvas)`
          @media (min-width: 768px) and (max-width: 3000px){
            display:none;
          `
const SignupForm = styled.div`
          width: 100%;
          top: 6.25rem;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          p{
              font-family: 'Open Sans';
              font-weight: 400;
              font-size: 12px;
              letter-spacing: 0.02em;
              margin-left:1.3rem;
              width: 93%;
            }
            .signupSubmit{
              width: 92%;
              height: 44px;
              display:flex;
              justify-content: center;
              align-items: center;
              border-radius: 8px;
              font-family:Roobert-medium;
              font-weight: 400;
              font-size: 14px;
              line-height: 150%;
              text-align: center;
              letter-spacing: 0.02em;
              color: #FFFFFF;
              background: black;
              border: none;
           }
           .hr-text {
            background-color:#fff;
            line-height: 1em;
            font-size: 14px;
            position: relative;
            outline: 0;
            border: 0;
            color: #787373;
            text-align: center;
            height: 1.5em;
            opacity: .5;
            &:before {
              content: '';
              background: linear-gradient(to right, transparent, #000000, transparent);
              position: absolute;
              left: 0;
              top: 50%;
              width: 100%;
              height: 1px;
            }
            &:after {
              content: attr(data-content);
              position: relative;
              display: inline-block;
              color: black;
              padding: 0 .5em;
              line-height: 1.5em;
              color: #818078;
              background-color: #fcfcfa;
            }
          }
           @media (max-width: 767px) {
            padding: 0;
            width: 100%;
            top: 5%;
            position: absolute;
          }
          `
const Header = styled(Modal.Header)
    `
font-weight: 400;
font-size: 16px;
display: flex;
letter-spacing: 0.01em;
font-family:Inter;
color: #787373;
justify-content:center;
text-align:center;
margin-left:10px;
margin-right:10px;
`
const SwiftbelHeader = styled.h1
    `
  font-weight: 500;
  font-size: 2rem;
  font-family:Roobert-medium;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color:#000;
  margin-left:  1.3rem;
  @media (min-width: 360px) and (max-width: 540px){
    font-size: 1.5rem;
    font-weight: 400px;
  }
`

const ResendButton = styled.button`
width: 250px;
height: 37px;
border-radius: 12px;
border: 1px solid #F3F3F3;
background: #fff;
font-family: 'Inter';
font-weight: 400;
font-size: 14px;
line-height: 150%;
text-align: center;
letter-spacing: 0.02em;
color: #787373;
&:hover{
  color: #000;
  border: 1px solid #F3F3F3;
}
&:active {
   border: 1px solid #F3F3F3;
   background: #F3F3F3;
}
@media (min-width: 360px) and (max-width: 767px){
    width: 12rem;
}
`
import { useState } from 'react';
import { Container, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import axios from 'axios';
import { useRouter } from 'next/router';
import MailVerification from './MailVerification';

const ForgotPassword = (props) => {
    let router = useRouter()
    let mobileView = global.window && window.innerWidth < 768?true:false
    const [resetPasswordModelShow, setResetPasswordModelShow] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState('');
    const [isValid] = useState();

    const resetPasswordUser = () => {
        var data = JSON.stringify({
            "email": recoverEmail
        });

        var config = {
            method: 'post',
            url: 'https://prod.swiftbel.com/user/generateOtp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response);
                if (response.data.status === true) {
                    // alert(response.data.message);
                    //toast(response.data.message);
                    // props.forgotPasswordModal(false);
                }
            })
            .catch(function (e, res) {
            });
        props.forgotPasswordModal(false);
        setResetPasswordModelShow(true);
    }

    const navigateToHome = () => {
        router.push('/');
        props.forgotPasswordModal(false);
    }

    const onChangeEmail = (e) => {
        setRecoverEmail(e.target.value)
    }

    const renderData = () => {
        return (
            <MailResend>
                <Heading>
                    <SwiftbelHeader>Forgot your password?</SwiftbelHeader>
                </Heading>
                <p >Enter your email and we will send you a link to reset password</p>
                <p>Just Click on that link in the email to complete your Signup. If you don't see it, you may need to <b>check your spam folder.</b>
                </p>
                                <StyledLabel>Your email </StyledLabel>
                                <ForgotPasswordInput
                                    style={{ borderColor: recoverEmail ? isValid ? '#D81159' : 'black' : null}}
                                    required
                                    type="text"
                                    placeholder="Email"
                                    autoComplete='off'
                                    name='email'
                                    onChange={(e) => onChangeEmail(e)}
                                    value={recoverEmail}
                                />
                <Button
                    type="submit"
                    variant='dark'
                    className='signupSubmit pl-5 mt-5'
                    onClick={resetPasswordUser}
                >
                    Reset Password</Button>
            </MailResend>
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
                <Header closeButton={navigateToHome}>
                    Finish signing up
                </Header>
                <Modal.Body>
                    <div className='signup-modal-right'>
                        {renderData()}
                    </div>
                </Modal.Body>
            </Modal>
            <MobileModal show={props?.show} onHide={() => props.forgotPasswordModal(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props.forgotPasswordModal(false)}>
                    <Offcanvas.Title>Finish signing up</Offcanvas.Title>
                </Offcanvas.Header>
                {renderData()}
            </MobileModal>
            <MailVerification
                email={recoverEmail}
                setVerificationModal={setResetPasswordModelShow}
                show={resetPasswordModelShow}
                onHide={() => setResetPasswordModelShow(false)}
            />
        </div>
    )
}

export default ForgotPassword;
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
const MobileModal = styled(Offcanvas)`
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`
const ForgotPasswordInput = styled(Form.Control)`
font-weight: 400;
margin-left: 20px;
margin-right: 20px;
border-radius: 10px;
margin-bottom:10px;
height: 44px;
width:93%;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}
@media (max-width: 530px) {
  margin-left:1.1rem;
}
`

const Heading = styled.div`
margin-top:20px;
margin-bottom:20px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
          `

const StyledLabel = styled.h1`
          font-weight: 500;
          font-size: 18px;
          font-family:Roobert-medium;
          text-align: start;
          letter-spacing: 0.01em;
          color: #190F0F;
          margin-left: 1.3rem;
          @media (max-width: 500px) {
            margin-left:1.1rem;
          }
`
const MailResend = styled.div`
width: 100%;
height:85%;
top: 6.25rem;
justify-content: flex-start;
display: flex;
flex-direction: column;
p{
  fontFamily:Inter;
font-weight: 400;
font-size: 12px;
line-height: 18px;
letter-spacing: 0.01em;
line-height: 150%;
margin-left: 1.1rem;
width: 94%;
}

.signupSubmit{
    width: 92%;
    height: 44px;
    display:flex;
    margin-left:20px;
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

  &:active {
    border: 1px solid #F3F3F3;
  background: #000;
  color: #fff;
  }
  &:hover{
    color: #fff;
  border: 1px solid #F3F3F3;
  background: #000;
 }
 }

 @media (max-width: 767px)
{
   position: absolute;
}
`
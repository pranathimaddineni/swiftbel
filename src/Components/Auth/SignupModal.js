import { useState } from 'react'
import { Button, Modal, Form, Container, Col, Row, Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';
import Googleicon from '../../../public/assets/GoogleIcon.png';
import Appleicon from '../../../public/assets/appleIcon.png'
import invalidCross from '../../../public/assets/invalidCross.png'
import { useDispatch } from 'react-redux';
import initializeAuthentication from '@/Firebase/firebase.init';
import { _googleSignUp,Apple_SignUp, verifyEmailUser } from '@/store/Actions/Auth.action';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider  } from 'firebase/auth';
import LoginModal from './LoginModal';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SetPassword from './SetPassword';

const SignupModal = (props) => {
  const [verificationModalShow, setVerificationModalShow] = useState(false);
  let router = useRouter()
  const dispatch = useDispatch();
  const [registerEmail, setRegisterEmail] = useState('');
//   const mql = window.matchMedia('(max-width: 600px)');
   let mobileView = global.window && window.innerWidth < 768?true:false
   console.log(router,'width')
   //mql.matches;
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [appledecod, setAppleDecode] = useState({})
  const [fullName, setFullName] = useState([])
  const [appleIdToken, setAppleIdToken] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errormsg] = useState('')
  initializeAuthentication();
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider('apple.com');
  const registerGoogleUser = async () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential, result);
        const token = credential.idToken;
        const res = await dispatch(_googleSignUp(token));
        console.log("hiiii")
        setModalShow(false)
        if (router?.query?.from)
        {
        router.replace({ pathname: router?.query?.from,
          query: {}},
          undefined, { shallow: true })
        }
        if (router.pathname === "/details") {
          router.push({pathname:`/payment`,query:{servicetype:router?.query?.servicetype}})
        }
        else if (res.status === true || res.status === "success")
        {
          window.analytics.identify("Successful google Login",
          {
              "component":'Header',
              "first_name": res?.data?.firstName,
              "email":  res?.data?.email,
              "last_name":  res?.data?.lastName,
              "phone_number":  res?.data?.phone,

          });
          window.location.reload()
        }
        else {
          window.analytics.identify("Unsuccessful google Login")
          console.log(result?.user?.email,"Email")
          setRegisterEmail(result?.user?.email)
          props.loginModal(true);
          props.signupModal(false);
        }
      }).catch((error) => {
        console.log(error, "error")
      });
  }
  const handleAppleSignup = async () => {
    const appleDetails = {
      "identityToken": appleIdToken,
      "email": appledecod.email,
      "user": appledecod.sub,
      "fullName": {
        "giveName": fullName.length > 0 ? fullName[0] : firstName,
        "familyname": fullName.length > 0 ? fullName[1] : lastName
      }
    }
    const res = await dispatch(Apple_SignUp(appleDetails));
    console.log(res, "resss")
    if (res.status === true || res.status === 'success') {
      props.signupModal(false);
      setModalShow(false)
    }
    else {
      setRegisterEmail(appledecod.email)
      props.loginModal(true);
      props.signupModal(false);
      setModalShow(false)
    }
  }
  const handleAppleSignIn = async () => {
    const auth = getAuth();
    signInWithPopup(auth, appleProvider)
      .then(async (result) => {
        const user = result.user.displayName;
        if (user) {
          let firstName = user?.split(" ");
          setFullName(firstName)
        }
        const credential = OAuthProvider.credentialFromResult(result);
        const decode = jwt_decode(credential.idToken);
        var data = {
          "email": decode.email
        }
        const appleDetails = {
          "identityToken": credential.idToken,
          "email": decode.email,
          "user": decode.sub,
          "fullName": {
            "giveName": fullName.length > 0 ? fullName[0] : firstName,
            "familyname": fullName.length > 0 ? fullName[1] : lastName
          }
        }
        console.log(data,"datataa")
        setAppleDecode(decode)
        setAppleIdToken(credential.idToken)
        const res = await dispatch(verifyEmailUser(data))
        console.log(res,"res")
        if (res.status) {
          window.analytics.identify("Successful Apple Login",
          {
              "component":'Header',
              "first_name": res?.data?.firstName,
              "email":  res?.data?.email,
              "last_name":  res?.data?.lastName,
              "phone_number":  res?.data?.phone,

          });
        setModalShow(true)
        props.signupModal(false);
        }
        else {
          const res = await dispatch(Apple_SignUp(appleDetails));
          console.log(res, "resss")
          if (res.status === true || res.status === 'success') {
            props.signupModal(false);
            setModalShow(false)
          }
          else {
            setRegisterEmail(appledecod.email)
            props.loginModal(true);
            props.signupModal(false);
            setModalShow(false)
          }
        }
        console.log(decode, 'decode');
        console.log(result, 'result');
      })
      .catch((error) => {
        window.analytics.identify("Unsuccessful Apple Login");
        console.log(error.message, "errorMsg")
      });
  }
  const registerUser = async () => {
    dispatch({
      type: 'EMAIL',
      payload: registerEmail
    })
    var data = {
      "email": registerEmail
    }
    const res = await dispatch(verifyEmailUser(data))
    if (res.status) {
      setVerificationModalShow(true);
      props.signupModal(false);
    }
    else {
      props.loginModal(true);
      props.signupModal(false);
    }
  }
  const email_validation_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const handleEmailChange = (event) => {
    const text = event.target.value;
    setRegisterEmail(text);
    if (email_validation_regex.test(text)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }
  const handleEmailBlur = () => {
    if (!registerEmail) {
      setEmailFocus(false);
    }
  }
  const handleEmailFocus = () => {
    setEmailFocus(true);
  }

  const closesignup=()=>{
    props?.signupModal(false)
    // router.replace({ pathname: router?.route,
    //   query: {}},
    //   undefined, { shallow: true })
  }
  console.log(router,'routeee')
  const renderData = () => {
    return (
      <SignupForm>
        <div>
          <Row>

              <Heading>
                <SwiftbelHeader>Welcome to SwiftBel</SwiftbelHeader>
              </Heading>
              <Form.Group style={{width:'92%'}} className="mb-1 form-email" controlId="formBasicEmail">
                <StyledLabel>Your email </StyledLabel>
                <StyledInput
                  type="email"
                  placeholder="Email"
                  name='email'
                  className='emailInput'
                  autoComplete='off'
                  value={registerEmail}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  style={{
                    borderColor: !validEmail && emailFocus ?
                      '#D81159' : '#F3F3F3'
                  }}
                />
              </Form.Group>
              {emailFocus ? emailFocus && !validEmail ? (
                <div style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
                  <Image src={invalidCross} style={{ width: '15px', height: '15px', justifyContent: 'center', marginLeft: '22px', marginTop: '8px', marginRight: '6px' }} className="oauthIcon " alt="logo" />
                  <p style={{ color: '#D81159', marginBottom: -9, font: 'Inter' }}> Enter a valid email</p>
                </div>
              ) :
                <p style={{ color: '#D81159', paddingLeft: '10px', marginBottom: -10 }}>{errormsg}</p> : null}

          </Row>
        </div>
        <br/>
        <Button
          type="submit"
          variant='dark'
          className='signupSubmit pl-5'
          onClick={registerUser}
        >
          Continue
        </Button>
        <div >
          <hr class="hr-text" data-content="or" />
        </div>
        <OauthButton type="submit" onClick={registerGoogleUser}>
          <Image src={Googleicon} className="oauthIcon " alt="logo" />
          <span className='oauthButtonLabel ms-2'>Continue with Google</span>
        </OauthButton>
        <OauthButton type="submit" onClick={handleAppleSignIn}>
          <Image src={Appleicon} className="oauthIcon " alt="logo" />
          <span className='oauthButtonLabel ms-2'>Continue with Apple</span>
        </OauthButton>
      </SignupForm>
    )
  }
  const rendedAppleInfo = () => {
    return (
      <SignupForm >
        <Container>
          <Row>
            <Col sm={11} lg={11} md={11} xs={11}>
              <Form.Group className="mb-1 form-email" controlId="formBasicEmail">
                <Heading>
                  <SwiftbelHeader>Personal info</SwiftbelHeader>
                </Heading>
                <StyledLabel>First name </StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="First name"
                  name='First name'
                  required
                  autoComplete='off'
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={fullName.length > 0 ? fullName[0] : firstName}
                />
                <StyledLabel style={{ marginTop: 10 }}>Last name </StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Last name"
                  name='Last name'
                  autoComplete='off'
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={fullName.length > 0 ? fullName[1] : lastName}
                  required
                />
                <p style={{ color: 'gray', textAlign: 'start', marginLeft: '18px' }}>Make sure it matches the name on your government ID</p>
                <StyledLabel>Your email </StyledLabel>
                <StyledInput
                  type="Email"
                  placeholder="Email"
                  name='Email'
                  className='Email'
                  autoComplete='off'
                  value={appledecod?.email}
                  disabled={true}
                />
                <p style={{ color: 'gray', textAlign: 'start', marginLeft: '18px' }}>We'll email you service confirmations and reciepts</p>
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <p style={{ fontFamily: 'Inter' }}>By sumbiting Continue, I agree to SwiftBel’s <span style={{ color: '#D81159' }}> <a style={{ cursor: 'pointer' }}
          href='https://www.swiftbel.com/help/legal/terms-of-service' target='_blank' rel="noreferrer">Terms of Service</a>,<a style={{ cursor: 'pointer' }}
            href='https://www.swiftbel.com/help/legal/payments-terms' target='_blank' rel="noreferrer"> Payments Terms of
            Service</a></span>, and acknowledge the <span style={{ color: '#D81159' }}><a style={{ cursor: 'pointer' }}
              href='https://www.swiftbel.com/help/legal/privacy-policy' target='_blank' rel="noreferrer">Privacy Policy</a>.</span></p>
        <Button
          type="submit"
          variant='dark'
          className='signupSubmit'
          onClick={handleAppleSignup}
        >
          Agree & Continue</Button>
      </SignupForm>
    )
  }
  return (
    <>
      <Modal
        dialogClassName="auth-personalinfo-modal "
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}>
        <Header closeButton={() => setModalShow(false)}>
          Finish signing up
        </Header>
        <Modal.Body>
          <div className='personalinfo-modal-right'>
            {rendedAppleInfo()}
          </div>
        </Modal.Body>
      </Modal>
      <MobileModal show={modalShow} onHide={() => setModalShow(false)} placement={'bottom'} style={{ height: '650px' }}>
        <Offcanvas.Header closeButton={() => setModalShow(false)}>
          <Offcanvas.Title>Log in or sign up</Offcanvas.Title>
        </Offcanvas.Header>
        {rendedAppleInfo()}
      </MobileModal>
      <Modal
        size='md'
        show={mobileView ? false : props?.show}
        dialogClassName="auth-verification-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={()=>closesignup()}
      >
         <Header closeButton={()=>closesignup()}>
          Log in or sign up
        </Header>
        <Modal.Body>
          <div className='signup-modal-right'>
            {renderData()}
          </div>
        </Modal.Body>
      </Modal>
      <MobileModal show={props?.show} onHide={()=>closesignup()} placement={'bottom'} style={{ height: '650px' }}>
        <Offcanvas.Header closeButton={()=>closesignup()}>
          <Offcanvas.Title>Log in or sign up</Offcanvas.Title>
        </Offcanvas.Header>
        {renderData()}
      </MobileModal>
      <LoginModal
        email={registerEmail ? registerEmail : props?.email}
        loginModal={props.loginModal}
        show={props.loginModalshow}
        onHide={() => props.loginModal(false)}
        signupModal={props.signupModal}
      />
      <SetPassword
        email={registerEmail}
        setPasswordModal={setVerificationModalShow}
        show={verificationModalShow}
        onHide={() => setVerificationModalShow(false)}
      />
    </>
  );
}
export default SignupModal;

const Heading = styled.div`
margin-top:20px;
margin-bottom:10px;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
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
  font-family:Roobert-Medium;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color:#000;
  margin-left:1.3rem;
  @media (min-width: 360px) and (max-width: 540px){
    font-size: 1.5rem;
    font-weight: 400px;
  }
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
  fontFamily:Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  line-height: 150%;
  width: 89%;
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
const StyledInput = styled(Form.Control)`
font-weight: 400;
margin-left:1.3rem;
border-radius: 10px;
height: 44px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #F3F3F3;
  background: #fff;
}
@media (max-width: 530px) {
  margin-left:1.1rem;
}
`
const StyledLabel = styled(Form.Label)`
font-weight: 500;
font-size: 18px;
font-family:Roobert-medium;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.01em;
color: #190F0F;
margin-left: 1.3rem;
@media (max-width: 500px) {
  margin-left:1.1rem;
}
`
const OauthButton = styled(Button)`
width: 92%;
height: 44px;
display:flex;
justify-content: center;
align-items: center;
border-radius: 8px;
font-family:Roobert-medium;
font-weight: 400;
font-size: 14px;
text-align: center;
color: #000;
background: #fff;
border: 1px solid #000;
margin-bottom:15px;
&:hover{
  color: #fff;
  border: 1px solid #F3F3F3;
  background: #000;
}
`
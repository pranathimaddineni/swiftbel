import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button,Form, Offcanvas, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { loginUsers } from '@/store/Actions/Auth.action';
import initializeAuthentication from '@/Firebase/firebase.init';
import { useRouter } from 'next/router';
import ForgotPassword from './ForgotPassword';

const LoginModal = (props) => {
    let router = useRouter()
    const dispatch = useDispatch();
    const [email, setEmail] = useState(props?.email);
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [isValid, setisvalid] = useState();
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [forgotPasswordModalShow, setForgotPasswordModalShow] = useState(false);
    const [errormsg, setErrormsg] = useState('');
    //const valu = new URLSearchParams(window.location.search)
    //const urlFinalPrice = valu.get('price')
    //const urlEstimatedPrice=valu.get('estimatedPrice')
    initializeAuthentication();
    //let location = useLocation();
    const loginUser = async () => {
        var data = {
            "expression": "Email",
            "email": email ? email : props?.email,
            "password": password
        }
        const res = await dispatch(loginUsers(data))
        window.analytics.identify("Successful login",
            {
                "component":'Header',
                "first_name": res?.data?.firstName,
                "email":  res?.data?.email,
                "last_name":  res?.data?.lastName,
                "phone_number":  res?.data?.phone,

            });
        if (res.token) {
            // if(urlFinalPrice&&urlEstimatedPrice){
                //router.push(`/payment${location?.search}`)
                //}
            //else
            props?.loginModal(false)
            if (router?.query?.from)
            {
            router.replace({ pathname: router?.query?.from,
            query: {}},
            undefined, { shallow: true })
            }
            else if (router.pathname === "/details") {
                router.push({pathname:`/payment`,query:{servicetype:router?.query?.servicetype}})
            }
            else if (router.asPath === "/") {
                window.location.reload()
            }
            else if (res.data.isServiceProvider === true) {
                router.push('/business/admindashboard')
            }
            else
                router.push(router.route);

        }
        else {
            window.analytics.track("unsuccessful login",{
                "message":res.message,
                "email":email ? email : props?.email
           
            }
           )
            setPasswordValidation(true);
            setErrormsg(res.message)
        }
    }
console.log(router,'router')
    const navigateToHome = () => {
        //navigate('/business');
        //router.replace('/')
        router.replace({ pathname: router?.route,
        query: {}},
        undefined, { shallow: true })
        props?.loginModal(false);
    }

    const navigateForgotPassword = () => {
        props?.loginModal(false);
        setForgotPasswordModalShow(true);
    }

    const handleShowHide = () => {
        setShow(!show);
    }

    const onChangeEmail = (e) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (e.target.value)
            reg.test(e.target.value) ? setisvalid(true) : setisvalid(false)

        else
            setisvalid('')
        setEmail(e.target.value)
    }

    const renderData = () => {
        return (
            <LoginForm>
                <Heading>
                    <SwiftbelHeader>Welcome to SwiftBel</SwiftbelHeader>
                </Heading>
                <div>
                    <Row>
                            <Form.Group style={{width:'92%'}} className="mb-1 form-email" controlId="formBasicEmail">
                                <StyledLabel>Email </StyledLabel>
                                <StyledInput

                                    required
                                    type="text"
                                    placeholder="Email"
                                    autoComplete='off'
                                    name='email'
                                    className='emailInput'
                                    onChange={(e) => onChangeEmail(e)}
                                    value={email ? email : props?.email}
                                />
                                {isValid === false ? <p style={{ color: '#D81159', paddingLeft: '10px' }}>
                                    Invalid Email
                                </p> : null}
                            </Form.Group>

                            <Form.Group style={{width:'92%'}} className='mb-1' controlId="formBasicPassword">
                                <StyledLabel>Password</StyledLabel>
                                <PasswordContainer className='d-flex'>
                                    <PasswordStyledInput
                                        required
                                        type={show ? 'text' : 'password'}
                                        placeholder='Password'
                                        autoComplete='off'
                                        name='password'
                                        className='passwordInput'
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    {show
                                        ?
                                        <h7 onClick={handleShowHide}>Hide</h7>
                                        :
                                        <h7 onClick={handleShowHide}>Show</h7>
                                    }
                                </PasswordContainer>
                                {passwordValidation === true ? <p style={{ color: '#D81159', paddingLeft: '10px' }}>
                                   {errormsg}
                                </p> : null}
                                <p style={{ color: 'black', paddingLeft: '10px', font: 'Inter', cursor: 'pointer', textDecoration: 'underline' }} onClick={navigateForgotPassword} >Forgot Password?</p>
                            </Form.Group>
                    </Row>
                </div>
                <br />
                <Button
                    variant='dark'
                    className='loginSubmit mb-2'
                    autoComplete='off'
                    onClick={loginUser}
                >
                    Log In
                </Button>

            </LoginForm>
        )
    }
    // const mql = window.matchMedia('(max-width: 600px)');
    let mobileView = global.window && window.innerWidth < 768?true:false
    //mql.matches;
    return (
        <div>
            <Modal
                {...props}
                dialogClassName="auth-verification-modal"
                show={mobileView ? false : props?.show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Header closeButton={navigateToHome}>
                    Log in or sign up
                </Header>
                <Modal.Body>
                    <div className='signup-modal-right'>
                        {renderData()}
                    </div>
                </Modal.Body>
            </Modal>

            <MobileModal show={props?.show} onHide={() => props?.loginModal(false)} placement={'bottom'} style={{ height: '650px' }}>
                <Offcanvas.Header closeButton={() => props?.loginModal(false)}>
                    <Offcanvas.Title>Log in or sign up</Offcanvas.Title>
                </Offcanvas.Header>
                {renderData()}
            </MobileModal>
            <ForgotPassword
                forgotPasswordModal={setForgotPasswordModalShow}
                show={forgotPasswordModalShow}
                onHide={() => setForgotPasswordModalShow(false)}
            />
        </div>
    )
}

export default LoginModal;

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
const MobileModal = styled(Offcanvas)`
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
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
    margin-left: 1.3rem;
    @media (min-width: 360px) and (max-width: 540px){
      font-size: 1.5rem;
      font-weight: 400px;
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

const LoginForm = styled.div`
width: 100%;
top: 6.25rem;
justify-content: flex-start;
display: flex;
align-items: center;
flex-direction: column;

p{
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.02em;
    margin-left: 1.4rem;
    width: 87%;
  }

  .btn-container{
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:20px;
  }
  .loginSubmit{
    width: 92%;
    height: 44px;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
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

 @media (max-width: 767px) {
    padding: 0;
    width: 100%;
    top: 5%;
    position: absolute;
}

h7{
    font - family: 'Open Sans';
    font-weight: 700;
    self-align:center;
    align-items:center;
    font-size: 14px;
    line-height: 120%;
    color: #190F0F;
    cursor: pointer;
    margin-right:10px;
    margin-top:10px;
  }
`
const StyledInput = styled(Form.Control)`
font-weight: 400;
margin-left: 1.3rem;
border-radius: 10px;
height: 44px;
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
const PasswordStyledInput = styled(Form.Control)`
          font-weight: 400;
         border:none;
         border-radius:10px;
          &:focus {
            outline: none;
          box-shadow: 0px 0px 0px white;
          border: 1px solid #fff;
          background: #fff;
        }

          @media (min-width: 360px) and (max-width: 480px){
          margin-left: 1.25rem;
          }
          `
const PasswordContainer = styled.div`
 border: 1px solid #DDDDDD;
font-weight: 400;
margin-left:  1.3rem;
border-radius:10px;
width:100%;
height: 44px;
margin-bottom:20px;
margin-bottom:10px;
&:focus {
  outline: none;
box-shadow: 0px 0px 0px white;
border: 1px solid #190F0F;
background: #fff;
}

@media (min-width: 360px) and (max-width: 480px){
margin-left: 1.25rem;
}
@media (max-width: 530px) {
  margin-left:0.8rem;
}
`
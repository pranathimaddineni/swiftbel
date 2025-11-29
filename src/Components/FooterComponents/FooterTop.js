// import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import swiftbellogo from '../../../public/assets/swiftbellogoprofile.png'
import Brandname from '../../../public/assets/Brandname.svg'
import instagram from '../../../public/assets/instagramgray.png'
import facebook from '../../../public/assets/facebookgray.png'
import linkedin from '../../../public/assets/linkedingray.png'
import twitter from '../../../public/assets/twittergray.png'
import Image from 'next/image';
// import { useSelector } from 'react-redux'
const FooterTop = (props) => {
    // const profileData = useSelector((state) => state.profileReducer)
    // const {profileDetails } = profileData
    // useEffect(()=>{
    //     window.analytics.identify(profileDetails?._id,{
    //         "component":"Footer",
    //         "url":window.location?.pathname
    //     });
    // },[profileDetails?._id])
    return (
        <>
        <FooterContainer style={props?.containerStyle}>
            <br/>
            <Container fluid >
                <Row>
                    <Col sm={6} lg={3} xl={2}>
                        <Stack direction='horizontal' gap={1}>
                        <Image  alt='' className='home-icon' src={swiftbellogo} />
            <h2 className='home-swiftbel-brand'><Image src={Brandname} alt='Brandname'/></h2>
                        </Stack>
                    </Col>
                </Row>
                <Hr/>
                <Row xs={2} md={5} lg={5} className='d-flex justify-content-between'>
                    <div>
                        <h6 className='mt-4 heading'>Company</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.swiftbel.com/about/about-us')}>About Us</li>
                            <li className='mt-3 subheading' onClick={()=> window.location = 'mailto:careers@swiftbel.com'}>Careers</li>
                            <li className='mt-3 subheading' onClick={()=> window.location = 'mailto:media@swiftbel.com'}>Media</li>
                            <li className='mt-3 subheading' onClick={()=> window.location = 'mailto:investors@swiftbel.com'}>Investors</li>
                        </ul>
                    </div>
                    {/* <div  >
                        <h6 className='mt-4 heading'>Service Provider</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-3 subheading'onClick={()=>window.open('https://www.swiftbel.com')}>Login</li>
                            <li className='mt-3 subheading'onClick={()=>window.open('https://swiftbel.com/business/createnewprofile')}>Signup</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://swiftbel.com/business')}>Why SwiftBel?</li>
                            <li className='mt-3 subheading' onClick={()=> window.open('https://www.swiftbel.com/help/help-centre','_blank')}>Resources</li>
                        </ul>
                    </div> */}
                    <div >
                        <h6 className='mt-4 heading'>Legal</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.swiftbel.com/help/legal/terms-of-service')}>Terms of Service</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.swiftbel.com/help/legal/payments-terms')}>Payment Terms of Service</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.swiftbel.com/help/legal/privacy-policy')}>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='mt-4 heading'>Support</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-3 subheading' onClick={()=> window.open('https://www.swiftbel.com/help/help-centre','_blank')}>Help Centre</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='mt-4 heading'>Follow Us</h6>
                        <ul className='list-unstyled'>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.facebook.com/swiftbel','_blank')}>
                            <Image alt='' src={facebook} />&nbsp;
                            Facebook</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('http://instagram.com/swiftbel_official/','_blank')} ><Image  alt='' src={instagram} /> &nbsp;Instagram</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('https://www.linkedin.com/company/swiftbel','_blank')} ><Image  alt='' src={linkedin} /> &nbsp;Linkedin</li>
                            <li className='mt-3 subheading' onClick={()=>window.open('http://www.twitter.com/swiftbel_HQ','_blank')} ><Image  alt='' src={twitter} /> &nbsp;Twitter</li>
                        </ul>
                    </div>
                </Row>
                <br/>
            </Container>
        </FooterContainer>
        </>

    )
}

export default FooterTop;

const FooterContainer = styled.div`
max-width: 100vw;
height: auto;
background-color:white;
background:white;
padding-top:1rem;
color:black;
width:1312px;
@media (min-width: 1170px) and (max-width: 1360px){
    width:1170px;
}
@media (min-width: 820px) and (max-width: 1199px){
    padding-left:50px;
}
.heading{
    font-family:Roobert-medium;
    font-size:18px;
}
.subheading{
 font-family : Inter;
 font-size:16px;
}
.home-icon{
    height:26px;
    width:26px;
    margin-top:3px;
  }
 h6{
    color: #190F0F;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
 }

  ul li{
    color:#787373;
    font-size:14px;
    cursor:pointer;
    font:Inter;
  }

   ul li a{
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    letter-spacing: 0.02em;
    padding-top: 10px;
  }
  ul li a:hover{
  }
  @media (min-width: 200px) and (max-width:1169px)

  {
     width:100%
      padding-left:20px;
      padding-right:20px;
  }
`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;
`
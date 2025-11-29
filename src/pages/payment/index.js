import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PaymentLeft from '@/Components/checkout/PaymentLeft';
import PaymentRight from '@/Components/checkout/PaymentRight';
import { verifyEmailUser } from '@/store/Actions/Auth.action';
import { getAdminDetails } from '@/store/Actions/Dashboard.actions';
import { useRouter } from 'next/router';
import Head from 'next/head';
import back from '../../../public/assets/back.png'
import Image from 'next/image';
import ProtectedRoute from "@/Components/Auth/ProtectedRoutes"
function PaymentPage(){
    const navigate=useRouter()
    const [det, setDet] = useState({})
    const [detdata, setDetData] = useState({})
    const [type, setType] = useState('')
    const [isEmailAvilable, setIsEmailAvlable] = useState(false);
    const [email, setEmail] = useState('')
    const [loader,setLoader]=useState(false)
    const dispatch = useDispatch()
    let locate = useRouter();
    const verifyEmail = async (emails) => {
      const data={
        email: emails
      }
      const res = await dispatch(verifyEmailUser(data))
      if (res.status) {
        setIsEmailAvlable(true)
      }
    }
    const initilize = async () => {
      setLoader(true)
      if (locate?.query) {
        const valu = locate?.query
        const emails = valu?.email
        const serviceName = valu?.serviceName
        const res = await dispatch(getAdminDetails(locate?.query))
        await verifyEmail(emails)
        if (res.status === true) {
          setEmail(emails)
          localStorage.setItem('values', JSON.stringify(res?.data))
          localStorage.setItem('data', JSON.stringify(res?.sp))
          localStorage.setItem('type', serviceName)
        }
      }
      let details = localStorage.getItem('values')
      let data = localStorage.getItem('data')
      setType(localStorage.getItem('type'))
      setDet(JSON.parse(details))
      setDetData(JSON.parse(data))
      setLoader(false)
    }
    useEffect(() => {
      initilize()
    }, [])
    console.log(det,detdata,"FJBFJFBJ")
    const handleback = () => {
       if(type==='Moving'){
        navigate.push( {pathname:'/moving'})
      }
      else if(type==='Carpet Cleaning'){
        navigate.push( {pathname:'/carpetcleaning'})
      }
      else if(type==='Plumbers'){
        navigate.push( {pathname:'/plumbers'})
      }
      else if(type==='Electricians'){
        navigate.push( {pathname:'/electricians'})
      }
      else if(type==='Pressure Washing'){
        navigate.push( {pathname:'/pressurewashing'})
      }
    }
return(
    <>
      <Head>
<title>Moving Estimate | Reserve movers online | SwiftBel</title>
<meta name='description' content='Book affordable high qulaity movers with upfront prices with the push of a button'/>
<link rel="icon" href="/favicon.ico" />
</Head>
    <Main className="main">
    <Segment style={{backgroundColor:'#FAFAFA'}}>
    <br/>
   { <MainContainer fluid >
      <Maindiv>
      <div>
      <Webdiv>
      <ButtonStyle onClick={() => handleback()} variant="light"><Backicon src={back} /></ButtonStyle>
      </Webdiv>
      <Rightdiv className='p-2'>
            <PaymentRight
             det={det}
             detdata={detdata}
             type={type}
            />
        </Rightdiv>
        </div>
        <Leftdiv className='p-2 mt-5'>
            <PaymentLeft
             det={det}
             detdata={detdata}
             type={type}
             isEmailAvilable={isEmailAvilable}
             email={email}
            />
        </Leftdiv>
      </Maindiv>
      <MobileView>
          <div>
      <Rightdiv className='p-2'>
            <PaymentRight
             det={det}
             detdata={detdata}
             type={type}
            />
        </Rightdiv>
        <Leftdiv className='p-2'>
            <PaymentLeft
             det={det}
             detdata={detdata}
             type={type}
             isEmailAvilable={isEmailAvilable}
             email={email}
            />
        </Leftdiv>
        </div>
      </MobileView>
      </MainContainer>}
      <br/>
      <br/>

    </Segment>
    </Main>
    </>
)
}
export default ProtectedRoute(PaymentPage)
const Main = styled.div`
@media (min-width: 260px) and (max-width: 820px){
    overflow-x:hidden;
    }
`
const MobileView = styled.div`
background:#fff;
background-color:#fff;
overflow-x:hidden;
justify-content:center;
display:flex;
align-items:center;
flex-direction:column;
.imag{
    justify-content:flex-end;
    display:flex;
}
@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`
const Webdiv = styled.div`
display:flex;
margin-top:10px;
margin-bottom:10px;
@media (min-width: 260px) and (max-width: 820px){
 display:none;
  }
`
const MainContainer=styled(Container)`
@media (min-width: 260px) and (max-width: 600px){
    padding-left:10px;
    padding-right:0px;
    }
    @media (min-width: 601px) and (max-width: 1000px){
        padding-left:100px;
        padding-right:0px;
    }
`
const Maindiv=styled.div`
display:flex;
justify-content:center;
padding-left:25px;
padding-right:35px;
@media (min-width: 260px) and (max-width: 820px){
    display:none;
    }
`
const Segment=styled.div`
background-color:#FAFAFA;
padding:0px;
`
const Leftdiv=styled.div`
width: 564px;
background:#fff;
border:1px solid #F3F3F3;
margin-top:10px;
border-radius:15px;
@media (min-width: 260px) and (max-width: 601px){
padding-right:0px;
width:380px;
}
@media (min-width: 1700px) and (max-width: 8000px){
    width: 734px;

}
`
const Rightdiv=styled.div`
width:590px;
margin-right:15px;
@media (min-width: 260px) and (max-width: 601px){
    padding:0px;
    padding-left:0px;
    padding-Right:0px;
    margin-right:0px;
    width:360px;
    }
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
const ButtonStyle = styled(Button)`
font-size: 16px;
cursor:pointer;
border-radius:50%;
color:#787373;
font-weight: 400;
height:40px;
width:40px;
margin-top:-20px;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:15px;
    padding-right:15px;
    margin-left:10px;
    display:none;
}
`
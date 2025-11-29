import swiftbellogo from'../../public/assets/swiftbellogoprofile.png';
import blackburger from '../../public/assets/blackburger.png';
import Brandname from '../../public/assets/Brandname.svg';
import callback from '../../public/assets/callback.png';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState } from "react";
import {Dropdown, Offcanvas} from 'react-bootstrap';
import SignupModal from './Auth/SignupModal';
import { isAuthenticated } from '@/utils/Authentication';
import { useEffect } from 'react';
import Link from 'next/link';

function Header(){
const router = useRouter()
let authenticate = isAuthenticated()
const [loginModalShow, setLoginModalShow] = useState(false);
const [showServiceprovider,setShowServiceprovider]=useState(false)
const [signUpModalShow, setSignUpModalShow] = useState(
    router.query.modal&&
    authenticate===false
    ?
    router.query.modal
    :
    false);
    console.log(signUpModalShow)

    useEffect(()=>{
    if(router.query.modal&& authenticate===false){
     setSignUpModalShow(router.query.modal)
    }
    },[router.query.modal,authenticate])
const [show, setShow] = useState(false);
const [showoffc, setShowoffc] = useState(false);

const trackingEvent=(name)=>{
    // window.analytics.track("tab",{
    //   "button":name,
    //   "url":window.location?.pathname
//   });
  }
const handleServiceModalClose = () => setShowServiceprovider(false);
const handlejoinas=()=>{
trackingEvent('Join as service provider')
if(showServiceprovider){
setShowServiceprovider(false)
}
else
{
setShowServiceprovider(true)
}
}
const handleClose = () => setShow(false);
const handleCloseOffc = () => setShowoffc(false);
const handleShow = () => {
//   window.analytics.track("Burger menu",{
//     "component ":"header"
// });
  if(show===false){
  setShow(true)
  }
  else {
    setShow(false)
  }
}
const handleShowOffc = () => {
  if(show===false){
  setShowoffc(true)
  }
  else {
    setShowoffc(false)
  }
}

const handlelogout=()=>{
  typeof window !== "undefined" ?(
  localStorage.removeItem('token'),
  localStorage.removeItem('isServiceProvider'),
  localStorage.removeItem('userName'),
  localStorage.clear()
  )
  :
  null
  sessionStorage.clear();
  router.push('/')
  //window.location.reload();
}
let username=typeof window !== "undefined"?localStorage.getItem('userName'):null
console.log(typeof window,'window')
const spmenu=[
{
title:'Sign up',
tracking:'Sign up as service provider',
type:'signup'
},
{
title:'Login',
tracking:'Login as service provider',
type:'login'
}
]

const authenticatedmenu=[
// {
// title:'Messages',
// tracking:'Messages',
// type:'messages',
// navigate:'/business/message'
// },
{
title:'Bookings',
tracking:'Bookings',
type:'bookings',
navigate:'/bookings',
divider:true
},
// {
// title:'Saved jobs',
// tracking:'Saved jobs',
// type:'savedjobs',
// navigate:'/savedjobs'
// },
// {
// title:'Account',
// tracking:'Account',
// type:'account',
// navigate:'/myaccount',
// divider:true
// },
{
title:'Help center',
tracking:'Help center',
type:'helpcenter',
navigate:'/help/help-centre'
},
{
title:'Logout',
tracking:'Log out',
type:'logout',
}
]

const notauthenticatedmenu=[
       {
        title:'Sign up',
        tracking:'Sign up',
        type:'signup',
        },
        {
        title:'Login',
        tracking:'Login',
        type:'login',
        divider:true
        },
        // {
        // title:'Service provider sign up',
        // tracking:'Service provider Sign up',
        // type:'spsignup',
        // navigate:'/business'
        // },
        // {
        // title:'Service provider log in',
        // tracking:'Service Provider Log in',
        // type:'splogin',
        // divider:true
        // },
        {
        title:'Help center',
        tracking:'Help center',
        type:'helpcenter',
        navigate:'/help/help-centre'
        }
]

const handlecustomermenu=(tracking,route,type)=>{
trackingEvent(tracking)
if(route){
if(type==='helpcenter'){
window.open(route)
}
else{
    router.push(route)
}
}
else if(type==='logout'){
handlelogout()
}
else if(type==='signup'||type==='login'){
   window.analytics.track("Click on Sign up");
setSignUpModalShow(true)
}
else if(type==='splogin'){
  window.analytics.track("Click on log in");
setLoginModalShow(true)
}
}

const handlespmenu=(tracking,type)=>{
trackingEvent(tracking)
if(type==='signup'){
    router.push('/business')
}
else if(type==='login'){
setLoginModalShow(true)
}
}
const handleHome=()=>{
    router.push('/')
}

return(
<>
<Main>
<Head className={"d-flex justify-content-between"} >
<Link href="/">
<div className="d-flex headbrand" >
<Image alt='' className='home-icon' src={swiftbellogo} />
<h2 className='home-swiftbel-brand' ><Image src={Brandname} alt='SwiftBel Logo'/></h2>
</div>
</Link>
<div className="d-flex">
<div>
{/* {router.asPath==='/' || router.asPath ==='/business' ? */}
{/* <Joinas variant='dark' >+1 (604) 358-4116 (Call us)</Joinas> */}
<Joinas variant='dark' ><a href='tel: (604) 358-4116' style={{textDecoration:'none',color:'white'}} > (604) 358-4116 </a></Joinas>
 {/* :''} */}
{
showServiceprovider?
<Dropdownmenu show={showServiceprovider} className='mt-4' onMouseLeave={handleServiceModalClose} >
{spmenu.map((item,index)=>{return(
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlespmenu(item?.tracking,item?.type)}
>
{item?.title}
</Dropdown.Item>
)})}
</Dropdownmenu>
:null
}
</div>
<div>
{!(router.asPath!=='/' && username && username!==undefined) ?
<Burgermenu alt='' src={blackburger} onClick={handleShow}/>
:
          <Username onClick={handleShow}>
            <span>{username}</span>
            <span className='arrow'> ▼</span>
          </Username>
   }
<Dropdownmenu show={show} className='customermenu mt-4' onMouseLeave={handleClose} >
{authenticate?
authenticatedmenu.map((item,index)=>{return(
<>
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}
>
{item?.title}
</Dropdown.Item>
{item?.divider ?
<Dropdown.Divider className='divider' />
:''}
</>
)})
:
notauthenticatedmenu.map((item,index)=>{return(
<>
<Dropdown.Item key={index} className='dropdownitem'
onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}
>
{item?.title}
</Dropdown.Item>
{item?.divider ?
<Dropdown.Divider className='divider' />
:''}
</>
)})
}
</Dropdownmenu>
</div>
</div>
</Head>
</Main>
<MobileHeader>
<div>
<Burgermenu alt='' src={blackburger} onClick={handleShowOffc}/>
</div>
<div onClick={()=>handleHome()}>
<h2 className='home-swiftbel-brand'><Image src={Brandname} alt='Brandname'/></h2>
</div>
<div className="lastdiv"></div>
</MobileHeader>

<OffC show={showoffc} onHide={handleCloseOffc} >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>
            <div onClick={handleCloseOffc} className='offcanvas-items d-flex mt-2' >
            <Image src={Brandname} alt='logo' />
            </div></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
        {authenticate?
authenticatedmenu.map((item,index)=>{return(
<>
<MenuText key={index} onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}>{item?.title}</MenuText><br/>
{item?.divider ?
<hr/>
:''}
</>
)})
:
notauthenticatedmenu.map((item,index)=>{return(
<>
<MenuText key={index} onClick={() => handlecustomermenu(item?.tracking,item?.navigate,item?.type)}>{item?.title}</MenuText><br/>
{item?.divider ?
<hr/>
:''}
</>
)})
}
    </Offcanvas.Body>
</OffC>
<SignupModal
signupModal={setSignUpModalShow}
loginModal={setLoginModalShow}
loginModalshow={loginModalShow}
show={signUpModalShow}
onHide={() => setSignUpModalShow(false)}
/>
</>
)
}
export default Header

const Head=styled.div`
width:1312px;
// position:fixed;
// z-index : 9999;
Top:0;
height:80px;
padding-top:15px;
padding-bottom:27px;
padding-left:20px;
padding-right:20px;
.home-swiftbel-brand{
width: 101.66px;
height: 24px;
}
.home-icon{
width: 25.97px;
height: 26.44px;
margin-top:12px;
margin-right:8px;
}
@media (min-width: 200px) and (max-width: 1311px){
    width:100%;
    overflow-x: hidden;
     }
`
const Username=styled.div`
display:flex;
border-radius:50px;
background:#D81159;
margin-top:8px;
color:white;
padding:5px;
margin-right:12px;
font-size:12px;
cursor:pointer;
padding-right:15px;
padding-left:15px;
height:30px;
.arrow{
  font-size:8px;
  margin-top:4px;
  margin-left:4px;
}
`
const Main = styled.div`
display:flex;
justify-content:center;
background:white;
height:80px;
.headbrand{
cursor:pointer;
}
.whitebackground{
background:white;
}
.transbackground{
background:transparent;
}
@media (min-width: 260px) and (max-width: 820px){
overflow-x: hidden;
}
@media (min-width: 821px) and (max-width: 1310px){
padding-left:30px;
padding-right:30px;
}
.customermenu{
margin-left:-70px;
}
.dropdownitem{
background-color:white !important;
background:white !important;
}
.divider{
background:#F3F3F3;
background-color:#F3F3F3;
color:#F3F3F3;
}
@media (min-width: 200px) and (max-width: 768px){
display:none;
}
`
const MobileHeader=styled.div`
display:flex;
justify-content:space-between;
width:100%;
background:white;
height:80px;
padding:20px;
@media (min-width: 769px) and (max-width: 9999px){
display:none;
}
.lastdiv{
width:15px;
}
`

const MenuText = styled.p`
color:#000;
font-size: 16px;
font-family:Roobert-medium;
`
const OffC=styled(Offcanvas)`
width:80%;
padding-top:3px;
background-color:#fff;
.offcanvas-items{
color:#000;
}
@media (min-width: 769px) and (max-width: 9999px){
    display:none;
}
`
const Burgermenu=styled(Image)`
    width: 32px;
    height: 16px;
    margin-top:12px;
    cursor:pointer;
`
const Dropdownmenu=styled(Dropdown.Menu)`
border-radius:10px;
width: 212px;
font-size:16px;
font-family:Roobert-medium;
background-color:white !important;
background:white !important;
font-weight:400;
`
const Joinas=styled.button`
width: 212px;
height: 42px;
background: #190F0F;
border-radius: 8px;
border:1px solid #190F0F;
color:white;
font-family:Inter;
font-weight: 400;
font-size: 16px;
margin-right:34px;
`
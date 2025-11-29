import { useState } from 'react'
import styled from 'styled-components'
import Playpic from '../../../public/assets/vimeoplaypic.webp'
import VimeoModal from './VimeoModal'
import Image from 'next/image'

function PlayVideo(){
const [VimeoPopup,setVimeoPopup]=useState(false)
const handlevideo=()=>{
    window.analytics.track("Clicking on the play button on video ");
setVimeoPopup(true)
}
return(
<>
<Main>
<Head>
<div>
<Illustartion src={Playpic}  alt='How to use the website website and app, and book afforable home service providers.' onClick={()=>handlevideo()} />
</div>
<div >
<Heading className='mt-3'>Spend more time<br/>
doing what you want to do</Heading>
<Description>Booking SwiftBel home service providers is a breeze.
<br/><br/>
Reserve home service providers with the push of a button.
<br/><br/>
Why waste time on the phone when you can be doing something you enjoy!
</Description>
</div>
</Head>
</Main>
<VimeoModal
VimeoPopup={setVimeoPopup}
show={VimeoPopup}
onHide={() => setVimeoPopup(false)}
/>
</>
)
}
export default PlayVideo

const Main = styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 1000px){
display:inline;
width:100%;
}
`
const Head=styled.div`
width:1312px;
padding-top:44px;
padding-bottom:64px;
padding-left:20px;
padding-right:20px;
display:flex;
justify-content:space-between;
@media (min-width: 200px) and (max-width: 1311px){
    width:100%;
}
@media (min-width: 260px) and (max-width: 1250px){
display:inline;
width:100%;
padding-top:0px;
}
`
const Illustartion = styled(Image)`
width: 648px;
height: 360px;
cursor:pointer;
display:flex;
@media (min-width: 260px) and (max-width: 1000px){
display:none;
}
`
const Heading=styled.p`
font-size: 32px;
color: #190F0F;
font-weight: 500;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 1000px){
margin-left:20px;
margin-right:20px;
font-size:26px;
}
`
const Description=styled.p`
width: 537px;
font-family: Inter;
font-weight: 400;
font-size: 16px;
color: #787373;
margin-top:16px;
@media (min-width: 260px) and (max-width: 1000px){
padding-left:20px;
padding-right:50px;
font-size:14px;
width:100%;
}
`
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import LocalMoving from '../../../public/assets/localMoving.webp'
import Image from 'next/image'

function TryItOut(){
const handlebutton=()=>{
    window.scroll({
        top:0,
        left:0,
        behavior:'smooth',
        });
}
return(
<>
<Main>
<Head>
<div className='d-flex justify-content-between'>
<div >
<Heading>Inexpensive prices from vetted professionals</Heading>
<Description>SwiftBel finds affordable and reliable home service professionals so you don't have to.
We survey the market so that you don't overpay.
</Description>
<Mainbutton variant='dark' size='md' onClick={()=>handlebutton()}>Find home service providers</Mainbutton>
</div>
<div>
<Illustartion src={LocalMoving} alt='Homeowner unpacking the house'  />
</div>
</div>
</Head>
</Main>
</>
)
}
export default TryItOut

const Main = styled.div`
display:flex;
justify-content:center;
background:white;
`
const Head=styled.div`
width:1312px;
padding-top:44px;
padding-bottom:64px;
padding-left:20px;
padding-right:20px;
@media (min-width: 200px) and (max-width: 1311px){
width:100%;
padding-top:25px;
}
`
const Illustartion = styled(Image)`
Width: 300px;
Height:320px;
margin-top:-10px;
@media (min-width: 1000px) and (max-width: 1399px){
    height:231px;
    }
@media (min-width: 260px) and (max-width: 1311px){
    display:none;
 }
`
const Mainbutton = styled(Button)`
width: 232px;
height: 44px;
background: #190F0F;
border-radius: 8px;
font-size: 14px;
margin-top:32px;
`
const Heading=styled.p`
font-size: 32px;
color: #190F0F;
font-weight: 500;
@media (min-width: 260px) and (max-width: 1000px){
width:100%;
font-size: 26px;
}
`
const Description=styled.p`
width: 583px;
font-family: Inter;
font-weight: 400;
font-size: 16px;
color: #787373;
margin-top:16px;
@media (min-width: 260px) and (max-width: 1000px){
width:90%;
font-size: 14px;
}
`
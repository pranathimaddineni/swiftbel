import MoveBanner from '../../../public/assets/MB.webp'
import JoinSP from '../../../public/assets/JoinSP.webp'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
function JoinBanner(){
let router = useRouter()
const handlejoinas=()=>{
router.push('/business')
}

return(
<>
<Banner src={MoveBanner}/>
<MobBanner src={JoinSP}/>
<Texts>
<Heading>Join as Service Provider</Heading>
<Description>With you every step of the way, our friendly movers <br />
are vetted professionals who go the distance to provide a 5-star experience. </Description>
<Joinnow variant='light' size='md' onClick={()=>handlejoinas()}>
{"Join now"}
</Joinnow>
</Texts>
</>
)
}

export default JoinBanner

const Banner = styled(Image)`
border-radius: 12px;
width:100%;
height:100%;
display:inline;
@media (min-width: 200px) and (max-width: 1000px)
{
display:none;
}
`
const MobBanner = styled(Image)`
display:none;
@media (min-width: 200px) and (max-width: 1000px)
{
display:inline;
width: 100%;
height:100%
}
`
const Texts = styled.div`
position:relative;
margin-top:-245px;
padding-left:80px;
@media (min-width: 1000px) and (max-width: 1200px){
margin-top:-225px;
}
@media (min-width: 200px) and (max-width: 1000px)
{
padding:16px;
padding-left:20px;
margin-top:-240px;
}
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size: 32px;
text-align: start;
color: #FFFFFF;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1000px)
{
font-size: 24px;
}
`
const Description = styled.p`
font-family:Inter;
font-weight: 400;
font-size: 16px;
color: #F3F3F3;
text-align:start;
@media (min-width: 200px) and (max-width: 1000px)
{
font-size: 12px;
}
`
const Joinnow=styled(Button)`
width: 172px;
height: 44px;
color:black;
background: #FFFFFF;
border-radius: 8px;
font-family:Roobert-medium;
font-weight: 500;
font-size: 14px;
color: #190F0F;
margin-top:22px;
`
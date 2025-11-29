import Image from 'next/image'
import Googlelogo from '../../../public/assets/googlelogo.png'
import Homestarlogo from '../../../public/assets/homestarlogo.png'
import Googlerating from '../../../public/assets/googlestarrating.png'
import Homestarrating from '../../../public/assets/homestarrating.png'
import styled from 'styled-components'

function Ratings(){
return(
<>
<Maindiv>
<div className='d-flex'>
<Googlelogostyle src={Googlelogo} loading="eager" priority={true}/>
<div>
<Image src={Googlerating} loading="eager" priority={true}/>
<Ratingtext>4.85/5 stars</Ratingtext>
</div>
</div>
<div className='d-flex'>
<Homestarlogostyle src={Homestarlogo} loading="eager" priority={true}/>
<Seconddiv>
<Image src={Homestarrating} loading="eager" priority={true}/>
<Ratingtext>5/5 stars</Ratingtext>
</Seconddiv>
</div>
</Maindiv>
</>
)
}
export default Ratings


const Ratingtext = styled.p`
font-family:Inter;
color:#D81159;
font-size:14px;
font-weight:600px;
text-align:center;
`
const Googlelogostyle=styled(Image)`
width:45%;
height:60%;
margin-right:30px;
@media (min-width: 260px) and (max-width: 820px){
width:18%;
height:40%;
margin-left:50px;
margin-right:40px;
}
@media (min-width: 680px) and (max-width: 820px){
    width:28%;
    height:40%;
}
`
const Homestarlogostyle=styled(Image)`
width:230%;
height:180%;
margin-top:-43px;
@media (min-width: 260px) and (max-width: 820px){
width:50%;
height:50%;
margin-top:-18px;
}
@media (min-width: 680px) and (max-width: 820px){
    width:200%;
    height:100%;
}
`
const Seconddiv=styled.div`
margin-left:-20px;
@media (min-width: 260px) and (max-width: 820px){
margin-left:-18px;
}
`
const Maindiv=styled.div`
display:flex;
width:400px;
margin-top:10px;
@media (min-width: 260px) and (max-width: 680px){
display:inline;
margin-left:20px;
}
@media (min-width: 681px) and (max-width: 820px){
    }
`
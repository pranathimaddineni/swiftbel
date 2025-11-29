import styled from 'styled-components'
import banner from '../../../../public/assets/main.png';
import carpetbanner from '../../../../public/assets/carpetmain.png';
import plumbingbanner from '../../../../public/assets/plumbingmain.svg';
import electriciansbanner from '../../../../public/assets/electriciansmain.png';
import Image from 'next/image';
import TextLoop from "react-text-loop";
import MovingBanner from './MovingBanner';
import CommonBanner from './CommonBanner';
import Ratings from '@/Components/MainHome/Ratings';
const wordArray = [
    "Home", "House", "Condo", "Storage", "Business", "Office"
]
function MainBanner(props) {
    let servicetype=props?.type
    const renderitem=()=>{
    if(servicetype==='moving'){
    return <MovingBanner/>    }
    else return <CommonBanner servicetype={servicetype}/>    }
    const movingdata={
    subheading:'Affordable, fully-insured movers with one price, upfront.',
    img:banner,
    alt:'illustration of a mover carrying moxing boxes'
    }
    const carpetdata={
    heading:'Professional carpet cleaning that makes your house dazzle',
    subheading:'Fixed upfront affordable prices. Calculate price and book online or simply call ',
    img:carpetbanner,
    alt:'illustration of a cleaning machine on carpet'
    }
    const plumbingdata={
    heading:'Licensed plumbers when you need them',
    subheading:'Upfront affordable prices. Calculate price and book online or simply call ',
    img:plumbingbanner,
    alt:'illustration of a plumbing pipe and tools'
    }
    const electriciandata={
    heading:'Your friendly local electricans you can trust',
    subheading:'Upfront affordable prices. Calculate price and book online or simply call ',
    img:electriciansbanner,
    alt:'illustration of a electronic tools'
    }
    const pressuredata={
        heading:'Professional power washers who make your house dazzle ',
        subheading:'Fixed upfront affordable prices. Calculate price and book online or simply call ',
        img:'',
        alt:''
        }
    const detailsdata=
    servicetype==='moving'?movingdata:
    servicetype==='carpetcleaning'?carpetdata:
    servicetype==='plumbers'?plumbingdata:
    servicetype==='electricians'?electriciandata:
    servicetype==='pressurewashing'?pressuredata:
    ''
    return (
        <>
        <Main>
        <Head>
        <Card1Moving>
        {detailsdata?.img ?
        <BannerMobImg src={detailsdata?.img} alt={detailsdata?.alt} loading="eager" priority={true}/>
        :''}
        <div className='left-side'>
        <div >
        <div className='text1 '>
        {servicetype==='moving'?
        <>
        Move your &nbsp;
        <TextLoop>
        {
        wordArray.map((item) =><span className='pinktext'>{item}</span>)
        }
        </TextLoop>
        &nbsp;with the push of a button.
                </>
                :
                detailsdata?.heading}
                </div>
                </div>
                <br/>
                <p className='text2'>{detailsdata?.subheading}</p>
                <br/>
                <Tiles>
                {renderitem()}
                </Tiles>
                </div>
                <div>
                <BannerImg src={detailsdata?.img} alt={detailsdata?.alt} loading="eager" priority={true}/>
                </div>
        </Card1Moving>
        <Ratings/>
        </Head>
        </Main>
        </>
         )
}
export default MainBanner
const Main = styled.div`
display:flex;
justify-content:center;
background:white;
.pinktext{
color:#D81159;
font-family:Roobert-medium;
font-weight: 500;
font-size: 40px;
    @media (min-width: 260px) and (max-width: 1099px){
        font-size: 26px;
    }
        @media (min-width: 1100px) and (max-width: 1399px){
            font-size: 30px;
        }
}
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
background:white;
}
`
const Tiles = styled.div`
display:flex;
flex-wrap:wrap;
@media (min-width: 260px) and (max-width: 820px){
    display:inline;
 }
`
const Card1Moving = styled.div`
display:flex;
background:#FFFFFF;
justify-content:space-between;
padding-top:35px;
padding-bottom:30px;
@media (min-width: 260px) and (max-width: 820px){
    flex-wrap:wrap;
    justify-content:center;
padding-left:5px;
padding-right:5px;
.text1{
    font-size: 24px;
}
}
.error{
    border:3px solid red;
    }
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 40px;
color: #190F0F;
width:700px;
    @media (min-width: 260px) and (max-width: 1099px){
        font-size: 26px;
        width:100%;
    }
        @media (min-width: 1100px) and (max-width: 1399px){
            font-size: 30px;
            width:600px;
        }
}
.left-side{
    margin-top:20px;
}
.text2{
    font-family:Roobert-medium;
    font-size:24px;
    color: #787373;
    margin-top:-6px;
    width:600px;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 18px;
        width:100%;
    }
    @media (min-width: 821px) and (max-width: 1099px){
        font-size: 18px;
        width:100%;
    }
    @media (min-width: 1100px) and (max-width: 1399px){
        font-size: 22px;
        width:100%;
    }
}
`
const BannerImg = styled(Image)`
height:321px;
width:auto;
@media (min-width: 822px) and (max-width: 1399px){
    height:261px;
    }
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const BannerMobImg = styled(Image)`
height:90%;
width:90%;
@media (min-width: 821px) and (max-width: 10000px){
   display:none;
 }
`
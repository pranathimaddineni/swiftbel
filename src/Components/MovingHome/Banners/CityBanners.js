import styled from 'styled-components'
import Image from 'next/image';
import MovingBanner from './MovingBanner';
import CommonBanner from './CommonBanner';
import Ratings from '@/Components/MainHome/Ratings';
function CityBanners(props) {
    let bannerphotos=props.photos
    let servicetype=props?.type
    let cardspic1= bannerphotos.photoOne
    let cardspic2=bannerphotos.photoTwo
    const renderitem=()=>{
    if(servicetype==='moving'){
    return <MovingBanner/>
    }
    else return <CommonBanner servicetype={servicetype}/>
    }
    console.log(props,'props')
    const movingdata={
    heading:`Affordable ${props?.cityname} movers`,
    secondtitle:'with the push of a button',
    subheading:'Affordable Upfront Prices. On Your Schedule. Satisfaction Guaranteed',
    }
    const carpetdata={
    heading:'Deep Clean Your Carpets,',
    secondtitle:' Deep Clean Your Life ',
    subheading:'Schedule online with fixed upfront pricing with a few clicks.',
    }
    const plumbingdata={
    heading:'Book a Plumber in seconds!',
    subheading:'Schedule plumbers on your schedule with just a few clicks.',
    }
    const electriciandata={
    heading:'Book an Electrician in seconds!',
    subheading:'Book an electrician on your schedule with just a few clicks. ',
    }
    const pressuredata={
        heading:'Pressure wash away your problems, on demand!',
        subheading:'Book pressure washing on your schedule with just a few clicks. ',
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
            <Card1Moving >
                 <Mob>
                 <Cards className='d-flex'>
                <CardsStyle className='card1'></CardsStyle>
                <CardsStyle className='card2'><Image src={cardspic2} className='cardimages' loading="eager" priority={true} alt={servicetype} width={500} height={500}/></CardsStyle>
                <CardsStyle className='card3'></CardsStyle>
                <CardsStyle className='card4'><Image src={cardspic1} className='cardimages' loading="eager" priority={true} alt={servicetype} width={500} height={500}/></CardsStyle>
                </Cards>
                </Mob>
                <div className='left-side'>
                <div >
                      <div className='text1 '>
                {detailsdata?.heading}
                </div>
                {detailsdata?.secondtitle?
                <p className='text3'>{detailsdata?.secondtitle}</p>
                :''}
                    </div>
                    <p className='text2'>{detailsdata?.subheading}</p>
                    <br/>
                    <Tiles>
                     {renderitem()}
                    </Tiles>
                </div>
                <Web>
                <Cards className='d-flex'>
                <CardsStyle className='card1'></CardsStyle>
                <CardsStyle className='card2'><Image src={cardspic2} className='cardimages' loading="eager" priority={true} alt={servicetype} width={500} height={500}/></CardsStyle>
                <CardsStyle className='card3'></CardsStyle>
                <CardsStyle className='card4'><Image src={cardspic1} className='cardimages' loading="eager" priority={true} alt={servicetype} width={500} height={500}/></CardsStyle>
                </Cards>
                </Web>
            </Card1Moving>
            <Ratings/>
            </Head>
            </Main>

        </>
    )

}

export default CityBanners
const Main = styled.div`
display:flex;
justify-content:center;
background:white;
overflow:hidden;
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
const Cards=styled.div`
position:absolute;
margin-top:40px;
display:flex;
position:sticky;
 @media (min-width: 260px) and (max-width:612px){
display:flex;
justify-content:center;
margin-top:0px;
}
.cardimages{
    width: 280px;
    height: 420px;
    border-radius:24px;
    @media (min-width: 260px) and (max-width:612px){
width: 180px;
height: 250px;
}
}
    .card1{
    background:#FFF9A6;
    position:relative;
    margin-right:-500px;
    transform: rotate(-5deg);
    margin-top:50px;
     @media (min-width: 260px) and (max-width:612px){
     margin-right:-280px;
    }
    }
    .card2{
    position:relative;
    margin-right:-430px;
    transform: rotate(2deg);
    @media (min-width: 260px) and (max-width:612px){
     margin-right:-280px;
    }
    }
    .card3{
    background:#FBE8EA;
    position:relative;
    margin-right:-380px;
    transform: rotate(-4deg);
    margin-top:40px;
    @media (min-width: 260px) and (max-width:612px){
     margin-right:-260px;
    }
    }
    .card4{
    position:relative;
    margin-right:-250px;
    transform: rotate(-16deg);
    @media (min-width: 260px) and (max-width:612px){
 margin-right:-50px;
    }
    }
`
const CardsStyle=styled.div`
width: 280px;
height: 420px;
margin-right:10px;
border-radius:24px;
@media (min-width: 260px) and (max-width:612px){
width: 180px;
height: 250px;
}
@media (min-width: 612px) and (max-width:984px){
   display:none;
}
`
const Mob=styled.div`
display:flex;
@media (min-width: 821px) and (max-width:9999px){
    display:none;
 }
`
const Web=styled.div`
display:flex;
@media (min-width: 260px) and (max-width:821px){
    display:none;
 }
`

const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
background:white;
@media (min-width: 260px) and (max-width:820px){
    padding-bottom:10px;
}
}
`
const Tiles = styled.div`
display:flex;
flex-wrap:wrap;
width:700px;
@media (min-width: 821px) and (max-width: 1312px){
        width: 500px;
     }
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
}
.error{
    border:3px solid red;
    }
.text1{
font-size: 44px;
color: #190F0F;
width:700px;
font-family:Roobert-medium;
font-weight: 500;
    @media (min-width: 260px) and (max-width: 1099px){
        font-size: 24px;
        width:100%;
    }
        @media (min-width: 1100px) and (max-width: 1399px){
            font-size: 30px;
            width:100%;
        }
}
.text3{
    font-size: 44px;
    color: #787878;
    font-family:Roobert-medium;
font-weight: 500;
        @media (min-width: 260px) and (max-width: 1099px){
            font-size: 24px;
            width:100%;
        }
            @media (min-width: 1100px) and (max-width: 1399px){
                font-size: 30px;
                width:100%;
            }
    }
.left-side{
    margin-top:120px;
    @media (min-width: 821px) and (max-width: 1312px){
        width: 500px;
        margin-top:80px;
     }
     @media (min-width: 985px) and (max-width: 1090px){
        width: 400px;
     }
     @media (min-width: 260px) and (max-width: 984px){
        margin-top:50px;
     }
}
.text2{
    font-family:Roobert-medium;
    font-size:20px;
    //color: #787373;
    color:black;
    margin-top:-6px;
    width:700px;
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
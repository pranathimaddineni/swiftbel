import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import LocalMoving from '../../../public/assets/localMoving.png'
import LongDistanceMove from '../../../public/assets/longDistanceMove.png'
import coorprateMove from '../../../public/assets/coorprateMove.png'
import styled from 'styled-components';
import Image from 'next/image';
const time=4500
function MovingPlace(props) {
    const [index, setIndex] = useState(0);
    const [index2, setIndex2] = useState(0);
    const [index3, setIndex3] = useState(0);
    const [index4, setIndex4] = useState(0);

    const handlebutton=()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'smooth',
            });
    }
    const MoveArray = [
     'Local Move', 'Long Distance Move', 'Corporate Move'
    ]
    const PlumberArray = [
    'Emergency service','Leaking faucets', 'Drainage cleaning', 'Smelly drains','Running Toilet'
    ]
    const ElectricianArray = [
    'Service call','Emergency service'
    ]
    const PressureArray = ['Pressure washing','Window washing','Roof cleaning','Gutter cleaning']
    const MoveImg = [
        {img:LocalMoving,text:'Enjoy the ease of moving with SwiftBel. In just few simple steps book a moving company with movers and a truck to move all your items into your new place.​',alt:'local moving'},
        {img:LongDistanceMove,text:'At SwiftBel, we take the stress and hassle out of the moving process by handling all the logistics for you. Simply provide us with your moving details and we will take care of the rest.​',alt:'Long Distances'},
         {img:coorprateMove,text:'Moving a business can be a complex and challenging process, but our team at SwiftBel is here to take it as smooth and stress-free as possible.',alt:'Corporate move'}
    ]
    const plumberImg = [
        {text:`We know that some plumbing issues can't wait, and our team is ready to respond to your emergency needs at any time of the day or night.`},
        {text:`we also specialize in fixing leaking faucets. Our plumbers are trained to quickly diagnose and repair any type of faucet, whether it's a leaky kitchen faucet, a dripping showerhead, or a leaking outdoor faucet.`},
        {text:'Clogged drains can be a major inconvenience, and our plumbers are equipped with the latest tools to clear any blockages and keep your drains flowing freely.'},
         {text:'We also specialize in resolving smelly drains. Our plumbers will diagnose and eliminate the source of the smell, leaving your drains smelling fresh and clean. Book online or contact us today to schedule a service call.'},
         {text:`A running toilet can not only be annoying but also waste a lot of water and money. Our plumbers are trained to quickly diagnose and repair any type of toilet problem, whether it's a faulty flapper, a malfunctioning fill valve, or a leaky toilet tank. Book online or contact us today to schedule a service call.`}
    ]
    const electricianImg = [
        {text:`An electrical service call is a visit by an electrician to a home or business to diagnose and repair problems with the electrical system. This may include fixing faulty wiring, replacing outdated or broken equipment, and addressing issues with power outages or surges.`},
        {text:`An electrical emergency call is a situation in which immediate assistance is required due to a dangerous or potentially life-threatening electrical issue. This can include power outages, electrical fires, and electrical shock hazards.`},
    ]
    const pressureImg = [
        {text:`Pressure washing, also known as power washing, is a method of cleaning surfaces using high-pressure water spray. At SwiftBel, our service providers use state-of-the-art pressure washing equipment to remove dirt, grime, and other buildup from a variety of surfaces, including houses, decks, patios, driveways, and sidewalks.`},
        {text:`At SwiftBel, we understand that having clean windows is an important aspect of maintaining the appearance of your property. That's why we offer professional window cleaning services in addition to our pressure washing services. Our providers use specialized equipment and techniques to clean both the inside and outside of your windows to ensure that every inch of the glass is spotless and streak-free. `},
        {text:'At SwiftBel, we understand that a dirty roof can detract from the overall appearance of your property, which is why we also offer professional roof cleaning services. Our roof cleaning services can remove dirt, grime, and other buildup from your roof, leaving it looking like new again. Our service providers use specialized equipment and techniques to safely and effectively remove dirt, moss, and other buildup from your roof without causing damage to the shingles or other roofing materials.'},
        {text:`At SwiftBel, we understand the importance of keeping your gutters clean and functioning properly. That's why we offer professional gutter cleaning services. Our gutter cleaning services can remove leaves, debris, and other buildup from your gutters, ensuring that they work properly and prevent water damage to your property. We use specialized equipment and techniques to safely and effectively clean your gutters without causing damage to the gutter system or surrounding areas.`},
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                return prevIndex + 1 < MoveArray.length ? prevIndex + 1 : 0;
            });
            setIndex2((prevIndex) => {
                return prevIndex + 1 < PlumberArray.length ? prevIndex + 1 : 0;
            });
            setIndex3((prevIndex) => {
                return prevIndex + 1 < ElectricianArray.length ? prevIndex + 1 : 0;
            });
            setIndex4((prevIndex) => {
                return prevIndex + 1 < PressureArray.length ? prevIndex + 1 : 0;
            });
        }, time);

        return () => clearInterval(interval);
    });

    let servicetype = props?.type
    let mainheadtext = props?.type==='moving'?'One place for all your moving needs!':
    props?.type==='carpetcleaning'?'Effortlessly book your carpet cleaner with Swiftbel - the hassle-free way to a cleaner home.':
    props?.type==='plumbers'?'SwiftBel: Plumbing solutions at your service, whenever you need them.':
    props?.type==='electricians'?'SwiftBel: Electricial solutions at your service, whenever you need them.':
    props?.type==='pressurewashing'?'SwiftBel: Pressure washing solutions at your service, whenever you need them.':
    ''
    let carpetbodytext={
    title:'Carpet Cleaners',
    description:'Our skilled technicians will meticulously clean your carpets and tackle any stains or problem areas with ease. Enjoy a fresh and allergen-free home in just 1-2 hours with our quick drying methods. Trust us to leave your carpets spotless, deodorized, and sanitized.'
    }
    let bodytexts=props?.type==='carpetcleaning'?carpetbodytext:''
    return (
        <>
            <Main>
                <Head>
            <Movingplace>
                <p className='text1'>{mainheadtext}</p>
                {servicetype==='moving'?<>
                {/* // <div className='d-flex'>
                //     {MoveArray.map((item, indexs) =>
                //         <MovingButton className={index===indexs?'button':''} onClick={()=>setIndex(indexs)} variant={index === indexs ? "dark" : "light"} size='md'>
                //         {item}
                //     </MovingButton>
                //     )}
                // </div> */}
                 <Webdiv>
                 {MoveArray.map((item, indexs) =>
                        <MovingButton className={index===indexs?'button':''} onClick={()=>setIndex(indexs)} variant={index === indexs ? "dark" : "light"} size='md'>
                        {item}
                    </MovingButton>
                    )}
             </Webdiv>
             <Mobdiv>
             <MovingButton className='button mt-3' variant="dark" size='md'>
             {MoveArray[index]}
             </MovingButton>
             </Mobdiv>
             </>
                :
                servicetype==='plumbers'?<>
                <Webdiv>
                    {PlumberArray.map((item, indexs) =>
                        <MovingButton className={index2===indexs?'button':''} onClick={()=>setIndex2(indexs)} variant={index2 === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </Webdiv>
                <Mobdiv>
                <MovingButton className='button mt-3' variant="dark" size='md'>
                {PlumberArray[index2]}
                </MovingButton>
                </Mobdiv>
                </>
                :
                servicetype==='pressurewashing'?<>
                <Webdiv>
                    {PressureArray.map((item, indexs) =>
                        <MovingButton className={index4===indexs?'button':''} onClick={()=>setIndex4(indexs)} variant={index4 === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </Webdiv>
                <Mobdiv>
                <MovingButton className='button mt-3' variant="dark" size='md'>
                {PressureArray[index4]}
                </MovingButton>
                </Mobdiv>
                </>
                :
                servicetype==='electricians'?
                <div className='d-flex'>
                    {ElectricianArray.map((item, indexs) =>
                        <MovingButton className={index3===indexs?'button':''} onClick={()=>setIndex3(indexs)} variant={index3 === indexs ? "dark" : "light"} size='md'>
                            {item}
                        </MovingButton>
                    )}
                </div>
                :
                ''}
                <MovingBanner>
                    <div   className='d-flex   p-1'>
                        <div className='firstdiv'>
                        {servicetype==='moving'?
                            <>
                            <h3 >{MoveArray[index]}</h3>
                            <p >{MoveImg[index].text}</p>
                            </>
                            :
                            servicetype==='plumbers'?
                            <>
                            <h3 >{PlumberArray[index2]==='Emergency service' ? 'Emergency service call':PlumberArray[index2]}</h3>
                            <p >{plumberImg[index2].text}</p>
                            </>
                            :
                            servicetype==='electricians'?
                            <>
                            <h3 >{ElectricianArray[index3]}</h3>
                            <p >{electricianImg[index3].text}</p>
                            </>
                            :
                            servicetype==='pressurewashing'?
                            <>
                            <h3 >{PressureArray[index4]}</h3>
                            <p >{pressureImg[index4].text}</p>
                            </>
                            :
                            <>
                            <h3 >{bodytexts?.title}</h3>
                            <p >{bodytexts?.description}</p>
                            </>
                            }
                            <br />
                            <div >
                                <HomeSpButton variant='outline-dark' size='md' onClick={()=>handlebutton()}>
                                    {servicetype==='moving'?'Get an estimate':servicetype==='plumbers'||servicetype==='electricians'?'See your price':'Calculate your price'}</HomeSpButton>
                            </div>
                            <br />
                            <br />
                        </div>
                        {servicetype==='moving'?
                        <HandImage src={MoveImg[index].img} alt='hand' />
                        :''}
                    </div>
                </MovingBanner>
            </Movingplace>
            </Head>
            </Main>
            <br/>
        </>
    )
}
export default MovingPlace;
const Main = styled.div`
display:flex;
justify-content:center;
margin-top:64px;
@media (min-width: 260px) and (max-width: 820px){
    margin-top:10px;
}
.firstdiv{
margin-top:45px;
}
@media (min-width: 260px) and (max-width: 820px){
    .firstdiv{
        margin-top:0px;
        }
}
`
const Webdiv= styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 820px){
display:none;
}
`
const Mobdiv= styled.div`
display:inline;
@media (min-width: 821px) and (max-width: 9999px){
display:none;
}
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
    padding-left:0px;
padding-right:0px;
}
`

const Movingplace = styled.div`
padding-top:35px;
padding-bottom:30px;
.button{
    background-color:#D81159;
    border:1px solid #D81159;
    color:#fff;
}
@media (min-width: 260px) and (max-width: 820px){
    flex-wrap:wrap;
    justify-content:center;
padding-left:25px;
padding-right:25px;
}
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 40px;
color: #190F0F;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 21px;
    }
}
.left-side{
    margin-top:40px;
}
h3{
    margin-top:30px;
    font-size:24px;
}
p{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 16px;
color: #787373;
}
`

const MovingBanner = styled.div`
display:flex;
justify-content:space-between;
background:#FFFFFF;
background-color:#fff;
border:1px solid #FAFAFA;
border-radius:10px;
padding-left:25px;
padding-right:25px;


`
const HandImage = styled(Image)`
Width: 466.39px;
Height:320px;
@media (min-width: 1000px) and (max-width: 1399px){
    height:231px;
    }
@media (min-width: 260px) and (max-width: 820px){
    display:none;
 }
`
const HomeSpButton = styled(Button)`
width:222px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 16px;
margin-bottom:1rem;
border:1px solid #000;
border-radius:8px;
`
const MovingButton = styled(Button)`
width:222px;
height:44px;
font-family: Roobert-medium;
font-weight: 500;
font-size: 16px;
margin-right:13px;
margin-bottom:1rem;
color:#787373;
border:1px solid #787373;
border:1px solid #000;
border-radius:8px;
@media (min-width: 260px) and (max-width: 820px){
    font-size: 14px;
 }
`
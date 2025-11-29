import styled from 'styled-components';
import proppic from '../../../public/assets/dummypro.jpg';
import quotation from '../../../public/assets/quotation.png';
import Image from 'next/image';
function ReviewPage(props) {
    const movingreviewdata=
    {
    name:'Pierre Castro',
    date:'22nd October 2022',
    review:'Working with SwiftBel helped with a lot of the anxiety that may come with an already stressful event, moving. I was able to connect with an amazing moving company that was vetted by SwiftBel. Truly appreciative that there is a technology like SwiftBel around to navigate the plethora of home services.'
    }
    const carpetreviewdata=
    {
    name:'Avery James',
    date:'02 Janurary 2023 ',
    review:'I recently used Swiftbel carpet cleaners and they exceeded my expectations. They were efficient, professional and thorough. They removed several stubborn stains and left my carpets looking and smelling fresh and clean. I highly recommend them for a professional, reliable and high-quality cleaning service.'
    }
    const plumbingreviewdata=
    {
    name:'Zarina Zephyr',
    date:'11 Janurary 2023 ',
    review:`I recently used SwiftBel plumbing on demand for a emergency leak in my bathroom and I couldn't be happier with the service I received. The plumber dispatched to my home, was prompt, professional, and knowledgeable. He quickly identified the problem and provided a solution that not only fixed the leak but also prevented any future issues. The cost was also very reasonable. I highly recommend SwiftBel all your plumbing needs.`
    }
    const electricianreviewdata=
    {
    name:'Emily Williams',
    date:'14 Janurary 2023 ',
    review:`I recently used SwiftBel for an electrical issue in my home and was extremely impressed with the level of service I received. The electrician arrived on time and was very professional and knowledgeable. He quickly identified the problem and had it fixed in no time. I was particularly impressed with the transparent pricing, which was clearly communicated to me before the work was done. I will definitely be using SwiftBel again in the future and would highly recommend them to anyone in need of a reliable electrician.`
    }
    const pressurereviewdata=
    {
    name:'Olivia Rodriguez',
    date:'Jan 21st, 2023',
    review:`I recently used the services of SwiftBel for pressure washing my home and I am extremely satisfied with the results. The team was very professional, punctual and was able to remove years of built-up dirt and grime from the exterior of my home. The end result was amazing, my house looks like new again. I also loved their on-demand service which made it really convenient for me to schedule the cleaning at my own convenience. I would highly recommend SwiftBel to anyone in need`
    }
        const data =
        props?.type==='moving'?movingreviewdata:
        props?.type==='carpetcleaning'?carpetreviewdata:
        props?.type==='plumbers'?plumbingreviewdata:
        props?.type==='electricians'?electricianreviewdata:
        props?.type==='pressurewashing'?pressurereviewdata:
        ''
    return (
        <>
            <Main>
            <Segment  className='p-3'>
                     <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                           <ProImage src={proppic} />
                           <div>
                              <p className='name'>{data?.name}</p>
                              <p className='nickname'>{data?.date}</p>
                           </div>
                        </div>
                        <Image src={quotation} className='quotation'/>
                     </div>
                 <p className='review'>{data?.review}</p>
                  </Segment>
            </Main>
        </>
    )
}

export default ReviewPage

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top:64px;
    @media (min-width: 260px) and (max-width: 820px){
       padding-left:10px;
       margin-top:24px;
    }
    `

const Segment = styled.div`
border-radius:13px;
width:864px;
background:white;
background-color:white;
margin-right:15px;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.nickname{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.review{
font-size: 16px;
color: #787373;
}
.quotation{
    height:36px;
    width:36px;
}
@media (min-width: 260px) and (max-width: 820px){
    width:372px;
}
`
const ProImage = styled(Image)`
border-radius:50%;
height:48px;
width:48px;
margin-right:10px;
`


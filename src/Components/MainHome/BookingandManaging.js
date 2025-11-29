import styled from 'styled-components'
import moveStep1 from '../../../public/assets/moveStep1.webp'
import moveStep2 from '../../../public/assets/moveStep2.webp'
import moveStep3 from '../../../public/assets/moveStep3.webp'
import Image from 'next/image'

function BookingandManaging(props) {
  const hometext={
   subheader:'Book service providers in 3 easy steps',
   step1:'Book your home service',
   step1desc:`Choose the home service you want, enter your location, then choose a day & time. It's that easy!`,
   step2desc:`Your chosen service provider will meet you at your location, then get the job done the way you want.  No surprises on the bill.`,
   step3:'Review the charges, pay, and rate',
   step3desc:`Check the bill to confirm the charges. Pay with your card, then rate your service provider. They want you to be happy`
  }
  const movingtext={
   subheader:`Book movers in 3 easy steps`,
   step1:'Book your move',
   step1desc:`Enter your pickup location and destination, select the vehicle that is right for you, and choose a day/time. It's that easy!`,
   step2desc:`${props?.cityname?`${props?.cityname} SwiftBel movers`:`movers`} will arrive with the right equipment to load your stuff and secure it safely. We'll see you at the destination!`,
   step3:'Unload, pay and rate',
   step3desc:`We unload your items and place them right where you want them. Pay with your card, then review your experience. We'll see you next time!`
  }
  const carpettext={
   subheader:'Book carpet cleaners in 3 easy steps',
   step1:'Book your carpet cleaning',
   step1desc:`Enter your location and choose your day/time. It's that easy!`,
   step2desc:'Our professional carpet cleaners come equipped with all the necessary tools to tackle any cleaning task and leave your carpets looking and feeling refreshed',
   step3:'Pay and rate',
   step3desc:`Pay with your card, then review your experience. We'll see you next time!`
  }
  const plumbingtext={
    subheader:'Book plumbers in 3 easy steps',
    step1:'Book your service',
    step1desc:`Enter your location and choose your day/time. It's that easy!`,
    step2desc:'Our professional plumbers come equipped with all the necessary tools to tackle any plumbing task. ',
    step3:'Pay and rate',
    step3desc:`Pay with your card, then review your experience. We'll see you next time!`
   }
   const electriciantext={
    subheader:'Book electricians in 3 easy steps',
    step1:'Book your service',
    step1desc:`Enter your location and choose your day/time. It's that easy!`,
    step2desc:'Our professional electricians come equipped with all the necessary tools to tackle any electricial tasks.',
    step3:'Pay and rate',
    step3desc:`Pay with your card, then review your experience. We'll see you next time!`
   }
   const pressuretext={
    subheader:'Book pressure washers in 3 easy steps',
    step1:'Book your service',
    step1desc:`Enter your location and choose your day/time. It's that easy!`,
    step2desc:'Our professional cleaners come equipped with all the necessary tools to tackle any cleaning tasks. ',
    step3:'Pay and rate',
    step3desc:`Pay with your card, then review your experience. We'll see you next time!`
   }
   let type=props?.type
   let maindata=type==='moving'?movingtext:
   type==='carpetcleaning'?carpettext:
   type==='plumbers'?plumbingtext:
   type==='electricians'?electriciantext:
   type==='pressurewashing'?pressuretext:

   hometext
  return (
    <>
      <Main>
        <Head>
      <Segment>
        <div >
          <Title>How it works</Title>
          <SubHeader>{maindata?.subheader}</SubHeader>
        </div>
        <Stepstyle >
          <div>
            <div className='d-flex justify-content-center'>
            <Image src={moveStep1} alt="Homeowner booking a service provider on SwiftBel app " className='mob-step-image mb-3' />
            </div>
            <Image src={moveStep1} alt="Homeowner booking a service provider on SwiftBel app " className='step-image mb-3' />
            <StepSubText >Step 1</StepSubText>
            <StepHeader className='mb-2' >{maindata?.step1}</StepHeader>
            <StepSubText>
            {maindata?.step1desc}
            </StepSubText>
          </div>
          <div>
          <div className='d-flex justify-content-center'>
            <Image src={moveStep2} alt="Homeowner tracking the service providers location in SwifBel app" className='mob-step-image mb-3' />
            </div>
            <Image src={moveStep2} alt="Homeowner tracking the service providers location in SwifBel app" className='step-image mb-3' />
            <StepSubText >Step 2</StepSubText>
            <StepHeader className='mb-2' >We will take it from there ​ </StepHeader>
            <StepSubText>
            {maindata?.step2desc}
            </StepSubText>
          </div>
          <div>
          <div className='d-flex justify-content-center'>
            <Image src={moveStep3} alt="Homeowner reviewing the charges in SwiftBel app" className='mob-step-image mb-3' />
           </div>
            <Image src={moveStep3} alt="Homeowner reviewing the charges in SwiftBel app" className='step-image mb-3' />
            <StepSubText >Step 3</StepSubText>
            <StepHeader className='mb-2' >{maindata?.step3}</StepHeader>
            <StepSubText>
            {maindata?.step3desc}
            </StepSubText>
          </div>
        </Stepstyle>
        <br />
      </Segment>
      </Head>
      </Main>
    </>
  )
}
export default BookingandManaging;
const Main = styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width: 1311px){
margin-left:10px;
margin-right:10px;
}
`
const Head=styled.div`
width:1312px;
padding-top:64px;
padding-bottom:64px;
padding-left:20px;
padding-right:20px;
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:24px;
padding-bottom:24px;
padding-left:0px;
padding-right:0px;
}
`

const Segment = styled.div`
@media (min-width: 260px) and (max-width: 820px){
padding-left:25px;
padding-right:25px;
}
@media (min-width: 260px) and (max-width: 1145px)
{
    padding:0rem;
    margin-top:30px;
}
`
const Title = styled.h2`
font-family:Roobert-medium;
margin-bottom:1rem;
font-size:44px;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1145px)
 {
padding-left:20px;
padding-right:20px;

 }
`
const SubHeader = styled.p`
color:#787373;
font-size:16px;
font-family:Inter;
margin-bottom:1rem;
font-weight: 500;
@media (min-width: 200px) and (max-width: 1145px)
 {
padding-left:20px;
padding-right:20px;
 }
`
const Stepstyle = styled.div`
display:flex;
justify-content:space-between;
.mob-step-image{
  display:none;
}
.step-image{
  width:304px;
  height:304px;
  border-radius:50px;
}
@media (min-width: 260px) and (max-width: 1145px)
 {
  display: inline;
  .step-image{
    display:none
  }
  .mob-step-image{
    display:flex;
    width:304px;
  height:304px;
   justify-content:center;
  }
 }
`
const StepHeader = styled.h5`
margin-left:20px;
font-family:Roobert-medium;
@media (min-width: 1145px) and (max-width: 9999px)
{
    width:350px;
    font-weight:500;
    margin-bottom:35px;
    margin-left:0px;
    font-size:23px;

}
`
const StepSubText = styled.p`
color:#787373;
font-weight: 400;
margin-left:20px;
margin-right:20px;
font-family:Inter;
@media (min-width: 1145px) and (max-width: 6000px)
{
    width:300px;
    margin-left:0px;
    font-size:17px;
}
`
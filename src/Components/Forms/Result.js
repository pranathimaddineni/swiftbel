import { useRouter } from "next/router"
import styled from "styled-components"
import Phone from '../../../public/assets/phone.png';
import msg from '../../../public/assets/msg.png';
import Image from "next/image";
import { useIntercom } from "react-use-intercom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { isAuthenticated } from "@/utils/Authentication";

function Result(props){
let router = useRouter();
const [phoneHover, setPhoneHover] = useState("Call to Speak")
const details=[
{
'title': 'Type of house',
'data':router?.query?.typeofHouse
},
{
'title': 'Date and time',
'data':router?.query?.date+', '+router?.query?.time,
},
]
const carpetsubdetails=[
{
'title': 'Number of rooms',
'data':router?.query?.additionalRoom
},
{
'title': 'Number of stairs',
'data':router?.query?.numberofStair
},
{
'title': 'Number of hallways',
'data':router?.query?.additionalHall
}
]

const plumbingsubdetails=[
{
'title': 'Type of call',
'data':router?.query?.typeOfCall
},
]
const pressuresubdetails=[
    {
    'title': 'Areas to be cleaned',
    'data':typeof(router?.query?.areasToBeCleaned)==='object'?router?.query?.areasToBeCleaned?.join(', '):router?.query?.areasToBeCleaned
    },
    {
    'title': 'Approximate range of the cleaning area ',
    'data':router?.query?.approxSizeInSqFt + ' sqft'
    },
    ]

let subdetails=
props?.type==='carpetcleaning'?carpetsubdetails:
props?.type==='plumbers'||props?.type==='electricians'?plumbingsubdetails:
props?.type==='pressurewashing'?pressuresubdetails:
''
const { show } = useIntercom();

const handlephoneLeave = () => {
    return setPhoneHover('Call to Speak')
}
const handlephoneHover = () => {
    return setPhoneHover("(604) 358-4116")
}

let customword=
props?.type==='carpetcleaning'?'carpet cleaning':
props?.type==='plumbers'?'plumbing':
props?.type==='electricians'?'electric issue fixing':
props?.type==='pressurewashing'?'cleaning':
''
let servicetype=
props?.type==='carpetcleaning'?'Carpet Cleaning':
props?.type==='plumbers'?'Plumbers':
props?.type==='electricians'?'Electricians':
props?.type==='pressurewashing'?'Pressure Washing':
''
const checkout = () => {
    localStorage.setItem('data', JSON.stringify(router?.query))
    localStorage.setItem('type', servicetype)
        if (router?.query?.price) {
            if (isAuthenticated()) {
                router.push({ pathname: `/payment`,query:{servicetype:servicetype}})
            }
            else {
                router.push({ pathname: `/details`,query:{servicetype:servicetype}})
            }
        }
    }
return(
    <Main>
    <Numbersdiv>
    {details?.map((item,index)=>{
    return(
        <FormInnerdiv className='d-flex justify-content-between' key={index}>
        <div>
         {item?.title}
        <Text>{item?.data}</Text>
        </div>
        </FormInnerdiv>
    )
    })}
    </Numbersdiv>
    <Numbersdiv>
    {subdetails?.map((item,index)=>{
    return(
        <FormInnerdiv  key={index}>
        <div>
         {item?.title}
        <Text>{item?.data}</Text>
        </div>
        </FormInnerdiv>
    )
    })}
   </Numbersdiv>
   <FormInnerdiv className='addressdiv d-flex justify-content-between mt-1'>
        <div>
         Address
        <Text>{router?.query?.address}</Text>
        </div>
        </FormInnerdiv>
   <br/>
   <PriceSection className='d-flex justify-content-between'>
    <h6>Price</h6>
    {router?.query?.extrahour?
    <div>
    <h5 >${router?.query?.price} <span className="pricetext">for the first hour</span></h5>
    <h5>${router?.query?.extrahour} <span className="pricetext">for each additional hour </span></h5>
    </div>
    :
    <h4>${router?.query?.price}</h4>
     }
    </PriceSection>
    <Hr/>
    <PriceSection className='d-flex justify-content-between'>
    <h6>Due now</h6>
    <h4>$0</h4>
    </PriceSection>
   <div className="d-flex justify-content-start">
    <Subdiv>
        <br/>
   <p className='text2'>Reserve at <span className="spink">no cost</span>, you'll only pay after your {customword} is completed</p>
   <Actions onClick={()=>checkout()}
                        variant='dark' >
                        Reserve
                </Actions>
                <br/>
                <CallUsWrapper>
                    <CallusActions className='' variant='light' onClick={show}>
                        <div className='imgwrap'>
                            <Image className='img' src={msg} />
                            Chat with someone
                        </div>

                    </CallusActions>

                    <CallusActions
                        variant='light' onMouseOver={handlephoneHover} onMouseLeave={handlephoneLeave} >
                        <div className='imgwrap'>
                            <Image className='img' src={Phone} />
                            {phoneHover ? phoneHover : 'Call to Speak"'}
                        </div>
                    </CallusActions>
                </CallUsWrapper>
                </Subdiv>
      </div>
    </Main>
)
}
export default Result

const Main = styled.div`
width:75%;
display:inline;
background:white;
padding:25px;
border-radius:8px;
margin-right:10px;
.text2{
    font-family:Inter;
    font-size: 14px;
    color: #787373;
    text-align :center;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 14px;
        margin-left:0px;
    }
}
@media (min-width: 260px) and (max-width: 820px){
    margin-left:50px;
}
.addressdiv{
width:100%;
}
`
const Numbersdiv = styled.div`
display:flex;
flex-wrap:wrap;
@media (min-width: 260px) and (max-width: 820px){
display:inline;
}
`
const PriceSection=styled.div`
margin-right:64px;
@media (min-width: 260px) and (max-width: 969px){
    margin-right:0px;
 }
 .pricetext{
  font-size:14px;
 }
`
const Subdiv=styled.div`
width:100%;
margin-right:30px;
.spink{
color:#D81159;
font-weight:500;
}
@media (min-width: 260px) and (max-width: 969px){
    margin-right:30px;
}
`
const Hr=styled.hr`
margin-right:60px;
@media (min-width: 260px) and (max-width: 969px){
    margin-right:0px;
 }
`
const Actions = styled(Button)`
width:96%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 969px){
    margin-left:0px;
    width:290px;
    margin-bottom:10px;
 }
`
const CallUsWrapper = styled.div`
display:flex;
justify-content:center;
padding-right:20px;
padding-left:5px;
margin-top:20px;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
    padding-left:0px;
  }
`
const CallusActions = styled(Button)`
width:250px;
margin-right:10px;
height: 48px;
border-radius: 8px;
font-size: 14px;
border:1px solid #190F0F;
background:#fff;
font-family:Roobert-medium;
.imgwrap{
    alignSelf:center;
    justifyContent:center;
}
.img{
    width:8%;
    height:auto;
    align-self:center;
    margin-right:5px;
}
@media (min-width: 260px) and (max-width: 969px){
   width:290px;
   margin-bottom:10px;

 }
`
const FormInnerdiv = styled.div`
padding-top:6px;
margin-left:-7px;
margin-bottom:20px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
width:200px;
margin-right:60px;
@media (min-width: 260px) and (max-width: 820px){
    width: 350px;
    margin-right:0px;
}
`
const Text = styled.p`
font-size:16px;
font-family: Inter;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"

function ServicePayment(props){
    const [detdata, setDetData] = useState(props?.detdata||{})
    console.log(detdata,'dett')
    useEffect(()=>{
        setDetData(props?.detdata)
      },[props?.detdata,props?.type])
    console.log(props?.detdata,'inservice')
    const details=[
        {
        'title': 'Type of house',
        'data':detdata?.typeofHouse
        },
        {
        'title': 'Date and time',
        'data':detdata?.date+', '+detdata?.time,
        },
        ]
        const carpetsubdetails=[
            {
            'title': 'Number of rooms',
            'data':detdata?.additionalRoom
            },
            {
            'title': 'Number of stairs',
            'data':detdata?.numberofStair
            },
            {
            'title': 'Number of hallways',
            'data':detdata?.additionalHall
            }
            ]

            const plumbingsubdetails=[
            {
            'title': 'Type of call',
            'data':detdata?.typeOfCall
            }
            ]
            const pressuresubdetails=[
                {
                'title': 'Areas to be cleaned',
                'data':typeof(detdata?.areasToBeCleaned)==='object'?detdata?.areasToBeCleaned?.join(', '):detdata?.areasToBeCleaned
                },
                {
                'title': 'Approximate range of the cleaning area ',
                'data':detdata?.approxSizeInSqFt + ' sqft'
                },
                ]
            let router = useRouter()
            let subdetails=
            router?.query?.servicetype==='Carpet Cleaning'?carpetsubdetails:
            router?.query?.servicetype==='Plumbers'||router?.query?.servicetype==='Electricians'?plumbingsubdetails:
            router?.query?.servicetype==='Pressure Washing'?pressuresubdetails:
            null
return(
    <MainContainer>
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
        <FormInnerdiv key={index} className='d-flex justify-content-between'>
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
        <Text>{detdata?.address}</Text>
        </div>
        </FormInnerdiv>
        <br/>
    <Hr/>
    <PriceSection className='d-flex justify-content-between'>
    <p>Price</p>
    {detdata?.extrahour?
    <div>
    <h5 >${detdata?.price} <span className="pricetext">for the first hour</span></h5>
    <h5>${detdata?.extrahour} <span className="pricetext">for each additional hour </span></h5>
    </div>

    :
   <h4>${detdata?.price||detdata?.finalPrice}</h4>
    }
    </PriceSection>
    </MainContainer>
)
}
export default ServicePayment

const MainContainer = styled.div`
border-radius:12px;
border:1px solid #F3F3F3;
padding:45px;
background-color:#FFFFFF;
@media (min-width: 260px) and (max-width: 767px){
    margin-left:15px;
    padding:0px;
    border:0
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
const Hr=styled.hr`
margin-right:10px;
`
const PriceSection=styled.div`
margin-right:24px;
.pricetext{
    font-size:14px;
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
margin-right:60px;
width:180px;
@media (min-width: 260px) and (max-width: 820px){
    width: 350px;
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
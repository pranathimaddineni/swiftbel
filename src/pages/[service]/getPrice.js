import CarpetCleaningForm from "@/Components/Forms/CarpetCleaningForm"
import Result from "@/Components/Forms/Result"
import TrackingMap from "@/Components/googlemap/TrackingMap"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import back from '../../../public/assets/back.png'
import Geocode from "react-geocode";
import PlumberForm from "@/Components/Forms/PlumberForm"
import { Button } from "react-bootstrap"
import ElectriciansForm from "@/Components/Forms/ElectriciansForm"
import PressurewashingForm from "@/Components/Forms/PressurewashingForm"
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");

function getPrice(){
    let router=useRouter();
    let details = router?.query?.price
    let condition = details?.length>0
    const [from,setFrom]=useState({})
    let uniquename = router.asPath.split('/');
    const servicename = uniquename[1]
    console.log(servicename,'servname')
    const handleBack=()=>{
     if(details?.length>0){
     router.push({pathname:`/${servicename}/getPrice`,query:{address:router?.query?.address}})
     }
     else if(!details?.length>0){
     router.push({pathname:`/${servicename}`})
     }
    }
    function formsetup(){
        if(servicename==='carpetcleaning'){
        return <CarpetCleaningForm />
        }
        else if(servicename==='plumbers'){
        return <PlumberForm/>
        }
        else if(servicename==='electricians'){
            return <ElectriciansForm/>
            }
            else if(servicename==='pressurewashing'){
                return <PressurewashingForm/>
                }
        else return null
        }
    useEffect(()=>{
        Geocode.fromAddress(`${router?.query?.address}`).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setFrom({ lat: lat, lng: lng })
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
    },[])

return(
    <>
<div className="main">
<Main>
     <Head>
        <Headdiv >
     <Text onClick={()=>handleBack()} variant='light'><Backicon src={back} /></Text>
      <div>
      <h2 className="headtag">{condition ? 'Confirm and Reserve':'Calculate your price'}</h2>
      <p className='subheader'>{condition ? `Based on the inputs your calculated price is $${router?.query?.price}`:`Tell us a bit about your home and we will help you calculate the cost`}</p>
      </div>
      <div></div>
      </Headdiv>
      <div className='d-flex mt-2'>
      {!condition ?
      <>
      {formsetup()}
      </>
      :
      <Result type={servicename}/>
      }
      <MapForm>
      <TrackingMap
      fromAddres={from}
      center={from}
    zoom={2}
      />
      </MapForm>
      </div>
     </Head>
</Main>
</div>
    </>
)
}
export default getPrice

const Main = styled.div`
display:flex;
justify-content:center;
@media (min-width: 1150px) and (max-width: 1310px){
padding-left:50px;
padding-right:50px;
}
.headtag{
    text-align:center;
    font-family:Roobert-medium;
    @media (min-width: 260px) and (max-width: 820px){
        padding-left:15px;
        padding-right:15px;
        text-align:start;
        margin-left:50px;
    }
}
.subheader{
font-size: 16px;
color:#787373;
font-weight: 400;
text-align:center;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:15px;
    padding-right:15px;
    text-align:start;
    width:80%;
    margin-left:50px;
}
}
`
const Headdiv = styled.div`
display:flex;
justify-content:space-between;
`
const Head=styled.div`
width:1312px;
padding-top:24px;
padding-bottom:64px;
padding-left:20px;
padding-right:20px;
`
const Text = styled(Button)`
font-size: 16px;
cursor:pointer;
border-radius:50%;
color:#787373;
font-weight: 400;
height:40px;
width:40px;
@media (min-width: 260px) and (max-width: 820px){
    padding-left:15px;
    padding-right:15px;
    margin-left:40px;
    display:none;
}
`
const Backicon = styled(Image)`
height:20px;
width:20px;
margin-top:-3px;
margin-left:-4px;
@media (min-width: 260px) and (max-width: 820px){
    margin-left:-6px;
}
`
const MapForm = styled.div`
width:80%;
padding:20px;
background-color:#fff;
border-radius:8px;
height:550px;
@media (min-width: 260px) and (max-width: 920px){
 display:none
}
`
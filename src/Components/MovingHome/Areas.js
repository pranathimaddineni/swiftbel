import { daataMeta } from "@/utils/DataList";
import { useRouter } from "next/router";
import styled from "styled-components"
import TrackingMap from "../googlemap/TrackingMap"

function Areas(props){
const center = props?.coord;
console.log(props?.coord,'props')
let router = useRouter();
// const sites=
// ['Abbotsford','Pitt Meadows','Port Moody','Langley','White Rock','Surrey','Nort Vancouver',
// 'Coquitlam','Delta','South Surrey','Mission','New Westminister','Burnaby','Chilliwack','Richmond',
// 'Aldergrove','squamish','West Vancouver','Maple Ridge','Whistler']
const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
 let requiredareas= daataMeta?.filter((x)=>x.province===props?.province)
 let areas= requiredareas?.map((x)=>x.nameId)
 let finalareas=areas?.filter((x)=>x!== props?.cityname.toLowerCase())
return(
<Main>
    <Head>
<Firstdiv>
<Heading>AREAS WE SERVICE</Heading>
<Hr/>
<SubHeading>SwiftBel moves people in {props?.cityname} area including :</SubHeading>
<br/>
<CitiesStyle >
{finalareas?.map((x,index)=>{
    return(
        <p key={index} className='city' onClick={()=>{router.push(`/moving/${x.toLowerCase()}`)}}>
        {x==='richmondhill'?'Richmond Hill':
         x==='northvancouver'?'North Vancouver':
        x.split(' ')
        .map(a => a.trim())
        .map(a => a[0].toUpperCase() + a.substring(1))
        .join("")}</p>
    )
})
}
</CitiesStyle>
<br/>
<br/>
</Firstdiv>
<div className="seconddiv">
<Heading>LOCATION DETAILS</Heading>
<Hr/>
<SubHeading>SwiftBel {props?.cityname}</SubHeading>
{/* <SubHeading>8331 EastLake Dr. Burnaby,British Columbia V5A 4W2</SubHeading> */}
{/* <SubHeading>📞(604) 358-4116 </SubHeading> */}
<br/>
{days?.map((x,index)=>{
return(
<div className="daystime d-flex justify-content-between" key={index}>
<p>{x}</p>
<SubHeading>8:00 am - 6:00 pm</SubHeading>
</div>
)
})}

</div>
<div className="thirddiv">
<MapForm>
    {props?.cityname==='Vancouver'?
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d333666.67588263704!2d-122.700971!3d49.2049054!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f3fc0f437dbf923%3A0xba6917015074048c!2sSwiftBel%20Movers%20-%20On-Demand%20Moving%20and%20Delivery!5e0!3m2!1sen!2sca!4v1676265400116!5m2!1sen!2sca" width="300" height="250" style={{borderRadius:'8px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        :
      <TrackingMap
      fromAddres={center}
      />
     }
      </MapForm>
</div>
    </Head>
</Main>
)
}
export default Areas

const Main = styled.div`
display:flex;
justify-content:center;
margin-top:64px;
margin-bottom:64px;
background:white;
font-family:Inter;
`
const Head=styled.div`
width:1312px;
background:white;
display:flex;
justify-content:space-between;
padding:20px;
.daystime{
margin-top:-8px;
}
   .seconddiv{
    width:300px;
   }
   .thirddiv{
    width:330px;
   }
   @media (min-width: 821px) and (max-width: 1250px){
    width:100%;
    }
@media (min-width: 260px) and (max-width: 820px){
    margin-left:20px;
    margin-right:20px;
    display:inline;
    align-items:center;
    width:100%;
}
`
const MapForm = styled.div`
width:100%;
padding:20px;
background-color:#fff;
border-radius:8px;
height:250px;
@media (min-width: 260px) and (max-width: 920px){
 display:none
}
`
const Firstdiv=styled.div`
width:480px;
@media (min-width: 821px) and (max-width: 1250px){
    width:440px;
    }
@media (min-width: 260px) and (max-width: 820px){
width:340px;
}
`
const CitiesStyle=styled.div`
display:flex;
flex-wrap:wrap;
.city{
width:160px;
text-decoration:underline;
cursor:pointer;
}
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size:26px;
`
const SubHeading=styled.p`
color:#787878;
font-size:14px;
font-weight:500;
`
const Email=styled.p`
color:#787878;
font-size:14px;
font-weight:500;
text-decoration:underline;
`
const Hr = styled.hr`
width:100px;
border:2px solid #D81159;
margin-top:-8px;
`
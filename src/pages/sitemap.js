import { daataMeta } from "@/utils/DataList"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"

function sitemap(){
const[activePage,setActivePage]=useState('Services offered')
const titles= ['Services offered','Movers cities','Help center pages']
const servicepages=[
{
pagename:'Moving',
pageroute:'/moving'
},
{
pagename:'Pressure washing',
pageroute:'/pressurewashing'
},
{
pagename:'Plumbers',
pageroute:'/plumbers'
},
{
pagename:'Electricians',
pageroute:'/electricians'
},
{
pagename:'Carpet cleaning',
pageroute:'/carpetlcleaning'
},
]
const citypages=[
daataMeta.map((x)=>{
return{
pagename:x.nameId.split(' ')
.map(a => a.trim())
.map(a => a[0].toUpperCase() + a.substring(1))
.join("")+' movers ',
pageroute:`/moving/${x.nameId}`
}
})
]


const helpcenterpages=[
{
pagename:'Cancellation and Refund Policy',
pageroute:'/help/legal/cancellation-and-refund-policy'
},
{
pagename:'Service Provider Privacy Standards',
pageroute:'/help/legal/service-provider-privacy-standards'
},
{
pagename:'Dispute Moderation for Review Policy',
pageroute:'/help/legal/dispute-moderation-for-reviews'
},
{
pagename:'Content Policy',
pageroute:'/help/legal/content-policy'
},
{
pagename:'Review Policy',
pageroute:'/help/legal/review-policy'
},
{
pagename:'Collecting Fees Outside SwiftBel',
pageroute:'/help/legal/collecting-fees-outside-swiftbel-policy'
},
{
pagename:'Service Fees',
pageroute:'/help/legal/service-fees'
},
{
pagename:'Cookies Policy',
pageroute:'/help/legal/cookie-policy'
},
{
pagename:'Privacy Policy',
pageroute:'/help/legal/privacy-policy'
},
{
pagename:'Copyright Policy',
pageroute:'/help/legal/copyright-policy'
},
{
pagename:'Terms of Service',
pageroute:'/help/legal/terms-of-service'
},
{
pagename:'Payments Terms of Service',
pageroute:'/help/legal/payments-terms'
},
]
const handletitle=(item)=>{
setActivePage(item)
}
const citypage=citypages[0]
console.log(citypage,'citypages')
const requiredpages= activePage==='Services offered'?servicepages:
activePage==='Movers cities'?citypage:
activePage==='Help center pages'?helpcenterpages:'no data'
let router = useRouter()
return(
<>
<Main>
    <Head>
<Headings className="headgrid">
{titles.map((item,index)=>{
return(
    <>
    <Heads onClick={()=>handletitle(item)} className={activePage===item?'subhead':''} key={index}>{item}</Heads>
    </>
)
})}
</Headings>
<Headings className={activePage==='Services offered'?'headgrid mt-5 mb-5':'servicegrid mt-5 mb-5'} >
{requiredpages.map((x)=>{
return(
<Pages href={x.pageroute} target="_blank">{x.pagename}</Pages>
)
})}
</Headings>
</Head>
</Main>
</>
)
}
export default sitemap

const Main = styled.div`
display:flex;
justify-content:center;
overflow-x:hidden;
font-family:Inter;
`
const Head=styled.div`
width:1312px;
padding-left:20px;
padding-right:20px;
margin-top:30px;
@media (min-width: 260px) and (max-width:820px){
    padding-bottom:10px;
}
.headgrid{
    display:grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto ;
    @media (min-width: 260px) and (max-width:820px){
        grid-template-columns: auto auto  ;
    }
}
.servicegrid{
    display:grid;
    grid-template-columns: auto auto auto auto ;
    @media (min-width: 260px) and (max-width:820px){
        grid-template-columns: auto;
    }
}
`
const Headings=styled.div`
font-family:Inter;
.subhead{
text-decoration:underline;
text-underline-offset: 15px;
}
`
const Heads=styled.p`
margin-right:30px;
cursor:pointer;
font-weight:600;
font-size:16px;
color:#D81159;

`
const Pages=styled(Link)`
margin-right:30px;
cursor:pointer;
font-size:16px;
text-decoration:underline;
text-underline-offset:4px;
color:black;
margin-bottom:8px;
`
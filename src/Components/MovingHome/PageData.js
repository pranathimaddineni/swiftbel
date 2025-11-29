import styled from "styled-components"

function PageData(props){
let cityname = props?.cityname
return(
<Maindiv>
<SubHead>
<Main className="step2">
    <Head>
    <div>
    <Heading>PROFESSIONAL MOVING COMPANY IN {cityname.toUpperCase()}</Heading>
    <Hr/>
    <Text>
    Moving in {cityname}? Or, perhaps you are moving to {cityname} or moving from {cityname} to another destination in Canada. Our team is here to ensure that your move is affordable and organized so that you are not stressed out on moving day.
    </Text>
    <br/>
    </div>
</Head>
</Main>
<Subhr/>
<Main className="step1">
    <Head>
    <div>
    <Heading>TESTIMONIALS FROM {cityname.toUpperCase()} MOVING CUSTOMERS</Heading>
    <Hr/>
    <Text>
    SwiftBel has the best movers in {cityname}.Our movers have served thousands of customers in {cityname} and throughout BC.
    See what customers have to say about our work.
    </Text>
    <br/>
    </div>
    </Head>
    </Main>
    </SubHead>
    <Subhr/>
    <SubHead>
    <Main className="step1">
    <Head>
    <div>
    <Heading>A {cityname.toUpperCase()} MOVING COMPANY WITH BETTER CHOICES</Heading>
    <Hr/>
    <Text>
    With SwiftBel's {cityname} services, you have two convenient choices.
    You can contact us and coordinate your move via phone the old-fashioned way, or, if you prefer the
    convenience of technology, you can easily book our {cityname} moving services online.
    </Text>
    <br/>
    </div>
    </Head>
    </Main>
<Subhr/>
    <Main className="step2">
    <Head>
    <div>
    <Heading>TECHNOLOGY THAT BEATS COMPETITORS, HANDS DOWN!</Heading>
    <Hr/>
    <Text>
    Unlike other {cityname} moving companies, SwiftBel's service is built on a technology platform that lets you book your mover online and track your mover on move day if you like.
    The SwiftBel app accurately calculates your mover's time,
    invoice, and payment to ensure that you never overpay.
    </Text>
    <br/>
    </div>
    </Head>
    </Main>
</SubHead>
<br/>
<br/>
</Maindiv>
)
}
export default PageData

const Maindiv=styled.div`
.step1{
background:#FBE8EA;
border-radius:8px;
}
.step2{
background:#FFF9A6;
border-radius:8px;
}

`
const Main = styled.div`
padding:30px;
display:flex;
justify-content:center;
overflow-x:hidden;
font-family:Inter;
`
const Subhr=styled.hr`
display:none;
@media (min-width: 260px) and (max-width:820px){
    display:flex;
}
`
const Head=styled.div`
width:640px;
padding-left:20px;
padding-right:20px;
display:flex;
justify-content:space-between;
margin-top:30px;
@media (min-width: 260px) and (max-width:820px){
    padding-bottom:10px;
}
`
const SubHead=styled.div`
display:flex;
justify-content:center;
@media (min-width: 260px) and (max-width:820px){
display:inline;
}
`
const Hr = styled.hr`
width:100px;
border:2px solid black;
margin-top:-8px;
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size:22px;
@media (min-width: 260px) and (max-width:820px){
   font-size:18px;
}
`
const Text=styled.p`
font-family:Inter;
font-size:16px;
font-weight:500;
color:black;
`
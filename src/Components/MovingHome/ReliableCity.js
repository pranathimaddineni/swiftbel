import styled from "styled-components"

function ReliableCity(props){
    let cityname=props?.cityname
return(
<>
<br/>
<br/>
<Main>
    <Head>
    <div>
    <Heading>A RELIABLE {cityname.toUpperCase()} MOVING COMPANY YOU CAN TRUST</Heading>
    <Hr/>
    <Text>
    SwiftBel is a moving services company with offices in {cityname}. Our moving services and reliable staff are available seven days a week to help you make a flawless move.
    </Text>
    <Text>We are committed to helping you complete a worry-free {cityname} move at an affordable price that you know up front.
    Up-front pricing is important because some movers try to win your business at what appears to be a lower price,
    but during the move they add hidden charges that cost you more. At SwiftBel, you get an accurate price up
    front and will not be surprised by hidden fees.</Text>
    <br/>
    </div>
    </Head>
    </Main>
    <br/>
</>
)
}
export default ReliableCity

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
display:flex;
justify-content:space-between;
margin-top:30px;
@media (min-width: 260px) and (max-width:820px){
    padding-bottom:10px;
}
`
const Hr = styled.hr`
width:100px;
border:2px solid #D81159;
margin-top:-8px;
`
const Heading = styled.p`
font-family:Roobert-medium;
font-size:26px;
`
const Text=styled.p`
font-family:Inter;
font-size:16px;
font-weight:500;
color:black;
width:80%;
`
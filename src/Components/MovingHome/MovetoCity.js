import Image from "next/image"
import styled from "styled-components"

function MovetoCity(props){
let cityphotos = props?.cities
let citydetails=props?.citydetails
console.log(cityphotos,'cities')
return(
<Main>
    <Head>
    <Textdiv>
        <Heading>Moving to {props?.cityname}</Heading>
        <Hr/>
        <SubHeading>Here are some facts:</SubHeading>
        <Details>{citydetails?.description}</Details>
        <br/>
        <SubHeading className="mb-4">Here are some activities to do:</SubHeading>
        {citydetails?.points?.map((x,index)=>{
        return(
        <div className="d-flex">
        <Point></Point>
        <Details2 key={index}>&nbsp;{x}</Details2>
        </div>
         )
        })}
    </Textdiv>
    <Imagediv >
    <Image1 src={cityphotos?.photoOne} alt='city1' loading="eager" width={500} height={500} className='img1'/>
    <div className="d-flex justify-content-between">
    <Image1 src={cityphotos?.photoTwo} alt='city2' loading="eager" width={500} height={500} className="img2" />
    <Image1 src={cityphotos?.photoThree} alt='city3' loading="eager" width={500} height={500} className="img2" />
    </div>
    <Image1 src={cityphotos?.photoFour} alt='city4'  loading="eager" width={500} height={500} className="img1"/>
    </Imagediv>
    </Head>
</Main>
)
}
export default MovetoCity
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
const Heading = styled.p`
font-family:Roobert-medium;
font-size:26px;
`
const SubHeading=styled.p`
color:#D81159;
font-size:16px;
font-weight:600;
`
const Details=styled.p`
color:#787878;
font-size:16px;
font-weight:500;
`
const Details2=styled.p`
font-size:14px;
color:#787878;
font-weight:500;
margin-top:-8px;
width:90%;
`
const Hr = styled.hr`
width:100px;
border:2px solid #D81159;
margin-top:-8px;
`
const Image1=styled(Image)`
transition: all 0.2s ease-in-out;
border-radius:8px;
margin:10px;
 &:hover{
   transform: scale(0.9);
}
`
const Imagediv=styled.div`
width:700px;
.img1{
    width:750px;
    height:350px;
    }
    .img2{
    width:365px;
    height:280px;
    }
@media (min-width: 1000px) and (max-width:1415px){
    width:500px;
    padding:20px;
    .img1{
        width:450px;
        height:250px;
        }
        .img2{
        width:215px;
        height:180px;
        }
}
@media (min-width: 260px) and (max-width:1000px){
  display:none;
}

`
const Textdiv=styled.div`
width:800px;
padding-right:30px;
@media (min-width: 1200px) and (max-width:1415px){
    width:600px;
}
@media (min-width: 1000px) and (max-width:1200px){
    width:500px;
}
@media (min-width: 260px) and (max-width:1000px){
    width:100%;
}
`
const Point=styled.div`
width:6px;
height:6px;
border-radius:50%;
background:#D81159;
margin-right:3px;
margin-top:-2px;
`
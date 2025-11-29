import { useRouter } from "next/router"
import styled from "styled-components"
import { Button, Offcanvas, Row } from 'react-bootstrap'
import { useState } from "react";
import { useSelector } from "react-redux";

function MovileBreakdown(props){
let router = useRouter();
let mobileView = global.window && window.innerWidth < 768?true:false
const [showSearch, setShowSearch] = useState(false)
const datadetail = useSelector(state => state.customerReducer.service);
const listing = [
    {
        heading: 'Travel time to start point (Fixed)',
        data: `1 hour ($${datadetail?.[0]?.travelCharge})`
    },
    {
        heading: 'Loading time',
        data: `${Math.ceil(datadetail?.[0]?.loadingTime)} hours ($${Math.ceil(datadetail?.[0]?.loadingCharge)})`
    },
    {
        heading: 'Travel between locations:',
        data: `${datadetail?.[0]?.estimatedTime} ($${datadetail?.[0]?.travelBetweenCharge})`,
        className: 'diff'
    },
    {
        heading: 'Unloading time',
        data: `${Math.ceil(datadetail?.[0]?.unloadingTime)} hours ($${Math.ceil(datadetail?.[0]?.unloadingCharge)})`
    },
   
]
const details=()=>{
return(
    <Segmnet  >
            <p className='headinglist'>Estimate Breakdown</p>
            <hr />
            <p>Estimated cost is based on information provided & similar moves in your area. Actual cost is determined by hourly rate. </p>
            <br />
            {listing?.map((item, index) => {
                return (
                    <div className='d-flex justify-content-between p-1' key={index}>
                        <div >
                            <p className={item?.className === 'diff' ? 'heads' : 'heads'}>{item?.heading}</p>
                        </div>
                        <div >
                            <p className={item?.className === 'diff' ? 'heads text-end' : 'heads text-end'}>{item?.data}</p>
                        </div>
                    </div>
                )
            })}
            <hr />
            <div className='d-flex justify-content-between p-2 mt-3'>
                <p className='heads3'>Total</p>
                <p className='heads3 text-end'> ${datadetail?.[0]?.finalPrice}</p>
            </div>
        </Segmnet>
)
}
return(
    <Main>
        <MobileView>
   <MobileModal show={mobileView?props?.show:false} onHide={() => props?.onHide(false)} placement={'bottom'} style={{ height: '650px' }}>
                        <Offcanvas.Header closeButton={() => props?.onHide(false)}>
                            <Offcanvas.Title>Estimate Breakdown</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div style={{ overflow: 'scroll' }}>
                            {details()}
                        </div>
                    </MobileModal>
                    </MobileView>
    </Main>
)
}
export default MovileBreakdown
const MobileView = styled.div`

@media (min-width: 821px) and (max-width: 10000px){
    display:none;
    }

`
const MobileModal = styled(Offcanvas)`
border-radius:15px;
background-color:#FAFAFA;
@media (min-width: 768px) and (max-width: 3000px){
  display:none;
`
const Segmnet=styled.div`
padding-left:15px;
padding-right:15px;
.likes__list{
    box-sizing: border-box;
    width:350px;
    z-index:999;
    background:white;
  
    padding-left:16px;
    padding-right:16px;
    border-radius:8px;
    box-shadow: 0 0 1px 1px #787373;
    filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
  }
  .heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
   
}
.headinglist{
color:black;
font-size:20px;
text-align:center;
margin-top:15px;
margin-left:30px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
.heads3{
    font-family: Inter;
    font-weight: 500;
    font-size: 18px;
    color: black;
    margin-top:-10px;
}
`
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
    text-align:center;
    color: #787373;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 14px;
        margin-left:0px;
    }
}
@media (min-width: 260px) and (max-width: 820px){
    margin-left:50px;
}
`
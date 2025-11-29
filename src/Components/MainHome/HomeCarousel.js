import styled from 'styled-components'
import Yelp from '../../../public/assets/yelp.png'
import Rating from '../../../public/assets/rating.png'
import Image from 'next/image';
import { mainreviews } from './ServiceReviews';

function HomeCarousel(props) {
console.log(mainreviews[0].movingreview,'mvvh')
  let review =
  props?.type==='carpetcleaning'?mainreviews[0]?.carpetreview:
  props?.type==='plumbers'?mainreviews[0]?.plumbingreview:
  props?.type==='electricians'?mainreviews[0]?.electriciansreview:
  props?.type==='pressurewashing'?mainreviews[0]?.pressurereview:
  mainreviews[0]?.movingreview


  return (
    <>
      <Main>
        <Head>
      <Mainset>
      <ReviewTitle>Hundreds of happy clients</ReviewTitle>
        {/* <p className='subtitle'>Moving with SwiftBel is fast, easy and safe</p> */}
        <br/>
        <div class="Marquee">
  <div class="Marquee-content">
  {
            review?.map((item) =>
            <div className='p-1'>
            <Segment className='p-3'>
                  <div className='d-flex justify-content-between mt-2'>
                    <div className='d-flex'>
                      <ProImage>
                      {item.name.slice(0,1).toUpperCase()}
                      </ProImage>
                      <div>
                        <p className='name'>{item.name}</p>
                        <p className='nickname'>{item?.date}</p>
                      </div>
                    </div>
                    <div className='d-flex'>
                    <Yelpimg src={Yelp}/>
                    <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "5"}</p>
                    </div>
                  </div>
                  <h3 className='review mb-2'>{item.review.slice(0,170)}</h3>
                </Segment>
              </div>
            )
          }
  </div>
</div>
        <br />
        <div class="Marquee2">
  <div class="Marquee-content2">
  {
            review?.map((item) =>
            <div className='p-1'>
            <Segment className='p-3'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                    <ProImage>
                      {item.name.slice(0,1).toUpperCase()}
                      </ProImage>
                      <div>
                        <p className='name'>{item.name}</p>
                        <p className='nickname'>{item?.date}</p>
                      </div>
                    </div>
                    <div className='d-flex'>
                    <Yelpimg src={Yelp}/>
                    <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "5"}</p>
                    </div>
                  </div>
                  <h3 className='review'>{item.review.slice(0,170)}</h3>
                </Segment>
              </div>
            )
          }
  </div>
</div>
        <br/>
        <br />
      </Mainset>
      </Head>
      </Main>
    </>
  )
}
export default HomeCarousel;
const Main = styled.div`
display:flex;
justify-content:center;

@media (min-width: 260px) and (max-width: 1311px){
  padding-left:10px;
  padding-right:10px;
  }
`
const Head=styled.div`
padding-top:64px;
padding-bottom:64px;
width:100%;
@media (min-width: 1800px) and (max-width: 9999px){
width:1512px;
}
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:10px;
padding-left:0px;
padding-right:0px;
}
`
const Mainset = styled.div`
margin-top:-28px;
padding-bottom:30px;
.subtitle{
  font-family:Inter;
  font-size: 18px;
  text-align: center;
  color: #787373;
  margin-top:-20px;
}
@media (min-width: 260px) and (max-width: 820px){
padding-left:25px;
padding-right:25px;
}
@media (min-width: 360px) and (max-width: 1145px)
{
    background-color: white;
    padding:0rem;
    margin-top:30px;
}
`
const ReviewTitle = styled.h2`
font-family: navigo, sans-serif;
font-style: normal;
font-weight: 700;
font-size: 44px;
margin-bottom:2rem;
padding-top:20px;
text-align:center;
@media (min-width: 200px) and (max-width: 1145px)
 {
    margin-left:20px;
 }
`
const Segment = styled.div`
border-radius:13px;
width:368px;
background:white;
background-color:white;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.nickname{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.review{
font-size: 16px;
color: #787373;
font-family:Inter;
}
.quotation{
    height:36px;
    width:36px;
}
@media (min-width: 260px) and (max-width: 820px){
  width:330px;
    margin-left:3px;
}
`
const ProImage = styled.div`
border-radius:50%;
height:50px;
width:50px;
margin-right:10px;
text-align:center;
font-size:28px;
font-family:Inter;
background:#F3F3F3;
padding-top:3px;
color:#D81159;
`
const Yelpimg = styled(Image)`
height:24px;
margin-left:10px;
width:auto;
`
const Ratingimg=styled(Image)`
height:20px;
width:20px;
margin-right:4px;
margin-left:7px;
`
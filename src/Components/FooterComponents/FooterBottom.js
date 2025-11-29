import styled from 'styled-components'
import language from '../../../public/assets/language.png'
import playstore from '../../../public/assets/playstoregray.png'
import appstore from '../../../public/assets/appstoregray.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

const FooterBottom = () => {
  let router=useRouter();
  return (
    <>
    <Main className='home-footer-bottom'>
      <div className='row' >
      <Hr />
        <div className='col-lg-7 col-md-7 col-xl-7' >
          <Head className='hstack gap-2'>
            {/* <img src="./footerBottom.png" alt="" width="30" height="24" /> */}
            <span className='copyright '>
              <div className='d-flex justify-content-center'>
            <p><Image  alt='' src={language} className='lang'/>&nbsp;&nbsp;English</p>&nbsp;&nbsp;&nbsp;
            <p onClick={()=>router.push('/sitemap')} style={{cursor:'pointer'}}>Sitemap</p>&nbsp;&nbsp;&nbsp;

          <p>$CAD</p>&nbsp;&nbsp;&nbsp;
          </div>
          <div className='innerdiv'>
          <p className='rights'>{new Date().getFullYear()} SwiftBel, Inc. - All rights reserved</p>
          </div>
            </span>
          </Head>
        </div>
        <Head2 className='col-lg-5 col-md-5 col-xl-5'>
          <div className=' innerdiv2 hstack gap-5 justify-content-end'  >
          <p><Image  alt='' src={playstore} className='pb-1'/>&nbsp;&nbsp;PlayStore</p>
          <p><Image  alt='' src={appstore} className='pb-1'/>&nbsp;&nbsp;AppStore</p>
          </div>
        </Head2>
      </div>
      <br/>
    </Main>
    </>

  )
}

export default FooterBottom;

const Main=styled.div`
background-color:white;
font-family:Inter;
background:white;
width:1312px;
@media (min-width: 1170px) and (max-width: 1360px){
  width:1170px;
}
@media (min-width: 820px) and (max-width: 1199px){
  padding-left:50px;
}
@media (min-width: 200px) and (max-width:1169px)
  {
    width:100%;
    padding-right:30px;
  }
`
const Head=styled.span`
padding-left: 1vw;
 padding-right: 1vw;
@media (min-width: 200px) and (max-width: 1000px){
 display:flex;
  justify-content:center;
  margin-top:15px;
  padding-left: 0vw;
}
.lang{
  height:15px;
  width:15px;
  margin-bottom:2px;
  font-size:16px;
}
.innerdiv{
  color:#787373;
  margin-left:15px;
}
.rights{
  font-size:12px;
  margin-top:4px;
}
.copyright{
  display:flex;
  font-family:Inter;
  margin-left:10px;
  @media (min-width: 200px) and (max-width: 767px){
    display:inline;
   }
}
`
const Head2=styled.div`
.innerdiv2{
  font-size: 16px;
  margin-right:35px;
}
@media (min-width: 200px) and (max-width: 1000px){
 margin-bottom :15px;
 margin-left:-25px;
}
p{
  color:#787373;
  font:Inter;
}
`
const Hr = styled.hr`
background-color:lightgray;
background:lightgray;

`
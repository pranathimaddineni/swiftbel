import Head from 'next/head';
import { daataMeta } from '@/utils/DataList';
import CityBanners from '@/Components/MovingHome/Banners/CityBanners';
// import WorkWithSwiftbel from '@/Components/MovingHome/WorkWithSwiftbel';
import MovingPlace from '@/Components/MovingHome/MovingPlace';
import SwiftbelExperince from '@/Components/MainHome/SwiftbelExperience';
import BookingandManaging from '@/Components/MainHome/BookingandManaging';
import HomeCarousel from '@/Components/MainHome/HomeCarousel';
import Areas from '@/Components/MovingHome/Areas';
import MovetoCity from '@/Components/MovingHome/MovetoCity';
import { LOCAL_HOST, ServiceEnum } from '@/services/Urls';
import { useRouter } from 'next/router';
import PageData from '@/Components/MovingHome/PageData';
import ReliableCity from '@/Components/MovingHome/ReliableCity';


 const CustomPath = ({name,data,photos,cities,citydetails}) => {
    console.log(cities,'ubjk')
    let router = useRouter()
    let uniquename = router.asPath.split('/');
      const servicename = uniquename[1]
let cityname=
name?.nameId==='richmondhill'?'Richmond Hill':
name?.nameId==='northvancouver'?'North Vancouver':
name?.nameId.split(' ')
.map(a => a.trim())
.map(a => a[0].toUpperCase() + a.substring(1))
.join("")
console.log(data,'data')
const coord = {
  lat: data?.[0]?.lat,
  lng: data?.[0]?.lng
  };
  return  (<>
       <Head>
<title>{`Book ${cityname} movers for a five-star experience at affordable prices`}</title>
<meta name='description' content={` Easily book your ${cityname} movers – online, via text, or with one phone call. Five-star experiences at affordable prices. Free cancellation, fraud protection. `}/>
<link rel="icon" href="/favicon.ico" />
</Head>
<CityBanners type={servicename} cityname={cityname} photos={photos}/>
{/* <WorkWithSwiftbel  type={servicename} cityname={cityname}/> */}
<Areas cityname={cityname} province={data?.[0]?.province} coord={coord}/>
         <div className="bg-image">
        {/* <ReviewPage  type={servicetype}/> */}
        <MovingPlace type={servicename} cityname={cityname}/>
         <SwiftbelExperince  type={servicename} cityname={cityname}/>
         </div>
         <BookingandManaging type={servicename} cityname={cityname}/>
         <MovetoCity cityname={cityname} cities={cities} citydetails={citydetails} />
         <ReliableCity type={servicename} cityname={cityname}/>
         <HomeCarousel  type={servicename} cityname={cityname}/>
         <PageData type={servicename} cityname={cityname}/>

 </>)
}
export default CustomPath;
export async function getStaticProps(context){
  const { params } = context;
  let cityparam =
  params?.nameId==='richmondhill'?'Richmond Hill':
  params?.nameId==='northvancouver'?'North Vancouver':
  params?.nameId.split(' ')
  .map(a => a.trim())
  .map(a => a[0].toUpperCase() + a.substring(1))
  .join("")
  const bannerres = await fetch(`${LOCAL_HOST}/${ServiceEnum.bannerPhotos}/?serviceName=${'Moving'}`)
  const bannerjson = await bannerres.json()
  const cityres = await fetch(`${LOCAL_HOST}/${ServiceEnum.cityPhotos}/?cityName=${cityparam}`)
  const cityjson = await cityres.json()
  const citydetailsres = await fetch(`${LOCAL_HOST}/${ServiceEnum.citydetails}/?cityName=${cityparam}`)
  const citydetailsjson = await citydetailsres.json()
function value(value) {
    return value?.nameId === params?.nameId;
  }

let data=daataMeta.filter(value);
  return {
      props:{
        name: params,
        data:data,
        photos: bannerjson?.data,
        cities:cityjson?.data,
        citydetails:citydetailsjson?.data
      },
  }
}

export async function getStaticPaths(){
  const paths = daataMeta.map( name => {
          return {
              params : name
          }
      }
  )

  return {
      paths,
      fallback:false
  }
}

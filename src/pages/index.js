import SwiftbelBanner from "@/Components/MainHome/SwiftbelBanner";
import BookingandManaging from "@/Components/MainHome/BookingandManaging";
import HomeCarousel from "@/Components/MainHome/HomeCarousel";
import PlayVideo from "@/Components/MainHome/PlayVideo";
import SwiftbelExperince from "@/Components/MainHome/SwiftbelExperience";
import TryItOut from "@/Components/MainHome/TryItOut";
import HomeServiceBar from "@/Components/MainHome/HomeServiceBar";
import { LOCAL_HOST, ServiceEnum } from "@/services/Urls";
import { createContext } from 'react'
import Head from "next/head";
export const ServiceContext = createContext();
 function Home(props) {
  return (
    <ServiceContext.Provider value={props?.services} >
    <div className="main">
    <Head>
<title>SwiftBel | On-Demand Home Maintenance</title>
<meta name='description' content='Easily schedule home repairs online, via text, or one phone call.  Get inexpensive prices and five-star experiences from vetted professionals.'/>
<link rel="icon" href="/favicon.ico" />
</Head>
    <HomeServiceBar serviceName={()=>console.log('hii')} setActivePage={()=>console.log('')} services={props?.services}/>
    <SwiftbelBanner />
    <BookingandManaging/>
    <TryItOut/>
    <PlayVideo/>
    <SwiftbelExperince/>
    <HomeCarousel/>
    </div>
    </ServiceContext.Provider>
  )
}
export default Home

Home.getInitialProps = async () => {
  const res = await fetch(`${LOCAL_HOST}/${ServiceEnum.getServices}`)
  const json = await res.json()
  return { services: json }
}

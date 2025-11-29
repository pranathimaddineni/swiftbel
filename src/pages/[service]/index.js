import BookingandManaging from "@/Components/MainHome/BookingandManaging"
import HomeCarousel from "@/Components/MainHome/HomeCarousel"
import SwiftbelExperince from "@/Components/MainHome/SwiftbelExperience"
import MainBanner from "@/Components/MovingHome/Banners/MainBanner"
import MovingPlace from "@/Components/MovingHome/MovingPlace"
// import WorkWithSwiftbel from "@/Components/MovingHome/WorkWithSwiftbel"
import Head from "next/head"
import { useRouter } from "next/router"
function service(){
    let router = useRouter()
    console.log(router?.query?.service,'checking route')
    let servicetype=router?.query?.service
    const  carpettag={
    'title':'Vancouver carpet cleaning, make your house dazzle | SwiftBel',
    'content':'Easily schedule Vancouver carpet cleaning in minutes online, via text, or with one phone call. Get inexpensive prices and five-star experiences from vetted pros'
    }
    const plumbingtag={
    'title':'SwiftBel | Licensed plumbers when you need them',
    'content':'Licensed plumbers, great prices – book online, via text, or one phone call. Five-star experiences at affordable prices. Free cancellation, fraud protection. '
    }
    const electrictag={
    'title':'Vancouver electricians | Book with one phone call or text',
    'content':'Easily book Vancouver electricians in minutes.  Book online, via text, or our one-call service. Our electricians are five-star rated and affordable. Book now!'
    }
    const movingtag={
    'title':'SwiftBel | Affordable movers with the push of a button',
    'content':'Great prices for movers – book online, via text, or with one phone call. Five-star experiences at affordable prices. Free cancellation, fraud protection. '
    }
    const pressuretag={
    'title':'Professional power washers with fixed upfront pricing ',
    'content':'Professional power washers, great prices – book online, via text, or one phone call. Five-star experiences at affordable prices. Free cancellation.'
    }
 let tags=servicetype==='carpetcleaning'?carpettag:
 servicetype==='moving'?movingtag:
 servicetype==='plumbers'?plumbingtag:
 servicetype==='pressurewashing'?pressuretag:
 servicetype==='electricians'?electrictag:null
 console.log(tags)
    return(
        <div className="main">
            <Head>
<title>{tags?.title}</title>
<meta name='description' content={tags?.content}/>
<link rel="icon" href="/favicon.ico" />
</Head>

         <MainBanner type={servicetype}/>
        {/* <WorkWithSwiftbel  type={servicetype}/> */}
         <div className="bg-image">
        <MovingPlace  type={servicetype}/>
         <SwiftbelExperince  type={servicetype}/>
         </div>
         <BookingandManaging type={servicetype}/>
         <HomeCarousel  type={servicetype}/>
        </div>
    )
    }
    export default service


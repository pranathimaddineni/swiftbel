import "bootstrap/dist/css/bootstrap.css"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css';
import Head from 'next/head';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Provider, useSelector } from "react-redux";
import {store,wrapper} from '../store/store'
import { IntercomProvider} from 'react-use-intercom';
import { useEffect } from "react";
function Myapp({Component,pageProps}){
    const profileData=useSelector(state=>state.auth)
    console.log(profileData,"data")
    const INTERCOM_APP_ID = 'cqome257';
    useEffect(()=>{
        return(
            <>
            <script>
{!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, typeof window !== "undefined"&&document,'script',
'https://connect.facebook.net/en_US/fbevents.js'),
fbq('init', '3475704655993326'),
fbq('track', 'PageView')}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA&libraries=places&callback=initMap"async></script>
        <script>
           {(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3170623,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')}
        </script>
        <noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=3475704655993326&ev=PageView&noscript=1"
/></noscript>
<script>
 { !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="X54UDW2g0lhnWcXvCHFHXIcqZCCsYIyo";;analytics.SNIPPET_VERSION="4.15.3";
  analytics.load("X54UDW2g0lhnWcXvCHFHXIcqZCCsYIyo");
  analytics.page();
  }}()}
</script>
        </>
        )
        },[])
return(
<>
<IntercomProvider appId={INTERCOM_APP_ID} autoBoot  onShow={()=>window.analytics.track("Clicking the Intercom Button")}>
<Provider store={store}>
<Head>
<title>SwiftBel</title>
<meta name='description' content='Welcome to SwiftBel'/>
<link rel="icon" href="/favicon.ico" />
</Head>
<Header/>
<Component {...pageProps} className='container'/>
<Footer/>
</Provider>
</IntercomProvider>
</>
)
}
export default wrapper.withRedux(Myapp);


import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createContext } from 'react'
import Head from 'next/head';
export const ServiceContext = createContext();
builder.init('50299bb3800f40f39273cec51eb82ff3')

 const Builder = (props) => {

    const router = useRouter()
  const [builderContentJson, setBuilderContentJson] = useState(null)
  console.log("hiii",router?.asPath)
  const cancellationtag={
  'title':'SwiftBel Home Services Booking Cancellation & Refund Policy',
  'content':'No-hassle, easy home services booking cancellation policy when your circumstances change.  Book online, via text, or our one-call service.'
  }
  const collectingtag={
    'title':'SwiftBel Service Providers - Collecting Fees Outside Policy',
    'content':'SwiftBel Service Providers Collecting Fees Outside Policy'
    }
    const contenttag={
      'title':'SwiftBel Home Services | Content Policy',
      'content':'SwiftBel Home Services Content Policy'
      }
      const cookietag={
        'title':'SwiftBel Home Services | Cookie Policy',
        'content':'SwiftBel Home Services Cookie Policy'
        }
        const copyrighttag={
          'title':'SwiftBel Home Services | Copyright Policy',
          'content':'SwiftBel Home Services Copyright Policy'
          }
          const disputetag={
            'title':'SwiftBel Home Services | Dispute Moderation for Reviews',
            'content':'SwiftBel Home Services Dispute Moderation for Reviews'
            }
            const paymenttag={
              'title':'SwiftBel Home Services | Payments Terms',
              'content':'SwiftBel Home Services Payments Terms'
              }
              const privacytag={
                'title':'SwiftBel Home Services | Privacy Policy',
                'content':'SwiftBel Home Services Privacy Policy'
                }
                const reviewtag={
                  'title':'SwiftBel Home Services | Review Policy',
                  'content':'SwiftBel Home Services Review Policy'
                  }
                  const servicetag={
                    'title':'SwiftBel Home Services | Service Fees',
                    'content':'SwiftBel Home Services Service Fees'
                    }
                    const sptag={
                      'title':'SwiftBel | Home Services Provider Privacy Standards',
                      'content':'SwiftBel Home Services Provider Privacy Standards'
                      }
                      const termtag={
                        'title':'SwiftBel Home Services | Terms of Service',
                        'content':'SwiftBel Home Services Terms of Service'
                        }
let helptype=router?.query?.Vancouver
  let finaltag=helptype==='cancellation-and-refund-policy'?cancellationtag:
  helptype==='collecting-fees-outside-swiftbel-policy'?collectingtag:
  helptype==='content-policy'?contenttag:
  helptype==='cookie-policy'?cookietag:
  helptype==='copyright-policy' ?copyrighttag:
  helptype==='dispute-moderation-for-reviews'?disputetag:
  helptype==='payments-terms'?paymenttag:
  helptype==='privacy-policy'?privacytag:
  helptype==='review-policy'?reviewtag:
  helptype==='service-fees'?servicetag:
  helptype==='service-provider-privacy-standards'?sptag:
  helptype==='terms-of-service'?termtag:null
  useEffect(() => {
    router? builder.get('page', { url: router?.asPath})
      .promise().then(setBuilderContentJson):null
      console.log(router?.query?.Vancouver,"hiiiiiiiiiiii")
  }, [router])
  return  (<>
   <Head>
<title>{finaltag?.title}</title>
<meta name='description' content={finaltag?.content}/>
<link rel="icon" href="/favicon.ico" />
</Head>
   <ServiceContext.Provider value={props?.page} >
{builderContentJson&& <BuilderComponent model='page' content={builderContentJson}/>}
 </ServiceContext.Provider>
 </>)
}
export default Builder;
Builder.getInitialProps=({query}) =>{
  console.log(query,query)
  const page =  'help/help-center'

  return {
    props: {
      page,
    },
    revalidate: 5,
    query
  }
}

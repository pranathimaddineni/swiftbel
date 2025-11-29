
import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createContext } from 'react'
export const ServiceContext = createContext();
builder.init('50299bb3800f40f39273cec51eb82ff3')

 const Builder = (props) => {

    const router = useRouter()
  const [builderContentJson, setBuilderContentJson] = useState(null)
  console.log("hiii",props)
  useEffect(() => {
    router? builder.get('page', { url: router?.asPath})
      .promise().then(setBuilderContentJson):null
      console.log(router.asPath,"hiiiiiiiiiiii")
  }, [router])
  return  (<>
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

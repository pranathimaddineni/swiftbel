
import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createContext } from 'react'

import Head from 'next/head';
import { daataMeta } from '@/utils/DataList';
export const ServiceContext = createContext();
builder.init('50299bb3800f40f39273cec51eb82ff3')

 const Builder = () => {
    
    
  return  (<>
       <Head>
<title>{`Vancouver SwiftBel | Affordable Vancouver movers at upfront prices!`}</title>
<meta name='description' content={`Affordable Vancouver movers at upfront prices!`}/>
<link rel="icon" href="/favicon.ico" />
</Head>
  <p1>{"Vancouver"}</p1>

 </>)
}
export default Builder;


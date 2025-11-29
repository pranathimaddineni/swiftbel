import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
builder.init('50299bb3800f40f39273cec51eb82ff3')

 const Builder = (props) => {

  const [builderContentJson, setBuilderContentJson] = useState(null)
  useEffect(() => {
 builder.get('page', { url: props?.page})
      .promise().then(setBuilderContentJson)
  }, [])

  return  (<>
{builderContentJson&& <BuilderComponent model='page' content={builderContentJson}/>}

 </>)
}
export default Builder;
Builder.getInitialProps=({query}) =>{
  console.log(query,"query")
  
  const page =  `help/${query.Vancouver}`

  return {
    props: {
      page,
    },
    revalidate: 5,
    query
  }
}

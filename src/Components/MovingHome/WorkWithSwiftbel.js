import styled from 'styled-components';
function WorkWithSwiftbel(props) {
const commondata=[
{
title:'60 secs',
description:'to book',
},
{
title:'100%',
description:'upfront rates',
},
]
const movingdata=[
{
title:'220+ moves',
description:`last 30 days ${props?.cityname ?`(${props?.cityname})` : ''}`,
},
{
title:'4.85/5',
description:'1000+ reviews',
}
]

const carpetcleaningdata=[
{
title:'850+ jobs',
description:'last 30 days (Vancouver)',
},
{
title:'4.95 / 5',
description:'3000+ reviews',
}
]
const plumbingdata=[
{
title:'1250+ jobs',
description:'last 30 days (Vancouver)',
},
{
title:'4.85 / 5',
description:'3000+ reviews',
}
]
const electriciandata=[
{
title:'850+ jobs',
description:'last 30 days (Vancouver)',
},
{
title:'4.85 / 5',
description:'3000+ reviews',
}
]
const pressuredata=[
{
title:'50+ jobs',
description:'last 30 days (Vancouver)',
},
{
title:'4.85 / 5',
description:'3000+ reviews',
}
]
            let data = ()=>{
            if(props?.type==='moving'){
            return movingdata.concat(commondata)
            }
            else if(props?.type==='carpetcleaning')
            {
            return carpetcleaningdata.concat(commondata)
           }
           else if(props?.type==='plumbers')
            {
            return plumbingdata.concat(commondata)
           }
           else if(props?.type==='electricians')
           {
           return electriciandata.concat(commondata)
          }
          else if(props?.type==='pressurewashing')
           {
           return pressuredata.concat(commondata)
          }
          }
          let maindata = data()
    return (
        <>
         <Main>
            <Head>
                {
                    maindata?.map((item,index)=>
                    <Segment className='p-3' key={index}>
                   <p  className={`title ${index===0?'index1':index===1?'index2':index===2?'index3':'index4'}`}>{item.title}</p>
                   <br/>
                   <div >
                   <br/>
                <p className='review'>{item.description}</p>
                </div>
                 </Segment>
                    )
                }
            </Head>
         </Main>
        </>
    )
}

export default WorkWithSwiftbel

const Main = styled.div`
display:flex;
justify-content:center;
margin-top:64px;
margin-bottom:64px;
`
const Head=styled.div`
width:1270px;
background:white;
display:flex;
justify-content:space-between;
border-radius:8px;
padding-left:20px;
padding-right:20px;
filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
border-radius:12px;
@media (min-width: 260px) and (max-width: 820px){
    display: grid;
    justify-content:center;
    grid-auto-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    margin-left:20px;
    margin-right:20px;
    width:100%;
}
`

const Segment = styled.div`
border-radius:8px;
background:white;
background-color:white;
.title{
    margin-top:10px;
    margin-bottom:-25px;
    font-family:Roobert-medium;
    font-size: 44px;
    font-weight: 500;
    text-align:center;
    color: #787373;
}

.index1{
color:#EB873F;
}
.index2{
    color:#7DB164;
}
.index3{
    color:#957DBD;
}
.index4{
    color:#D81159;
}

@media (min-width: 260px) and (max-width: 820px){
    .title{
        font-size:25px;
    }
}
.review{
    font-size: 16px;
font-family: 'Inter';
font-weight: 400;
color: #787373;
margin-top:-20px;
text-align:center;
}
`



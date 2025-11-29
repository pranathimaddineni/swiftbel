import styled from 'styled-components'
import proppic from '../../../public/assets/dummypro.jpg'
import Yelp from '../../../public/assets/yelp.png'
import Rating from '../../../public/assets/rating.png'
import Image from 'next/image';
import Carousel from 'react-elastic-carousel';
import { useRef } from 'react';


function HomeCarousel(props) {
  const movingreview = [
    {
      name: 'Barry M',
      date:'22nd October 2022',
      review: "We had to move the contents of my mother-in-law's home after her passing. She was located in a rural area on Vancouver Island. Erick and Victor were...",
      rating:4.9
    },
    {
      name: "Alison Rasberry",
      date:'12th August 2022',
      review: "I had a very very positive experience with Lions Gate Moving last weekend. After many bad movers experiences before that in my life. This was the best by far. I was moving within the city from a one-bedroom sunken basement suite to an apartment building and was given a very reasonable quote of three movers (so it would be fast and efficient).",
      rating:5
    },
    {
      name: "Brittany Barker",
      date:'11th September 2022',
      review: "Collected a bunch of quotes from different moving companies and went with Scott and Steven @Lions Gate Moving because of the initial conversation and reasonable quote. Friendly, communicative, small moving business. Showed up on time, with all the supplies and moved all my stuff without incident or damage!",
      rating:4.8
    },
    {
      name: "Michelle Chand",
      date:'8th October 2022',
      review: " I used this moving company in late december with a lot snow on the ground. Alice accommodated my move after I required a few changes just few days before the move date. The movers were friendly, efficient, professional and worked great as a team 👏 I would highly recommend this company to anyone requiring moving services.",
      rating:4.5
    },
    {
      name: "Agnes Kot",
      date:'17th September 2022',
      review: " I cannot say enough about how hardworking and positive the crew were when moving me. I was really having a stressful time with having to downsize and move after many years at my previous home. From the moment they came through the door the members of the crew reassured me and told me not to worry and that they were there to take care of me. They took very good care of me and of my mountain of belongings.",
      rating:4.7
    },

  ]
  const carpetreview = [
    {
      name: 'Andres Bonnett',
      date:'22nd October 2022',
      review: "Felipe and the SanaClean team did an exceptional, thorough and detailed job on our first home. We called on Monday, and they were able to accommodate us on the Wednesday of the same week. The amount of work they completed in such a short period of time is incredible. It feels like we’re moving into a brand new condo, I could not thank them enough! ",
      rating:4.8
    },
    {
      name: "Mark Bradford",
      date:'12th August 2022',
      review: "Positive: Professionalism, Punctuality, Quality, Value Felipe and his crew were excellent to deal with. He was quick to respond to our inquiry, provided an accurate quote, arrived in a timely manner and did exactly what was required. We couldn't ask for anything more. Highly recommended for anyone wanting professional cleaning services. Two big thumbs up. ",
      rating:5
    },
    {
      name: "P.J. M ",
      date:'11th September 2022',
      review: "Positive: Professionalism I would like to complement Nicki on the fantastic job revamping my sectional. When I walked into my living room and looked at my once terribly stained sectional I was amazed at the transformation. I was never expecting it to come out THAT clean. Absolutely incredible service, positive attitude and attention to detail - Nicki is the total package!! I’m adding your number to my speed dial:) ",
      rating:4.8
    },
    {
      name: "Maria Ansorena ",
      date:'8th October 2022',
      review: " Positive: Professionalism,Punctuality,Quality,Value Nicki did a great job at our house. Very professional, fast, and efficient. Adding to being on time and very nice. We definitely recommend this company.",
      rating:4.9
    },
    {
      name: "Mary D. Manning ",
      date:'17th September 2022',
      review: "He was timely, cost-effective PLUS his attentive care to the carpets AND furniture made this a very good experience. Try them! I am very pleased." ,
      rating:5
    },

  ]
  const plumbingreview = [
    {
      name: 'Natalie C. Khan',
      date:'24nd October 2022',
      review: "Great job with installation of new hot water tank. Arrived on schedule, left no mess, competitive pricing. Highly recommend !! Thank you Joseph ",
      rating:4.8
    },
    {
      name: "Jes Gölbez",
      date:'16th August 2022',
      review: `D&D was recommended by a friend, who expressed approval of their services. We've now used them twice, and they also helped one my friends with some bathroom repairs. D&D came to our place quickly to deal with an emergency, even after hours, explained the situation in layman's terms, and didn't charge an arm and a leg. The fellow also cleaned up well after himself. I would definitely use them again.`,
      rating:5
    },
    {
      name: "Michael J. ",
      date:'28th November 2022',
      review: "I had a leak from the bottom of my toilet. Jass was great, prompt, efficient and professional. He replaced the old wax ring and was finished within an hour. I would recommend Nifty Plumbing and will use them again in the future. ",
      rating:4.8
    },
    {
      name: "Adaku Emeka ",
      date:'12th October 2022',
      review: "I highly recommend Tiptop Plumbing!! Kevin was responsive and did an amazing work repairing our heating system. Thanks Tiptop for such great customer service especially for loaning us your single heaters while you work on our system. You're so thoughtful. I wish the had more than 5 stars because you deserve it. ",
      rating:4.9
    },
    {
      name: "Matt Spoli ",
      date:'19th September 2022',
      review: "I recently moved from Ontario and Kevin replaced my water heaters (i have 2) here in Calgary. One new heater was faulty out of the box. He quickly called the supplier, scheduled the swap and the next day came to replace the heater. Without charging me for the faulty equipment, it was hassle free. Amazing service, great price and honest work. Its TIP TOP service! Thanks Kevin!" ,
      rating: 5
    },

  ]

  const electriciansreview = [
    {
      name: 'Riyaz ',
      date:'26nd October 2022',
      review: "Electric Avenue came quickly when we had a problem with our electrical panel. The technicians explanation was clear and told me the cost possibilities up front. We would be happy to use them again. ",
      rating:4.8
    },
    {
      name: "Anmore ",
      date:'17th August 2022',
      review: `Highly recommend Tyler at Electronic Avenue! I reached out to him over Yelp and he responded right away. He called when he said he would, he showed up when he said he would. He did the job and charged the price he quoted! I am happy to support a small local business and now Tyler at Electric Avenue is my new electric guy for any of my electrical needs! Thanks so much Tyler! `,
      rating:5
    },
    {
      name: "Port Coquitlam ",
      date:'28th November 2022',
      review: "Tyler is Very Prompt to Respond, Thorough & Methodical. He explains everything upfront, along with costs - NO SURPRISES!. We tracked the source of the short circuit. He reattached an exposed ground wire and had the lights and door bell working in an hour. Everything works Perfectly Now. FYI, he prefers Cash, Interac, or e-Transfers and issues a Receipt on the Spot - Done ✅. I would use Tyler again, knowing how he works and interacts. I paid what I expected and he was competitively priced for the Service. ",
      rating:4.8
    },
    {
      name: "Maple Ridge ",
      date:'12th October 2022',
      review: "Tyler came in shortly after initial calland completed the repair. He also gave us some hints on how to use the electrical appliances better and what to do when we encounter the same problem. Very satisfied customer. ",
      rating:4.9
    },
    {
      name: "Jules H. ",
      date:'19th September 2022',
      review: "If someone shows up and does the job that's half the battle these days and Nightingale did both... they were later than expected due to a problem with their previous call but kept me informed.  They aren't inexpensive, 250.00 for an hour call but I did appreciate Garrett saying that if there was anything else I needed addressed, or smoke detectors checked, I may as well as I'm paying for an hour anyway. Could have just fixed and run ;)  would definitely use them again.. " ,
      rating: 5
    },

  ]
  const pressurereview = [
    {
      name: 'Elizabeth R.',
      date:'26nd October 2022',
      review: "I highly recommend Quality Pressure Wash. They did an awesome job cleaning windows and dusting cobwebs at my home and business office. They are very professional and have great pricing.  ",
      rating:4.8
    },
    {
      name: "Anthony N.",
      date:'17th August 2022',
      review: `Quality Pressure Wash's owner was extremely professional and courteous. He pressure washed our garage and backyard and cleaned the windows inside and out. He is a true professional.`,
      rating:5
    },
    {
      name: "Brian S.",
      date:'28th November 2022',
      review: "The company offered a free estimate and recommendations and provided a detailed list of services and reminders which were super helpful! The team was very punctual and dependable! My house, driveway and porch look great!  ",
      rating:4.8
    },
    {
      name: "Danny H.",
      date:'12th October 2022',
      review: "My whole experience with QPW was excellent, from beginning to end. My roof and my house were both soft washed. What a difference! What's best was that I felt they cared just as much about me as about the job. ",
      rating:4.9
    },
    {
      name: "Susan Randhawa",
      date:'19th September 2022',
      review: "I absolutely recommend Quality Pressure Wash. They were very thorough in their work, going above and beyond to clean areas I hadn't even considered. I am very happy with the results and all at quite reasonable rates/price. Would definitely use again." ,
      rating: 5
    },

  ]
  let review =
  props?.type==='carpetcleaning'?carpetreview:
  props?.type==='plumbers'?plumbingreview:
  props?.type==='electricians'?electriciansreview:
  props?.type==='pressurewashing'?pressurereview:
  movingreview

  const breakPoints = [
    { width: 1, itemsToShow: 3, pagination: false },
    {
        width: 550,
        itemsToShow: 3,
        pagination: false,
        showArrows: false,
        itemsToScroll: 1,
        infinite:true
    },
    {
        width: 1068,
        itemsToShow: 3,
        pagination: false,
        //disableArrowsOnEnd: true,
        showArrows: false,
        itemsToScroll: 1,
        infinite:true
    },
    {
        width: 1500,
        itemsToShow: 3,
        showArrows: false,
        pagination: false,
        itemsToScroll: 1,
        infinite:true
    },
];
const carouselRef = useRef(null);
const totalPages = review.length
let resetTimeout;
  return (
    <>
      <Main>
        <Head>
      <Mainset>
        <ReviewTitle>Hundreds of happy clients</ReviewTitle>
        <p className='subtitle'>Moving with SwiftBel is fast, easy and safe</p>
        <br/>
        <Carousels ref={carouselRef} breakPoints={breakPoints} className='rec' enableAutoPlay
       onNextEnd={({ index }) => {
        clearTimeout(resetTimeout)
        if (index + 1 === totalPages) {
            if (carouselRef?.current?.goTo) {
                resetTimeout = setTimeout(() => {
                    if (carouselRef?.current?.goTo) {
                        carouselRef.current.goTo(0)
                    }
                }, 3000)
            }
        }
    }}>
          {
            review.map((item) =>
              <div>
                <Segment className='p-3'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <ProImage src={proppic} />
                      <div>
                        <p className='name'>{item.name}</p>
                        <p className='nickname'>{item?.date}</p>
                      </div>
                    </div>
                    <div className='d-flex'>
                    <Yelpimg src={Yelp}/>
                    <p className='d-flex'><Ratingimg src={Rating}  />{item?.rating || "5"}</p>
                    </div>
                  </div>
                  <h3 className='review'>{item.review}</h3>
                </Segment>
              </div>
            )
          }
          </Carousels>
        <br />
        <br />
      </Mainset>
      </Head>
      </Main>
    </>
  )
}
export default HomeCarousel;
const Main = styled.div`
display:flex;
justify-content:center;

@media (min-width: 260px) and (max-width: 1311px){
  padding-left:10px;
  padding-right:10px;
  }
`
const Head=styled.div`
padding-top:64px;
padding-bottom:64px;
width:100%;
@media (min-width: 1800px) and (max-width: 9999px){
width:1512px;
}
@media (min-width: 260px) and (max-width: 1311px){
width:100%;
padding-top:10px;
padding-left:0px;
padding-right:0px;
}
`
const Mainset = styled.div`
margin-top:-28px;
padding-bottom:30px;
.subtitle{
    font-family:Inter;
    font-size: 18px;
    text-align: center;
    color: #787373;
    margin-top:-20px;
}
@media (min-width: 260px) and (max-width: 820px){
padding-left:25px;
padding-right:25px;
}
@media (min-width: 360px) and (max-width: 1145px)
{
    background-color: white;
    padding:0rem;
    margin-top:30px;
}
`
const ReviewTitle = styled.h2`
color:black;
font-family:Roobert-medium;
margin-bottom:2rem;
padding-top:20px;
text-align:center;
@media (min-width: 200px) and (max-width: 1145px)
 {
    margin-left:20px;
 }
`
const Segment = styled.div`
border-radius:13px;
width:488px;
background:white;
background-color:white;
.name{
font-family:Roobert-medium;
font-size: 18px;
}
.nickname{
font-size: 14px;
font-family:Roobert-medium;
color: #787373;
margin-top:-15px;
}
.review{
font-size: 16px;
color: #787373;
font-family:Inter;
}
.quotation{
    height:36px;
    width:36px;
}
@media (min-width: 260px) and (max-width: 820px){
  width:330px;
    margin-left:3px;
}
`
const ProImage = styled(Image)`
border-radius:50%;
height:48px;
width:48px;
margin-right:10px;
`
const Yelpimg = styled(Image)`
height:24px;
margin-left:10px;
width:auto;
`
const Ratingimg=styled(Image)`
height:20px;
width:20px;
margin-right:4px;
margin-left:7px;
`
const Carousels=styled(Carousel)`
border:0px solid #fff;
.rec.rec-arrow {
    border-radius: 0;
    border:0px solid none;
    background:none;
    box-shadow: none;
    margin-top:-30px;
    @media (min-width: 260px) and (max-width: 820px){
        display:none;
    }
}
.rec.rec-arrow:hover {
   color:black;
   @media (min-width: 260px) and (max-width: 820px){
    display:none;
}

}
`
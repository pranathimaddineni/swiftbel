import styled from 'styled-components'
import FooterBottom from './FooterComponents/FooterBottom'
import FooterTop from './FooterComponents/FooterTop'

function Footer(){
    return(
        <Main className='d-flex justify-content-center'>
            <div>
             <FooterTop/>
             <FooterBottom/>
            </div>
        </Main>
    )
}
export default Footer

const Main=styled.div`
background:white;
background-color:white;
padding-left:30px;
@media (min-width: 200px) and (max-width: 768px){
padding-left:30px;
}
`
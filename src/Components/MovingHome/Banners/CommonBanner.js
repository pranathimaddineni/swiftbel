import { useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import Autocomplete from 'react-google-autocomplete';
import { useRouter } from 'next/router';
function CommonBanner(props) {
    let router = useRouter();
    const mainAddress = router?.query?.address;
    let servicetype = props?.servicetype
    const [values, setValues] = useState({
        "address":mainAddress,
    })
    const [errors, setErrors] = useState(
        {
            "address": false,
        })

    const isValid = () => {
       if (!(values.address && values.address.length > 0)) {
            setErrors({ ...errors, address: true })
            setTimeout(() => {
                setErrors({ ...errors, address: false })
            }, 3000);
            return false
        }
        else
            return true
    }

    const onPlaceSelected = (place) => {
        const funaddress = place.formatted_address
        setValues({...values,address:funaddress})
    }

    const handleSubmit = async () => {
        if (isValid()) {
            router.push({ pathname: `/${servicetype}/getPrice`
            , query: { 'address': values?.address}
        });
        }
    }

    return (
        <>
                        <Details className={errors?.address ? ' error justify-content-start' : 'justify-content-start'}>
                            <div className='subdiv'>
                                <Place
                                    apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                    types={['address', '(cities)', '(regions)']}
                                    options={{
                                        types: ["geocode", "establishment"],
                                        componentRestrictions: {
                                            country: 'ca'
                                        }
                                    }}
                                    placeholder='Enter your Address'
                                    onPlaceSelected={onPlaceSelected}
                                    className={"form-control form-control-default focusing"}
                                    defaultValue={values?.address}
                                />
                            </div>
                        </Details>

                        <Actions
                    variant='dark' onClick={() => handleSubmit()} >
                    {'See your price'}
                        </Actions>
        </>
    )

}
export default CommonBanner
const Place = styled(Autocomplete)`
height:32px;
width:300px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
margin-top:-8px;
font-size:16px;
font-family:Inter;
font-weight:500;
&::placeholder {
  font:Inter;
  font-size:16px;
  color:gray;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
`
const Actions = styled(Button)`
width:300px;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 820px){
    width:97%;
 }
`

const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:black;
font-family:Inter;
font-size:12px;
height:48px;
padding-bottom:5px;
.focusing{
margin-top:3px;
padding-left:-12px;
padding-bottom:10px;
font-family:Inter;
}
.subdiv{
padding-left:12px;
padding-top:6px;
}
`
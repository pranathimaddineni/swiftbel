import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import Autocomplete from 'react-google-autocomplete';
import { useRouter } from 'next/router';
function MovingBanner() {
    let router = useRouter();
    const [focusedname, setFocusedname] = useState('')
    const fromAddress = router?.query?.address;
    const toAddress = router?.query?.destination;
    const [from, setFrom] = useState(fromAddress );
    const [to, setTo] = useState(toAddress);
    const [values, setValues] = useState({
        "fromAddress":"",
        "toAddress": ""
    })
    const [errors, setErrors] = useState(
        {
            "from": false,
            "to": false,
        })

    const isValid = () => {
        if (!(values.fromAddress && values.fromAddress.length > 0)) {
            setErrors({ ...errors, from: true })
            setTimeout(() => {
                setErrors({ ...errors, from: false })
            }, 3000);
            return false
        }
        else if (!(values.toAddress && values.toAddress.length > 0)) {
            setErrors({ ...errors, to: true })
            setTimeout(() => {
                setErrors({ ...errors, to: false })
            }, 3000);
            return false
        }
        else
            return true
    }

    const onfromPlaceSelected = (place) => {
        const address = place.formatted_address
        setFrom(address)
    }
    const ontoPlaceSelected = (place) => {
        const add = place.formatted_address
        setTo(add)
    }
    useEffect(() => {
        if (to || from) {
            setValues({ ...values, 'toAddress': to, 'fromAddress': from })
        }
    }, [to, from])

    const handleSubmit = async () => {
        if (isValid()) {
            router.push({ pathname: `/moving/estimate/calculation`
            , query: { 'fromAddress': values?.fromAddress, 'toAddress': values?.toAddress }
        });
        }
    }
    const handlefocusing = (name) => {
        setFocusedname(name)
    }
    return (
        <>
                        <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                            <div className='subdiv'>
                                {focusedname === 'from' || values?.fromAddress?.length > 0 ? 'Pick up address' : ''}
                                <Place
                                    apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                    types={['address', '(cities)', '(regions)']}
                                    options={{
                                        types: ["geocode", "establishment"],
                                        componentRestrictions: {
                                            country: 'ca'
                                        }
                                    }}
                                    placeholder='↑ Pick up address'
                                    onPlaceSelected={onfromPlaceSelected}
                                    className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                    defaultValue={values?.fromAddress}
                                />
                            </div>
                        </Details>
                        <Form.Group >
                            <Details className={errors?.to ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('to')}>
                                <div className='subdiv'>
                                    {focusedname === 'to' || values?.toAddress?.length > 0 ? 'Drop-off address' : ''}
                                    <Place
                                        apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                        types={['address', '(cities)', '(regions)']}
                                        options={{
                                            types: ["geocode", "establishment"],
                                            componentRestrictions: {
                                                country: 'ca'
                                            }
                                        }}
                                        placeholder='↓ Drop-off address'
                                        onPlaceSelected={ontoPlaceSelected}
                                        className={focusedname === 'to' || values?.toAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                        defaultValue={values?.toAddress}
                                    />
                                </div>
                            </Details>
                        </Form.Group>
                        <Actions
                    variant='dark' onClick={() => handleSubmit()} >
                    Calculate your price
                        </Actions>
        </>
    )

}
export default MovingBanner
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
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
 }
`

const Actions = styled(Button)`
width:300px;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
@media (min-width: 260px) and (max-width: 820px){
    width:100%;
 }
`

const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
height:54px;
padding-bottom:5px;
focused{
color:Black;
margin-bottom:5px;
margin-top:10px;
font-size:16px;
}
.focusing{
color:#787373;
margin-top:3px;
padding-left:-12px;
font-family:Inter;
}
.subdiv{
padding-left:12px;
padding-top:6px;
}
@media (min-width: 260px) and (max-width: 820px){
    margin-right:0px;
 }
`
import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Image from 'next/image'
import uparrow from '../../../public/assets/open.png';
import downarrow from '../../../public/assets/close.png';
import Localmoving from '../../../public/assets/Localmove.png'
import MoverOnly from '../../../public/assets/Mover.png';
import LongDistance from '../../../public/assets/Longdistancetruck.png';
import condocard from '../../../public/assets/Condocard.png';
import housecard from '../../../public/assets/Housecard.png';
import townhouse from '../../../public/assets/Townhousecard.png';
import Truck from '../../../public/assets/Truck.png';
import Truck2 from '../../../public/assets/truck2.png';
import Truck3 from '../../../public/assets/truck3.png';
import Phone from '../../../public/assets/phone.png';
import msg from '../../../public/assets/msg.png';
import Calendar from 'react-calendar';
import { TimeList } from '../../utils/DataList';
import moment from 'moment';
import Fadingcircles from '../../../public/assets/faded.gif';
import info from '../../../public/assets/info.png';
import PhoneInput from 'react-phone-number-input';
import { moving, newMoving } from '../../store/Actions/User.action';
import { isAuthenticated } from '../../utils/Authentication';
import { useRouter } from 'next/router';
import MobileMovingForm from './MobileMovingForm';
import { useIntercom } from 'react-use-intercom';
import MovileBreakdown from './MobileEstimatebreakdown';

Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

const MovingForm = (props) => {
    const dispatch = useDispatch();
    let location = useRouter();
    const address = location?.query?.fromAddress;
    const date = location?.state?.date
    const time = location?.state?.time
    const [datecalendar, setDatecalendar] = useState(false);
    const [isloading, setIsloading] = useState(false)
    const [focusedname, setFocusedname] = useState('')
    const [count, setCount] = useState(2);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loader, setLoader] = useState(false)
    const [truckInfo, setTruckInfo] = useState('')
    const search = location.search;
    const toAddress = location?.query?.toAddress;
    const [likeList, setLikeList] = useState('')
    const numberOfRooms = new URLSearchParams(search).get('numberOfRooms');
    const [from, setFrom] = useState(location?.query?.fromAddress);
    const [to, setTo] = useState(toAddress);
    const [activeForm, setActiveForm] = useState(false)
    const [index, setIndex] = useState(0);
    const [phoneHover, setPhoneHover] = useState("Call to Speak")
    const [distance, setDistance] = useState('')
    const [houseoptions, setHouseOptions] = useState([{ name: 'House', img: housecard }, { name: 'Townhouse', img: townhouse }, { name: 'Condo', img: condocard }])
    let navigate = useRouter();
    const { show } = useIntercom();
    const datadetail = useSelector(state => state.customerReducer.service);
    const rooms = ['1', '2', '3', '4']
    const MoveArray = [
        {
            type: 'Local Moving',
            image: Localmoving,
            value: "If you're moving within a 100-kilometer radius of Vancouver.",
            color: '#FDF5F0'
        },
        {
            type: 'Helpers Only',
            image: MoverOnly,
            value: `If you don't need a truck and just want reliable workers for packing or moving things.`,
            color: '#FDF3F7'
        },
        {
            type: 'Long Distance',
            image: LongDistance,
            value: "If you're moving within Canada and more than 100 kilometers from Vancouver.",
            color: '#F5F9F3'
        }

    ]
    const [recommended, setRecommended] = useState(129)
    const [values, setValues] = useState({
        "typeofHouse":  "Condo",
        "approxSizeInSqFt":  "500 to 1,200 ",
        "numberOfRooms":  "2",
        "elevatorAvailable":  "Shared elevator",
        "fromAddress":  address || "",
        "date": date || moment(new Date()).format('DD MMM YYYY'),
        "time": time || "8:00 AM",
        "toAddress": toAddress || "",
        "movers": recommended ? recommended : 129,
        "typeOfMove": 'twoMoverthreeTonTruck',
    })

    const [Bool, setBool] = useState({
        "condo": false,
        "size": false,
        "rooms": false,
        "elevator": false,
    })
    const trucktypes = [
        { title: '1  Mover with a truck ', value: 95, label: 'oneMoverWithTruck', img: Truck, },
        { title: '2 Movers with 3 ton truck ', value: 129, label: 'twoMoverthreeTonTruck', recommended: values?.approxSizeInSqFt === 'Less than 500' || values?.approxSizeInSqFt === '500 to 1,200 ' ? true : false, img: Truck2 },
        { title: '3 Movers with 5 ton truck ', value: 169, recommended: values?.approxSizeInSqFt === '1,200 to 2,000 ' || values?.approxSizeInSqFt === '2,000 to 3,000 ' ? true : false, label: 'threeMoverFiveTonTruck', img: Truck3 },
        { title: '4 Movers with 5 ton truck ', value: 210, label: 'fourMoverFiveTonTruck', recommended: values?.approxSizeInSqFt === '3,000 to 4,000 ' || values?.approxSizeInSqFt === '4,000 to 5,000 ' ? true : false, img: Truck3 }
    ]
    const [errors, setErrors] = useState(
        {
            "condo": false,
            "size": false,
            "rooms": false,
            "elevator": false,
            "from": false,
            "to": false,
            "date": false,
            "time": false
        })
    const profileData = useSelector((state) => state.profileReducer)
    useEffect(() => {
        setActiveForm(props?.activeForm)
    
    }, [props?.activeForm, props.activeTruck])

    useEffect(() => {
        setValues({ ...values, "movers": recommended, "typeOfMove": recommended === 129 ? 'twoMoverthreeTonTruck' : recommended === 169 ? 'threeMoverFiveTonTruck' : 'fourMoverFiveTonTruck' })
    }, [recommended])
    useEffect(() => {
        if (profileData?.movingData.length > 0) {
            setValues(profileData?.movingData)
        }
        if (numberOfRooms) {
            dispatch(moving(values, 1, 50));
        }
    }, [profileData, numberOfRooms])


    const handlebool = (type) => {
        if (type === 'condo') {
            setBool({ ...Bool, condo: !Bool.condo, size: false, rooms: false, elevator: false })
        }
        else if (type === 'size') {
            setBool({ ...Bool, size: !Bool.size, condo: false, rooms: false, elevator: false })
        }
        else if (type === 'rooms') {
            setBool({ ...Bool, rooms: !Bool.rooms, size: false, condo: false, elevator: false })
        }
        else if (type === 'elevator') {
            setBool({ ...Bool, elevator: !Bool.elevator, size: false, rooms: false, condo: false })
        }

    }
    const handlerange = () => {
        const
            range = document.getElementById('range'),
            rangeV = document.getElementById('rangeV'),
            setValue = () => {
                const
                    newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
                    newPosition = 10 - (newValue * 0.2);
                rangeV.innerHTML = `<span>${range.value}</span>`;
                rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
            };
        document.addEventListener("DOMContentLoaded", setValue);
        range.addEventListener('input', setValue);
        setValues({ ...values, numberOfRooms: parseInt(range.value) })
    }

    const handlechange = (name, place) => (event, e) => {
        let value =
            name === 'numberOfRooms' ? parseInt(event.target.value) || 'Enter number of rooms' :
                name === 'date' ? moment(event).format('DD MMM YYYY') :
                    name === 'typeofHouse' || name === 'approxSizeInSqFt' || name === 'howHeavyBelongings' || name === 'elevatorAvailable' ? event.target.id
                        : event.target.value
        if (name === 'date') {
            setDatecalendar(false)
        }
        if (name === 'approxSizeInSqFt') {

            const mover = event.target.id === 'Less than 500' || event.target.id === '500 to 1,200 ' ? 129 : event.target.id === '1,200 to 2,000 ' || event.target.id === '2,000 to 3,000 ' ? 169 : 210
            setRecommended(mover);
            setValues({ ...values, [name]: value, "movers": mover, "typeOfMove": mover === 129 ? 'twoMoverthreeTonTruck' : mover === 169 ? 'threeMoverFiveTonTruck' : 'fourMoverFiveTonTruck' })
        }
        setValues({ ...values, [name]: value })
        //dispatch({ type: 'NEWVALUES', payload: { ...det?.newValues, [name]: value } })
        if (name === 'typeofHouse') {
            setBool({ ...Bool, condo: !Bool.condo })
        }
        else if (name === 'approxSizeInSqFt') {
            setBool({ ...Bool, size: !Bool.size })
        }
        else if (name === 'elevatorAvailable') {
            setBool({ ...Bool, elevator: !Bool.elevator })
        }

    }

    const listing = [
        {
            heading: 'Travel time to start point (Fixed)',
            data: `1 hour ($${datadetail?.[0]?.travelCharge})`
        },
        {
            heading: 'Loading time',
            data: `${Math.ceil(datadetail?.[0]?.loadingTime)} hours ($${Math.ceil(datadetail?.[0]?.loadingCharge)})`
        },
        {
            heading: 'Travel between locations:',
            data: `${datadetail?.[0]?.estimatedTime} ($${datadetail?.[0]?.travelBetweenCharge})`,
            className: 'diff'
        },
        {
            heading: 'Unloading time',
            data: `${Math.ceil(datadetail?.[0]?.unloadingTime)} hours ($${Math.ceil(datadetail?.[0]?.unloadingCharge)})`
        },
       
    ]
    console.log(datadetail, 'datadett')
    const renderLikeList = () => {
        return <div className="likes__list" >
            <p className='headinglist'>Estimate Breakdown</p>
            <hr />
            <p>Estimated cost is based on information provided & similar moves in your area. Actual cost is determined by hourly rate. </p>
            <br />
            {listing?.map((item, index) => {
                return (
                    <div className='d-flex justify-content-between p-1' key={index}>
                        <div >
                            <p className={item?.className === 'diff' ? 'heads' : 'heads'}>{item?.heading}</p>
                        </div>
                        <div >
                            <p className={item?.className === 'diff' ? 'heads text-end' : 'heads text-end'}>{item?.data}</p>
                        </div>
                    </div>
                )
            })}
            <hr />
            <div className='d-flex justify-content-between p-2 mt-3'>
                <p className='heads3'>Total</p>
                <p className='heads3 text-end'> ${datadetail?.[0]?.finalPrice}</p>
            </div>
        </div>
    }
    const handleLeave = () => {
        return setLikeList('')
    }
    const handleHover = () => {
        return setLikeList(renderLikeList())
    }
    const handlephoneLeave = () => {
        return setPhoneHover('Call to Speak')
    }
    const handlephoneHover = () => {
        return setPhoneHover("(604) 358-4116")
    }
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
        else if (!(values.typeofHouse && values.typeofHouse.length > 0)) {
            setErrors({ ...errors, condo: true })
            setTimeout(() => {
                setErrors({ ...errors, condo: false })
            }, 3000);
            return false
        }
        else if (!(values.approxSizeInSqFt && values.approxSizeInSqFt.length > 0)) {
            setErrors({ ...errors, size: true })
            setTimeout(() => {
                setErrors({ ...errors, size: false })
            }, 3000);
            return false
        }
        else if (!(values.numberOfRooms || values.numberOfRooms === isNaN)) {
            setErrors({ ...errors, rooms: true })
            setTimeout(() => {
                setErrors({ ...errors, rooms: false })
            }, 3000);
            return false
        }
        else if (!(values.elevatorAvailable && values.elevatorAvailable.length > 0)) {
            setErrors({ ...errors, elevator: true })
            setTimeout(() => {
                setErrors({ ...errors, elevator: false })
            }, 3000);
            return false
        }
        else if (!(values.date && values.date.length > 0)) {
            setErrors({ ...errors, date: true })
            setTimeout(() => {
                setErrors({ ...errors, date: false })
            }, 3000);
            return false
        }
        else if (!(values.time && values.time.length > 0)) {
            setErrors({ ...errors, time: true })
            setTimeout(() => {
                setErrors({ ...errors, time: false })
            }, 3000);
            return false
        }
        else
            return true
    }

    const onfromPlaceSelected = (place) => {
        console.log(place)
        const address = place.formatted_address
        props?.fromAddres(place.formatted_address)
        setFrom(address)
    }
    const ontoPlaceSelected = (place) => {
        const add = place.formatted_address
        props?.toAddres(place.formatted_address)
        setTo(add)
    }
    const calculateRoute = async () => {

        const directionsService = new google.maps.DirectionsService()

        const results = await directionsService?.route({
            origin: from,
            destination: to,
            travelMode: google.maps.TravelMode.DRIVING
        })
        let val = results?.routes[0].legs[0].distance.text.split(" ")
        console.log(parseInt(val[0]) > 75, parseFloat(val[0].replace(/,/g, ''), 10), val[0], "ghvh")
        setDistance(parseInt(val[0].replace(/,/g, '')))
        parseInt(val[0].replace(/,/g, '')) >= 75 ? setIndex(2) : setIndex(0)
    }

    useEffect(() => {
        if (to || from) {
            setValues({ ...values, 'toAddress': to, 'fromAddress': from })
        }
        calculateRoute()

    }, [to, from])
    // const mql =new window.matchMedia("(min-width: 1200px) and (max-width: 1360px)").matches
    let limit = 10
    let dataLayer = [];
    function gtag() { dataLayer.push(arguments); }
    function gtag_report_conversion(url) {
        var callback = function () {
            if (typeof (url) != 'undefined') { location.asPath = url; }
        };
        gtag('event', 'conversion', { 'send_to': 'AW-10955203557/v9raCNSviYMYEOXH7Oco', 'event_callback': callback });
        return false;
    }
    const handleSubmit = async () => {

        const moverOnlyData = {
            "fromAddress": values.fromAddress,
            "numberOfMovers": count,
            "date": values.date,
            "time": values.time
        }
        window.analytics.identify("Clicking get an estimate",
        
           {...values,"service name":MoveArray[index],"button_color":'black',"button_text":"get an estimate"}
        );
        // gtag_report_conversion()
        if (isValid()) {
            dispatch({ type: 'moving_data', payload: values })
            setIsloading(true)
            let res
            // window.analytics.track("Search results Customer form", { values, color: '#000', form_side: 'right' });
            if (index === 1) {
                res = await dispatch(newMoving(moverOnlyData, 1, limit));
                setActiveForm(true)
                props?.value(true, false)
                props?.handleSubmit(values?.movers)

            }
            else if (index === 2) {
                res = await dispatch(newMoving({ ...values, "phone": phone, "name": name }, 1, limit));
                setActiveForm(true)
                props?.value(true, false)
                props?.requestCallback();

            }
            else {
                res = await dispatch(newMoving(values, 1, limit));
                setActiveForm(true)
                props?.value(true, false)
                props?.handleSubmit(values?.movers)
            }
           
            setIsloading(false)
            localStorage.setItem('values', JSON.stringify(res?.finalData))
            localStorage.setItem('data', JSON.stringify(res?.data))
            setIsloading(false)

            if (window.innerWidth < 800) {
              //  props?.onHide()
            }
            else if (res.status === false) {
            }
            else if (res.status === true && res.message !== 'Success') {
            }
        }
    }
    const handledate = () => {
        if (datecalendar === false) {
            setDatecalendar(true)
        }
        else
            setDatecalendar(false)

    }
    const handlefocusing = (name) => {
        setFocusedname(name)
    }
    const renderTruckList = () => {
        return (
            <div className="likes__list" >
                <div className='d-flex justify-content-between p-2 mt-4'>
                    <p className='heads2'>Given the characteristics of your home, including its type, size, and location, we have determined that this truck size and number of movers will minimize the cost of your move.</p>
                </div>
            </div>
        )
    }
    const handleTruckinfoLeave = () => {
        return setTruckInfo('')
    }
    const handleTruckinfoHover = () => {
        return setTruckInfo(renderTruckList())
    }

    const SizeOptions = ['Less than 500', '500 to 1,200 ', '1,200 to 2,000 ', '2,000 to 3,000 ', '3,000 to 4,000 ', '4,000 to 5,000 ']

    const checkout = () => {
        window.analytics.identify("Clicking Reserve now",
        {
            "Service Name":"Moving", 
            "Estimated price":datadetail[0]?.estimatedHourlyPrice, 
            "Price":datadetail[0]?.finalPrice, 
            "Button_colour":"black" 

        });
        localStorage.setItem('data', JSON.stringify(datadetail[0]))
        localStorage.setItem('type', 'Moving')
        localStorage.setItem('spId', datadetail[0]?.spId)
        if (index !== 2) {
            if (datadetail[0]?.spId) {
                if (isAuthenticated()) {
                    navigate.push({ pathname: `/payment`, state: { servicename: "Moving", spId: datadetail[0]?.spId } })
                }
                else {
                    navigate.push({ pathname: `/details`, state: { servicename: "Moving", spId: datadetail[0]?.spId } })
                }
            }
        }
    }
    const renderItemMoverTruck = () => {
        return (
            <Webview>
                <Placing >
                    <div className='d-flex mb-3' style={{ borderRadius: '13px' }}>
                        <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                            Moving date
                            <p style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: '500', color: 'black' }}>
                                {values?.date ? values?.date : 'Select date'}
                            </p>
                        </Dates>
                        <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                            <div className='substyle'>
                                Preferred time
                                <Time aria-label="Floating label select example" onChange={handlechange('time')}>
                                    <option>{values?.time ? values?.time : 'Select time'}</option>
                                    {TimeList.map((item, index) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}

                                </Time>
                            </div>
                        </DetailsDrop>
                    </div>

                </Placing>

                <Placing>
                    <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                        <div className='subdiv'>
                            {focusedname === 'from' || values?.fromAddress?.length > 0 ? ' Starting address' : ''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where are you moving from ?'
                                onPlaceSelected={onfromPlaceSelected}
                                className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.fromAddress}
                            />
                        </div>
                    </Details>
                    <Details className={errors?.to ? ' error justify-content-start ' : 'justify-content-start'} onClick={() => handlefocusing('to')}>
                        <div className='subdiv'>
                            {focusedname === 'to' || values?.toAddress?.length > 0 ? 'Destination address' : ''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where are you moving to ? '
                                onPlaceSelected={ontoPlaceSelected}
                                className={focusedname === 'to' || values?.toAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.toAddress}
                            />
                        </div>
                    </Details>
                </Placing>

                <Placing>
                    <Form.Group className="mb-1">
                        <Details onClick={() => handlebool('rooms')} className={errors?.rooms ? 'error d-flex justify-content-between' : 'd-flex justify-content-between'}>
                            <Innerdiv className='d-flex justify-content-between' onClick={() => handlebool('rooms')}>
                                <div>
                                    Number of bedrooms
                                    <NoOfRoom aria-label="Floating label select example" onChange={handlechange('numberOfRooms')} defaultValue={values?.numberOfRooms}>
                                        {/* <option>{values?.numberOfRooms ? values?.numberOfRooms : 'Select rooms'}</option> */}
                                        {rooms.map((item, index) => {
                                            return (
                                                <option value={item}>{item}</option>
                                            )
                                        })}

                                    </NoOfRoom>
                                </div>
                            </Innerdiv>
                        </Details>
                    </Form.Group>
                    <Form.Group className="mb-1">

                        <Details onClick={() => handlebool('size')} className={errors?.size ? ' error d-flex justify-content-between' : 'd-flex justify-content-between'}>
                            <Innerdiv className='d-flex justify-content-between'>
                                <div>
                                    Approx. size in square feet
                                    <Text>{values.approxSizeInSqFt}</Text>
                                </div>
                                <div>
                                    <Img src={Bool.size === true ? uparrow : downarrow} />
                                </div>
                            </Innerdiv>
                        </Details>
                        {Bool.size === true ?
                            <DetailsOptions className='mt-1'>
                                {SizeOptions?.map((item, index) => {
                                    return <Text className='maintext' id={item} key={index} onClick={handlechange('approxSizeInSqFt')}>{item} </Text>
                                })}
                            </DetailsOptions>
                            : ''}
                    </Form.Group>


                </Placing>
                {index !== 0 ? <Editoption>
                    <NameInnerdiv >
                        <div>
                            Name
                            <Input
                                type="text"
                                placeholder='Name'
                                className='input'
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </NameInnerdiv>
                </Editoption> : null}
                {datecalendar === true ?
                    <CalendarStyle style={{ zIndex: 10000 }} className='p-3 d-flex justify-content-center'>
                        <Calendar className='react-calendar' onChange={handlechange('date')}
                            minDate={new window.Date()}
                        />
                    </CalendarStyle> : ''}

                <Placing>

                </Placing>

                {index !== 0 ? <div className='phone-input-owner'>
                    <PhoneNumber
                        name='phoneinput'
                        international
                        placeholder="Enter phone number"
                        focusInputOnCountrySelection='true'
                        defaultCountry="CA"
                        limitMaxLength='true'
                        onChange={(value) => {
                            setPhone(value)
                        }}
                    // value={`+${phone}`}
                    />
                    <br />

                </div> : null}

                {index === 2 || index === 0 ? <Placing >
                    {
                        houseoptions?.map((item, index) =>
                            <HouseContainer style={{ backgroundColor: item.name === values.typeofHouse ? "#F7F5FA" : null, cursor: 'pointer',borderColor:item.name===values.typeofHouse?'#957DBD':null }} id={item.name} key={index} onClick={handlechange('typeofHouse')}>
                                < p id={item.name} key={index} className='text'>{item.name}</p>
                                <HouseImage id={item.name} key={index} className='cardImg' src={item.img} />

                            </HouseContainer>
                        )
                    }

                </Placing> : null}
            </Webview>
        )
    }
    const LocalMoving = () => {
        return (
            <Webview>
                <Placing >
                    <div className='d-flex mb-3' style={{ borderRadius: '13px', border: '1px solid #F3F3F3' }}>
                        <Dates onClick={() => handledate()} className={errors?.date ? ' error' : ''}>
                            Moving date
                            <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: '500', color: 'black' }}>
                                {values?.date ? values?.date : 'Select date'}
                            </p>
                        </Dates>
                        <DetailsDrop className={errors?.time ? ' error justify-content-start' : 'justify-content-start'} >
                            <div className='substyle'>
                                Preferred time
                                <Time aria-label="Floating label select example" onChange={handlechange('time')}>
                                    <option>{values?.time ? values?.time : 'Select time'}</option>
                                    {TimeList.map((item, index) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}

                                </Time>
                            </div>
                        </DetailsDrop>
                    </div>

                </Placing>
                <Placing>
                    <Details className={errors?.from ? ' error justify-content-start' : 'justify-content-start'} onClick={() => handlefocusing('from')}>
                        <div className='subdiv'>
                            {focusedname === 'from' || values?.fromAddress?.length > 0 ? ' Starting address' : ''}
                            <Place
                                apiKey='AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA'
                                types={['address', '(cities)', '(regions)']}
                                options={{
                                    types: ["geocode", "establishment"],
                                    componentRestrictions: {
                                        country: 'ca'
                                    }
                                }}
                                placeholder='Where are you moving from ?'
                                onPlaceSelected={onfromPlaceSelected}
                                className={focusedname === 'from' || values?.fromAddress?.length > 0 ? "form-control form-control-default focused" : "form-control form-control-default focusing"}
                                defaultValue={values?.fromAddress}
                            />
                        </div>
                    </Details>
                    <Details className={errors?.rooms ? 'd-flex justify-content-between error' : 'd-flex justify-content-between'}>
                        <Innerdiv className=' justify-content-between' >
                            <div>
                                Number of bedrooms
                                <NoOfRoom aria-label="Floating label select example" onChange={handlechange('numberOfRooms')}>
                                    <option>{values?.numberOfRooms ? values?.numberOfRooms : 'Select rooms'}</option>
                                    {rooms.map((item, index) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}

                                </NoOfRoom>
                            </div>
                        </Innerdiv>
                    </Details>

                </Placing>
                {datecalendar === true ?
                    <CalendarStyle style={{ zIndex: 10000 }} className='p-3 d-flex justify-content-center'>
                        <Calendar className='react-calendar' onChange={handlechange('date')}
                            minDate={new window.Date()}
                        />
                    </CalendarStyle> : ''}
                {Bool.rooms === true ?
                    <>
                        <DetailsOptions style={{ width: '400px' }} className='mt-1'>
                            <div className='d-flex justify-content-between p-3'>
                                <p>Number of rooms</p>
                                <input id="rangeV" value={values?.numberOfRooms} type='number' maxLength='1'
                                    onChange={handlechange('numberOfRooms')}
                                    style={{ border: '1px solid grey', borderRadius: '6px', width: '56px', height: '32px', textAlign: 'center', paddingTop: '3px', paddingBottom: '5px' }}
                                />
                            </div>
                            <div className='d-flex p-3'>0<input id="range" type="range" min="0" max="4" step="1" value={parseInt(values?.numberOfRooms)} onChange={() => handlerange()} />4</div>
                        </DetailsOptions>
                    </>

                    : ''}
            </Webview>
        )
    }
    const FormDetails = () => {
        return (
            <>
                <TruckContainer >
                    {index !== 1 ? <Row>
                        <FormSegment  >
                            <Webview>
                                <div style={{ backgroundColor: MoveArray[index]?.color }}>
                                    <div className='d-flex justify-content-center'>
                                        <Image className='cardImg' src={MoveArray[index]?.image} />
                                    </div>
                                </div>
                                <hr style={{ marginTop: '0px' }} />
                                <p style={{ textAlign: 'center', marginBottom: '5px', marginTop: '-10px' }}>Type of moving</p>
                                <p className='cardText'>{MoveArray[index]?.type}</p>
                            </Webview>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>Type of moving</p>
                                        <p className='cardText'>{MoveArray[index]?.type}</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: MoveArray[index]?.color }}>
                                        <div>
                                            <Image className='cardImg' src={MoveArray[index]?.image} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                        <FormSegment  >
                            <Webview>
                                <div style={{ backgroundColor: '#F7F5FA' }}>
                                    <div className='d-flex justify-content-center'>
                                        <Image className='cardImg' src={values.typeofHouse === "House" ? housecard : values.typeofHouse === "Condo" ? condocard : townhouse} />
                                    </div>
                                </div>
                                <hr style={{ marginTop: '0px' }} />
                                <p style={{ textAlign: 'center', marginBottom: '5px', marginTop: '-10px' }}>Type of house</p>
                                <p className='cardText'>{values.typeofHouse}</p>
                            </Webview>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>Type of house</p>
                                        <p className='cardText'>{values.typeofHouse}</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: "#F7F5FA" }}>
                                        <div >
                                            <Image className='cardImg' src={values.typeofHouse === "House" ? housecard : values.typeofHouse === "Condo" ? condocard : townhouse} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                        <FormSegment  >
                            <Webview>
                                <div className="likes__relavance" onMouseOver={handleTruckinfoHover} onMouseLeave={handleTruckinfoLeave}>
                                    <div style={{ backgroundColor: '#F5F9F3' }}>
                                        <div className='d-flex justify-content-center'>
                                            <Image className='cardImg' src={Truck} />
                                        </div>
                                    </div>
                                    <hr style={{ marginTop: '0px' }} />
                                    <div className='d-flex justify-content-center'>
                                        <p style={{ textAlign: 'center', marginBottom: '5px', marginTop: '-10px' }}>$ {datadetail[0]?.estimatedHourlyPrice} per hour</p>
                                        <Image style={{ width: '18px', height: '18px', marginTop: '-10px', padding: '3px' }} src={info} />
                                    </div>
                                    <p className='cardText'>{
                                        trucktypes.map((item) => {
                                            if (item.value === datadetail[0]?.estimatedHourlyPrice)
                                                return item.title
                                        })
                                    }</p>
                                    {truckInfo}
                                </div>
                            </Webview>
                            <MobileView>
                                <FormPlacing className='d-flex justify-content-between'>
                                    <div className='text'>
                                        <p style={{ marginBottom: '5px', marginTop: '0px' }}>$ {values.movers} per hour</p>
                                        <p className='cardText'>{
                                            trucktypes.map((item) => {
                                                if (item.value === values.movers)
                                                    return item.title
                                            })
                                        }</p>
                                    </div>
                                    <div className='imgcontain' style={{ backgroundColor: "#F5F9F3" }}>
                                        <div >
                                            <Image style={{ marginLeft: '10px' }} className='cardImg' src={Truck} />
                                        </div>
                                    </div>
                                </FormPlacing>
                            </MobileView>
                        </FormSegment>
                    </Row> : null}
                    <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Pick up address
                            <Text>{values.fromAddress}</Text>
                        </div>
                    </FormInnerdiv>
                    <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Destination
                            <Text>{values.toAddress}</Text>
                        </div>
                    </FormInnerdiv>
                    <FormInnerdiv className='d-flex justify-content-between'>
                        <div>
                            Date and Time
                            <Text>{values.date}, {values.time}</Text>
                        </div>
                    </FormInnerdiv>
                    <FormInnerdiv>
                        <div className="likes__relavance" onClick={()=>setLoader(true)} onMouseOver={handleHover} onMouseLeave={handleLeave} >
                            <div style={{ marginRight: '24px' }} className='d-flex justify-content-between'>
                                <p>Estimated price</p>
                                <div className='d-flex'>
                                    <h4>${datadetail[0]?.finalPrice}</h4>
                                   {index !== 1 ?  <Image style={{ width: '30px', height: '30px', padding: '6px' }} src={info} />:null}
                                </div>
                            </div>
                            {index !== 1||loader ? likeList:null}
                        </div>
                        {index !== 1 ? <><br />

                            <div style={{ marginRight: '24px' }} className='d-flex justify-content-between'>
                                <p>Price</p>

                                <h4>${datadetail[0]?.estimatedHourlyPrice} per hour</h4>



                            </div>


                        </> : null}
                    </FormInnerdiv>
                    <Hr/>
                </TruckContainer>
                <PriceSection className='d-flex justify-content-between'>
                    <h6>Due now</h6>
                    <h4>$0</h4>
                    </PriceSection>
            </>
        )
    }
    return (
        <React.Fragment>
            <Card1Moving >
                {console.log(index, "indexxxx")}
               {activeForm?null:
                <Toggle className='d-flex'>
                    <div
                        className={index === 0 || index === 2 ? 'activeclass' : 'class'}
                    >
                        <p id='AM' onClick={() => setIndex(distance >= 75 ? 2 : 0)}>{index === 0 || index === 2 ? MoveArray[index].type : "Local moving"}</p>
                    </div>
                    <div className={index === 1 ? 'activeclass' : 'class'}
                    >
                        <p id='PM' onClick={() => setIndex(1)}>Helpers only</p>
                    </div>
                </Toggle>}

                {index || index === 0 && !activeForm ? <MobileView>
                    <MobileMovingForm
                        values={(value) => {
                            setValues(value)
                            setFrom(value?.fromAddress)
                            setTo(value?.toAddress)
                        }}
                        index={index}
                    />
                </MobileView> : null}

                {activeForm ? FormDetails() :
                    index === 1 ? LocalMoving() : index === 2 || index === 0 ? renderItemMoverTruck() : null}
                {activeForm ? <p className='text2'>Reserve at <span className="spink">no cost</span>, you'll only pay after your move is completed</p> : null}
               
                   {!activeForm? <MobileView>
               
              <Actions
                        style={{ backgroundColor: isloading ? '#DDDDDD' : '#000' }}
                        variant='dark' onClick={() => index === "" ? null : activeForm ? checkout() : index === 0 ? handleSubmit() : handleSubmit()} >
                        {isloading ? <div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                            <Image style={{ width: '8%', height: 'auto', alignSelf: 'center', objectFit: 'cover' }} src={Fadingcircles} alt='loading.....' /></div>
                            : activeForm ?
                                "Reserve" :index===1?"Calculate Estimate": "Get estimated price"
                        }
                    </Actions></MobileView>:null}
                    <Webview>
                    <Actions
                        style={{ backgroundColor: isloading ? '#DDDDDD' : '#000' }}
                        variant='dark' onClick={() => index === "" ? null : activeForm ? checkout() : index === 0 ? handleSubmit() : handleSubmit()} >
                        {isloading ? <div style={{ alignSelf: 'center', justifyContent: 'center', width: '100%' }}>
                            <Image style={{ width: '8%', height: 'auto', alignSelf: 'center', objectFit: 'cover' }} src={Fadingcircles} alt='loading.....' /></div>
                            : activeForm ?
                                "Reserve" :index===1?"Calculate Estimate": "Get estimated price"
                        }
                    </Actions>
                    <br/>
                    <br/>
                    </Webview>
               
                {activeForm ? <CallUsWrapper>
                    <CallusActions className='' style={{ marginRight: '10px' }} variant='light' onClick={(e)=>{show(e)
                     window.analytics.track("Clicking Chat with someone");
                    }}>
                        <div className='imgwrap'>
                            <Image className='img' src={msg} />
                            Chat with someone
                        </div>

                    </CallusActions>

                    <CallusActions
                    onClick={()=> window.analytics.track("Clicking Call to speak")}
                        variant='light' onMouseOver={handlephoneHover} onMouseLeave={handlephoneLeave} >
                        <div className='imgwrap'>
                            <Image className='img' src={Phone} />
                            {phoneHover ? phoneHover : 'Call to Speak"'}
                        </div>
                    </CallusActions>
                </CallUsWrapper> : null}
            </Card1Moving>
           {activeForm? <Footer>
                        <div className='d-flex justify-content-between'>
                        {datadetail?.[0]?.estimatedHourlyPrice ? <div >
                            <p style={{marginLeft:'0px'}} className='estimatedprice'>${datadetail?.[0]?.estimatedHourlyPrice} <span style={{fontSize:'16px'}}>per hour</span></p>
                              {datadetail?.[0]?.estimatedHourlyPrice ? <p onClick={()=>setLoader(true)} style={{  marginTop: '-15px',fontSize:'12px',color:'gray' }} > <u>Your estimated price is ${datadetail?.[0]?.finalPrice}</u></p> : null}
                        </div> : null}
                        <Vbutton class="fun" variant="dark" size='md' onClick={()=>checkout()} >Reserve now</Vbutton>
                        </div>
                    </Footer>:null}
                    <MovileBreakdown
              show={loader}
              onHide={() => setLoader(false)}
            />
        </React.Fragment>
    )

}
export default MovingForm;

const Text = styled.p`
font-size:16px;
font-family: Inter;
font-style: normal;
font-weight: 400;
cursor:pointer;
color: black;
`
const PriceSection=styled.div`
margin-right:34px;
@media (min-width: 260px) and (max-width: 969px){
    margin-right:23px;
 }
`
const Webview = styled.div`
display:inline;
@media (min-width: 260px) and (max-width: 969px){
    display:none;
  }
`
const Hr=styled.hr`
margin-left:-10px;
margin-top:70px;
@media (min-width: 260px) and (max-width: 969px){
    margin-right:0px;
 }
`
const MobileView = styled.div`
display:inline;
padding:0px;
@media (min-width: 970px) and (max-width: 10000px){
    display:none;
  }
`
const Placing = styled.div`
display:flex;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
  }
`
const FormPlacing = styled.div`
display:flex;
.text{
    padding:20px;  
}
.imgcontain{
    display:flex;
    justify-content:center;
    align-items:center;
}
@media (min-width: 260px) and (max-width: 969px){
    display:flex;
    .imgcontain{
        width:100px; 
    }
  }
`
const Toggle = styled.div`
background-color:#F3F3F3;
border-radius:8px;
cursor:pointer;
margin-right:15px;
margin-bottom:15px;
.activeclass{
  color:#ffffff;
  background-color:#000;
  font-size:15;
  border-radius:8px;
  width:248px;
  display:flex;
  justify-content:center;
  text-align:center;
  align-items:center;
  padding-top:13px;
}
.class{
  color:#000;
  background-color:#F3F3F3;
  font-size:15;
  border-radius:8px;
  width:248px;
  display:flex;
  justify-content:center;
  text-align:center;
  align-items:center;
  padding-top:13px;
}
`
const TruckContainer = styled.div`
width:535px;
margin-left:12px;
margin-right:8px;.likes__list{
    position:absolute;
    box-sizing: border-box;
    left:30%;
    width:400px;
    z-index:999;
    background:white;
    padding-left:16px;
    padding-right:16px;
    border-radius:8px;
    box-shadow: 0 0 1px 1px #787373;
    filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
    @media (min-width: 260px) and (max-width: 969px){
        left:0%;
        right:30%;
        width:300px;
      }
  }
  .heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
}
.headinglist{
color:black;
font-size:20px;
text-align:center;
margin-top:15px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
.heads3{
    font-family: Inter;
    font-weight: 500;
    font-size: 18px;
    color: black;
    margin-top:-10px;
}
@media (min-width: 260px) and (max-width: 969px){
    width:450px;
    margin-left:2px;
  }
`

const Card1Moving = styled.div`
padding-top:15px;
padding-bottom:30px;
width:100%;
background-color:#fff;
border-radius:8px;
@media (min-width: 821px) and (max-width: 10000px){
padding-left:10px;
}
.spink{
color:#D81159;
font-weight:500;
}
.button{
    background-color:#D81159;
    border:1px solid #D81159;
    color:#fff;
}
.error{
    border:3px solid red;
    }
.text1{
font-family:Roobert-medium;
font-weight: 500;
font-size: 32px;
color: #190F0F;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 21px;
        overflow-y:hidden;
        overflow-x:hidden;
    }
}
.text2{
    font-family:Inter;
    font-size: 14px;
    text-align:center;
    margin-left:-20px;
    color: #787373;
    @media (min-width: 260px) and (max-width: 820px){
        font-size: 14px;
        margin-left:0px;
        
    }
}

`
const Place = styled(Autocomplete)`
height: 26px;
border-radius:10px;
border-width:0px;
margin-left:-12px;
font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
font-size: 14px;
width:228px;
@media (min-width: 260px) and (max-width: 1115px){
    width:228px;
  }

&::placeholder {
  font:Roobert-medium;
  font-size:14px;
  font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
}
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:0px solid #190F0F;
background: transparent;
}
`
const Actions = styled(Button)`
width:96%;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-family:Roobert-medium;
margin-top:5px;
@media (min-width: 260px) and (max-width: 593px){
    margin-left:0px;
    width:100%;
 }
`
const CallUsWrapper = styled.div`
display:flex;
justify-content:center;
padding-right:20px;
padding-left:5px;
@media (min-width: 260px) and (max-width: 969px){
    display:inline;
    padding-left:0px;
  }
`
const CallusActions = styled(Button)`
width:250px;
height: 48px;
border-radius: 8px;
font-size: 14px;
border:1px solid #190F0F;
background:#fff;
font-family:Roobert-medium;
.imgwrap{
    alignSelf:center;
    justifyContent:center; 
}
.img{
    width:8%; 
    height:auto; 
    align-self:center;
    margin-right:5px;
}
@media (min-width: 260px) and (max-width: 969px){
   width:330px;
   margin-bottom:10px;

 }
`
const Time = styled(Form.Select)`
color:gray;
border-radius:8px;
font-family:Inter;
width:258px;
color:black;
border:none;
font-size:16px;
margin-top:-13px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`
const NoOfRoom = styled(Form.Select)`
color:gray;
border-radius:8px;
font-family:Inter;
width: 235px;
color:black;
border:none;
font-size:16px;
margin-top:-13px;
margin-left:-10px;
padding-top:13px;
&:focus {
outline: none;
box-shadow: 0px 0px 0px white;
border:none;
background: #fff;
}
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`

const CalendarStyle = styled.div`
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 32px;
margin-top:-125px;
width:300px;
position:absolute;
`
const DetailsDrop = styled.div`
border-radius:8px;
border:1px solid lightgray;
height:58px;
background:white;
background-color:white;
.substyle{
padding-left:12px;
padding-top:7px;
color:black;
font-size:12px;
font-family:Inter;
color:#787373;
}
`
const Details = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
width:240px;
padding-bottom:5px;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
  }
.focused{
color:Black;
margin-bottom:5px;
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
.cardImg{
    height:78px;
    
  
}
.cardText{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 14px;
margin-bottom:5px;
text-align: center;
color: #190F0F;
}

`

const HouseContainer = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
display:flex;
flex-direction:column;
align-self:center;
align-items:center;
width:154px;
@media (min-width: 260px) and (max-width: 969px){
    width:340px;
  }
.text{
    margin-bottom:5px;
    margin-top:5px;
    font-family:Inter;
font-style: normal;
font-weight: 400;
color: #000;
}
.cardImg{
    height:44px;
    margin-bottom:10px;
}

`

const FormSegment = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
width:170px;
padding:0px;
padding-bottom:0px;
display:flex;
flex-direction:column;
align-self:center;
.cardImg{
    width:auto;
    height:54px;
    margin-top:20px;
    margin-bottom:20px;
}
.cardText{
    font-family: Inter;
font-style: normal;
font-weight: 400;
font-size: 12px;
margin-bottom:5px;
text-align: center;
color: #190F0F;
}
@media (min-width: 260px) and (max-width: 969px){
    width:330px;
    .cardImg{
        
        margin-left:20px;
    }
    .cardText{
        text-align: start; 
    }
  }


`
const Editoption = styled.div`
padding-top:10px;
padding-left:10px;
padding-right:15px;
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
background:#fff;
color:#787373;
font-family:Inter;
font-size:12px;
padding-bottom:-10px;
@media (min-width: 260px) and (max-width: 969px){
    margin-right:-15px;
  }
`
const DetailsOptions = styled.div`
margin-right:15px;
border-radius:8px;
margin-bottom:15px;
border:1px solid lightgray;
color:#787373;
font-family:Inter;
font-size:12px;
padding-bottom:5px;
z-index:10000;
position:absolute;
background:#fff;
width:200px;
margin-top:-15px;
.subdiv{
padding-left:12px;
padding-top:6px;
}
padding-left:12px;
padding-top:15px;
.maintext{
    &:hover {
        color: #D81159;
    }
}
input[type=range] {
    -webkit-appearance: none;
    width:100%;
    padding:15px;
    margin-bottom:10px;
    }
    input[type=range]:focus {
    outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #190F0FA3;
    border-radius: 25px;
    }
    input[type=range]::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
    border:1px solid black;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
    background: #190F0FA3;
    }
    .range-wrap{
    position: relative;
    }
    .range-value{
    position: absolute;
    }
    .range-value span{
    width: 30px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #03a9f4;
    color: #fff;
    font-size: 12px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 6px;
    }
    .range-value span:before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid #03a9f4;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    margin-top: -1px;
    }

`
const Innerdiv = styled.div`
padding-left:12px;
padding-right:15px;
padding-top:6px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
width: 240px;
`
const FormInnerdiv = styled.div`
padding-top:6px;
margin-left:-7px;
margin-bottom:20px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;
.likes__relavance{
    position:relative;
    padding:0 0px;
  }
  .likes__list{
    position:absolute;
    box-sizing: border-box;
    left:20%;
    width:400px;
    z-index:999;
    background:white;
    padding-left:16px;
    padding-right:16px;
    border-radius:8px;
    box-shadow: 0 0 1px 1px #787373;
    filter: drop-shadow(0px -1px 38px rgba(0, 0, 0, 0.12));
    @media (min-width: 260px) and (max-width: 969px){
        left:0%;
        right:30%;
        width:300px;
      }
  }
  .heads{
    font-family:Inter;
    font-weight: 400;
    font-size: 14px;
    color: #787373;
    margin-top:-10px;
}
.headinglist{
color:black;
font-size:20px;
text-align:center;
margin-top:15px;
}
.heads2{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: black;
    margin-top:-10px;
}
.heads3{
    font-family: Inter;
    font-weight: 500;
    font-size: 18px;
    color: black;
    margin-top:-10px;
}
h4{
    color:#000;
}
@media (min-width: 260px) and (max-width: 820px){
    width: 350px;
}
`
const NameInnerdiv = styled.div`
padding-bottom:10px;
color:#787373;
font-family:Inter;
font-size:12px;
height:50px;

`
const Img = styled(Image)`
height:7px;

width:11px;
margin-top:18px;
margin-left:15px;
cursor:pointer;
`
const HouseImage = styled(Image)`
height:44px;
width:auto;
margin-bottom:10px;
`

const Dates = styled.div`
width:258px;
margin-right:-25px;
border-radius:8px;
border:1px solid lightgray;
padding-left:10px;
padding-top:6px;
height:58px;
font-size:12px;
color:#787373;
@media (min-width: 360px) and (max-width: 820px){
width:11rem;
}
`
const PhoneNumber = styled(PhoneInput)`
  width: 97%;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  box-shadow: 0px 0px 0px white;
  border: 1px solid #190F0F;
  background: #fff;
}
@media (min-width: 360px) and (max-width: 540px)
{
   .PhoneInputCountry{
    width: 7rem;
  }
  .PhoneInputCountryIcon{
    width: 1rem;
    height: 0.75rem;
  }
   .PhoneInputInput{
    width: 12rem;
  }
}
 .PhoneInputCountry{
     margin-top:2px;
  min-width: 30%;
  height: 60px;
  border-radius:8px;
  background: #fff;
  border: 1px solid #DDDDDD;
  justify-content: center;
}
 .PhoneInputInput{
  min-width: 68%;
  height: 60px;
  border: 1px solid #DDDDDD;
  background: #fff;
  border-radius:8px;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 9px 10px;
  font-family: 'SF Pro Display';
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.1rem;
  color: #787373;
}

.PhoneInputCountryIcon{
  width: 2rem;
  height: 1.5rem;
}

 .PhoneInputCountrySelectArrow{
  height: 0.5rem;
  width: 0.5rem;
  color: #000;
}
`
const Input = styled(Form.Control)`
height: 24px;
border: 0px solid #fff;
margin-left:-10px;
font-family:Inter;
font-style: normal;
font-weight: 400;
color: #190F0F;
font-size: 14px;
&:focus {
  outline: none;
  box-shadow: 0px 0px 0px white;
  border: 0px solid #fff;
  background: #fff;
}
`
const Footer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
position: fixed;
bottom: 0;
height:100px;
padding-left:20px;
padding-right:40px;
margin-left:-23px;
padding-top:20px;
padding-bottom:10px;
background-color:#fff;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
width:100%;
.bottonfooter{
    background-color:#000;
    border-color:#000;
    color:#fff;
    margin-right:10px;
    margin-bottom:0px;
    marginTop:0;
}
.estimatedprice{
    color:black;
    font-size:20px;
    font-family:Inter;
    font-style: normal;
    font-weight: 500;
   
    }
@media (min-width: 746px) and (max-width: 10000px){
    display:none;
}
`
const Vbutton = styled(Button)`
--gradient: linear-gradient(90deg, #D81159, #EB873F,#FFCF23);
width:44%;
height:58px;
font-family:Inter;
font-weight: 500;
font-size: 16px;
letter-spacing: 0.02em;
border:1px solid #fff;
border-radius:8px;
  background: #ddd;
  background-size: 300%;
  background-image: var(--gradient);
@keyframes bg-animation {
  0% {background-position: left}
  50% {background-position: right}
  100% {background-position: left}
}
.fun {
  color: white;
  border: 0;
  cursor: pointer;
  padding: .5em 1.25em;
  background: linear-gradient(90deg, #D81159,#FFCF23,#EB873F);
  background-size: 300%;
  background-position: left;
  transition: background-position 250ms;
}
:hover {
  background-position: center;
  border:1px solid #fff;
}
`

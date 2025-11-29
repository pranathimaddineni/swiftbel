
    /* global google */
    //eslint-disable-next-line no-undef
import { GoogleMap,useJsApiLoader ,DirectionsRenderer,InfoWindow, LoadScriptNext, MarkerF} from '@react-google-maps/api';
import { useState,useEffect } from 'react';
import Geocode from "react-geocode";
import { blackMapStyle } from './mapStyles';
import Mark from '../../../public/assets/Mark.png'
import Mark1 from '../../../public/assets/Mark1.png'
import styled from 'styled-components';
import initializeAuthentication from '@/Firebase/firebase.init';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();
const containerStyle = {
  width: '100%',
  height: '100%',
  display:'flex'
};


const TrackingMap=(props)=> {
  /* global google */

  const icon = {
    url: 'https://s3.amazonaws.com/swiftbel.com/Mark.png',
    scaledSize: { width: 20, height: 20 },
  };
  const icon2 = {
    url: 'https://s3.amazonaws.com/swiftbel.com/Mark1.png',
    scaledSize: { width: 20, height: 20 },
  };

  initializeAuthentication()
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA" ,

    // ...otherOptions
  })
  console.log(isLoaded,'isloaded')
  const [directionsResponse,setDirectionsResponse]=useState(null)
  const [distance,setDistance]=useState('')
  const [duration,setDuration]=useState('')

  const calculateRoute=async(from,to)=>{

    const directionsService=   new google.maps.DirectionsService()

    const results=await directionsService?.route({
       origin: from||{ lat: 49.2827, lng: 123.1207 },
      destination: to||{ lat: 37.9358, lng: 122.3477},
 
      travelMode: google.maps.TravelMode.DRIVING
    })
   
    /* global google */
    //eslint-disable-next-line no-undef
    setDirectionsResponse(results)
    setDistance(results?.routes[0].legs[0].distance.text)
    setDuration(results?.routes[0].legs[0].duration.text)
    console.log('hey im working')
  }

useEffect(()=>{
   /* global google */
   if(props?.fromAddres&&props?.toAddres){
    calculateRoute(props?.fromAddres,props?.toAddres)
   }
},[props?.fromAddres,props?.toAddres])


  return (
  
 <>

      {isLoaded?
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props?.fromAddres}
        zoom={10}
        defaultOptions={{
            styles: blackMapStyle
        }}
        options={{
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          fullscreenControl:false,
            styles: blackMapStyle
          

        }}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA&libraries=places"
        loadingElement={
            <div style={{ height: `100%` }} />
        }
        containerElement={
            <div style={{ height: '100%', width: '100%' }} />
        }
        mapElement={
            <div style={{ height: `100%`,width: '100%' }} />
        }
      >
       <MarkerF  icon={icon}  position={props?.fromAddres} />
     
       <MarkerF icon={icon2} position={props?.toAddres} />
       {directionsResponse&&<DirectionsRenderer options={{
           suppressMarkers:true,
         polylineOptions:{
           strokeColor: "#D81159",
           strokeOpacity: 2,
           strokeWeight: 3,
           geodesic:true,
           
         }
       }} directions={directionsResponse}/>}
        {/* {props?.fromAddres? <Info
       
              //  onClose={onInfoWindowClose}
                position={{ lat: (props?.fromAddres?.lat||0 ), lng: props?.fromAddres?.lng||0+ 0.0005 }}
               options={{
                   pixelOffset: new google.maps.Size(0,-30)
               }}
              >
                <div style={{backgroundColor:'#D81159'}}>
                  <span style={{ padding: 0,height:20,color:'#fff' }}>{"Vancover"}</span>
                </div>
              </Info>:null} */}
      </GoogleMap>
     
      :'loading....!'}   
           
           </>
           
  )
}

export default TrackingMap;


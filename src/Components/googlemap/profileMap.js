import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import marker from '../../../public/assets/mapMarker.png'
import marker1 from '../../../public/assets/mapMarker1.png'
import { mapstyle } from './mapStyles';
Geocode.setApiKey("AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA");
Geocode.enableDebug();

class ProfileMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }
    /**
      * Get the current address from the default map position and set those values in the state
      */
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);

                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                })
            },
            error => {
                console.error(error);
            }
        );
    };
    /**
      * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
      *
      * @param nextProps
      * @param nextState
      * @return {boolean}
      */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }

        if (this.props.center) {
            this.setState({
                mapPosition: {
                    lat: this.props.center.lat,
                    lng: this.props.center.lng
                }
            })
            this.setState({
                markerPosition: {
                    lat: this.props.center.lat,
                    lng: this.props.center.lng
                }
            })
        }


    }

    /**
      * Get the city and set the city input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    /**
      * Get the area and set the area input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    /**
      * Get the address and set the address input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    /**
      * And function for city,state and address input
      * @param event
      */
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    /**
      * This Event triggers when the marker window is closed
      *
      * @param event
      */
    onInfoWindowClose = (event) => {
    };
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.props.center ? this.props.center.lat : this.state.mapPosition.lat, lng: this.props.center ? this.props.center.lng : this.state.mapPosition.lng }}
                        defaultOptions={{
                            styles: mapstyle
                        }}
                        options={{
                            zoomControl:false,
                            streetViewControl:false,
                            mapTypeControl:false,
                            fullscreenControl:false,                
                  
                          }}
                    >
                        <Marker google={this.props.google}
                            name={'Dolores park'}
                        
                            icon={{
                                
                                url: this.props?.Circle?marker1:{marker},
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.props.center ? this.props.center.lat : this.state.markerPosition.lat, lng: this.props.center ? this.props.center.lng : this.state.markerPosition.lng }}
                        />
                       {this.props?.Circle? <Circle
                            defaultCenter={{ lat: this.props.center ? this.props.center.lat : this.state.markerPosition.lat, lng: this.props.center ? this.props.center.lng : this.state.markerPosition.lng }}
                            radius={4000}
                            options={{
                                strokeColor: 'transparent',
                                fillColor: '#EBA8BC'
                            }}
                        />:null}
                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div style={{ width: '100%', height: '223px' }}>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDVROE0bO7yMSpAB9ARPvZG0lrUOCWRMA&libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: '100%', width: '100%' }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }
        return (map)
    }
}
export default ProfileMap;
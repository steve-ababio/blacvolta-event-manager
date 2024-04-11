"use client"
import { GoogleMap, Libraries, useLoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';


const containerStyle = {
    width: '100%',
    height: '400px'
};
const libraries:Libraries  = ["places"]
export default function Googlemap(){
    const [position,setPosition] = useState({lat:0,lng:0});
    useEffect(function(){
        navigator.geolocation.getCurrentPosition(currentposition=>{
            setPosition({lat:currentposition.coords.latitude,lng:currentposition.coords.longitude});
        })
    },[]);
    const{isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY?.toString()!,
        libraries
    })
    if (loadError) {
        return <div>Error loading maps</div>;
    }
    
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    function handleSelectedLocation(e:google.maps.MapMouseEvent){
        setPosition({lat:e.latLng?.lat()!,lng:e.latLng?.lng()!});
    }
    return (
        <>{
            isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={10}
                center={position}
                clickableIcons
                onClick={handleSelectedLocation}
            >
            </GoogleMap>
        }   
        </>
    )
}
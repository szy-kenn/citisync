"use client";

// components/Map.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import { MarkerType } from '@/lib/utils';

const containerStyle = {
  width: '100%',
  height: '1000px',
};

const defaultCenter = {
  lat: 14.5995, // Manila Latitude
  lng: 120.9842, // Manila Longitude
};

const Map = ({ markers, selectedMarker, setSelectedMarker, showInfoWindow, setShowInfoWindow } 
  : {
    markers: MarkerType[], 
    selectedMarker: MarkerType | undefined, 
    setSelectedMarker: React.Dispatch<React.SetStateAction<MarkerType | undefined>>,
    showInfoWindow: boolean,
    setShowInfoWindow: React.Dispatch<React.SetStateAction<boolean>>,
    }) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleMarkerClick = (marker: MarkerType) => {
    setSelectedMarker(marker);
    setShowInfoWindow(true); // Show the popup when the marker is clicked
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY!} // API Key from environment variables
      onLoad={handleLoad}
    >
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={10}
        >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            icon={'/images/category-icons/pin.svg'}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {/* InfoWindow (Popup) */}
        {showInfoWindow && selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setShowInfoWindow(false)} // Close the popup when clicking the close button
          >
            <div>
              <h3>{selectedMarker.title}</h3>
              <p>Some details about {selectedMarker.title}</p>
            </div>
          </InfoWindow>
        )}

        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;

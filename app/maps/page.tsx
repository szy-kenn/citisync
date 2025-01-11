"use client";
import Map from '@/components/map'
import { MarkerType } from '@/lib/utils';
import React, { useState } from 'react'

const Page = () => {

    const [selectedMarker, setSelectedMarker] = useState<MarkerType>(); // State to store selected marker
    const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false); // State to control popup visibility

    const markers: MarkerType[] = [
      { id: 1, position: { lat: 40.7128, lng: -74.0060 }, title: 'New York City' },
      { id: 2, position: { lat: 34.0522, lng: -118.2437 }, title: 'Los Angeles' },
        ];

    return (
    <div>
        <Map markers={markers} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} showInfoWindow={showInfoWindow} setShowInfoWindow={setShowInfoWindow} />
    </div>
  )
}

export default Page
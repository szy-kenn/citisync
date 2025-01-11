"use client";
import Map from '@/components/map'
import { MarkerType } from '@/lib/utils';
import React, { useState } from 'react'

const Page = () => {

    const [selectedMarker, setSelectedMarker] = useState<MarkerType>(); // State to store selected marker
    const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false); // State to control popup visibility

    const markers: MarkerType[] = [
        { id: 1, position: { lat: 14.5995, lng: 120.9842}, title: 'Manila' },
      ];

    return (
    <div>
        <Map markers={markers} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} showInfoWindow={showInfoWindow} setShowInfoWindow={setShowInfoWindow} />
    </div>
  )
}

export default Page
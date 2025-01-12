"use client";

import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, Polygon } from '@react-google-maps/api';
import { MarkerType } from '@/lib/utils';
import PostCard from '@/app/feed/components/card';
import { getAllPosts } from '@/lib/firebase/posts';
import { Post } from '@/lib/types';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 14.5995, // Manila Latitude
  lng: 120.9842, // Manila Longitude
};

const Map = ({ markers }: { markers: MarkerType[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType>(); 
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleMarkerClick = async (marker: MarkerType) => {
    setSelectedMarker(marker);
    setShowInfoWindow(true);
    try {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  // Filter out invalid markers
  const validMarkers = React.useMemo(() => 
    markers.filter(marker => 
      marker?.position && 
      typeof marker.position.lat === 'number' && 
      typeof marker.position.lng === 'number'
    ),
    [markers]
  );

  // Generate map key only from valid markers
  const mapKey = React.useMemo(() => 
    validMarkers
      .map(m => `${m.id}-${m.position.lat}-${m.position.lng}`)
      .join('-'),
    [validMarkers]
  );

  // If no valid markers, use default center
  const mapCenter = React.useMemo(() => {
    if (validMarkers.length === 0) return defaultCenter;
    
    // Calculate center from valid markers
    const lats = validMarkers.map(m => m.position.lat);
    const lngs = validMarkers.map(m => m.position.lng);
    
    return {
      lat: (Math.min(...lats) + Math.max(...lats)) / 2,
      lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
    };
  }, [validMarkers]);

  if (!markers || markers.length === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-100">
        No locations to display
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY!}
      onLoad={handleLoad}
    >
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
          key={mapKey}
        >
          {validMarkers.map((marker) => (
            marker?.position && (
              <Marker
                key={`marker-${marker.id}`}
                position={marker.position}
                title={marker.title}
                icon={'/images/category-icons/pin.svg'}
                onClick={() => handleMarkerClick(marker)}
              />
            )
          ))}

          {showInfoWindow && selectedMarker?.position && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className='flex gap-3 flex-col w-80'>
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <PostCard 
                      key={`post-${post.id}-${selectedMarker.id}`}
                      post={post}
                      isShortened={true}
                    />
                  ))
                ) : (
                  <div>No posts available</div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default Map;
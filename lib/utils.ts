import { clsx, type ClassValue } from "clsx"
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type MarkerType = {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

export function formatTimestamp(timestamp: any): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export async function findPlaces(textQuery: string) {
  const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  const request = {
      textQuery,
      fields: ['displayName', 'location'],
      includedType: 'restaurant',
      locationBias: { lat: 14.5995, lng: 120.9842 },
      isOpenNow: true,
      language: 'en-US',
      maxResultCount: 8,
      minRating: 3.2,
      region: 'ph',
      useStrictTypeFiltering: false,
  };

  //@ts-ignore
  const { places } = await Place.searchByText(request);

    return places;
  // if (places.length) {
      // console.log(places);

      // const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
      // const bounds = new LatLng/Bounds();

      // return places;
      // // Loop through and get all the results.
      // places.forEach((place) => {
      //     const markerView = new AdvancedMarkerElement({
      //         map,
      //         position: place.location,
      //         title: place.displayName,
      //     });

      //     bounds.extend(place.location as google.maps.LatLng);
      //     console.log(place);
      // });

      // map.fitBounds(bounds);

  // } else {
      // console.log('No results');
  // }
}
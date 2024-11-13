"use-client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

/**
 * Component for displaying the user's location on the map with a pulsating effect.
 *
 * @param {Object} position - The latitude and longitude of the user's location.
 */
const UserLocationMarker = ({ position }) => (
  <Marker
    position={position}
    icon={{
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    }}
  />
);

/**
 * Component for displaying an event marker on the map.
 *
 * @param {Object} event - The event data.
 * @param {Object} icon - The custom icon for the marker.
 * @param {Function} onClick - Click handler for the marker.
 */
const EventMarker = ({ event, icon, onClick }) => (
  <Marker
    position={{
      lat: event.location.coordinates.latitude,
      lng: event.location.coordinates.longitude,
    }}
    icon={icon}
    title={event.name}
    onClick={() => onClick(event)}
  />
);

/**
 * Component for displaying the information window when an event marker is clicked.
 *
 * @param {Object} event - The selected event data.
 * @param {Function} onCloseClick - Handler for closing the info window.
 */

/**
 * Helper function to safely retrieve latitude and longitude from a location object.
 *
 * @param {Object} location - The location object from Google Maps.
 * @returns {Object} An object containing the latitude and longitude.
 */
const getLatLng = (location) => {
  if (
    typeof location.lat === "function" &&
    typeof location.lng === "function"
  ) {
    return { lat: location.lat(), lng: location.lng() };
  } else {
    return { lat: location.lat, lng: location.lng };
  }
};

/**
 * Main component for rendering the Google Map with event markers and animations.
 *
 * @param {Array} events - List of event data to display on the map.
 * @param {Object} userLocation - The user's current location.
 * @param {Object} mapContainerStyle - Styles for the map container.
 */
const MapComponent = ({ events, userLocation, setSelectedEvent, mapContainerStyle }) => {
  const [customIcon, setCustomIcon] = useState(null);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBsJN5M5kABg-9OrbVW1-rG6yoCk648cZs",
  });

  // Effect to set up the custom icon after the Google Maps API is loaded.
  useEffect(() => {
    if (isLoaded && window.google) {
      setCustomIcon({
        url: "/images/mapIcons/narutoMapIcon.png", // Path to your custom marker image
        scaledSize: new window.google.maps.Size(70, 70), // Adjust the size as needed
      });
    }
  }, [isLoaded]);

  // Handle loading errors
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || !customIcon)
    return <div className="text-6xl text-galactic-secondary">Loading...</div>;

  // Default center of the map (user location or initial center)
  const defaultCenter = userLocation || { lat: 40.7128, lng: -74.006 }; // New York City

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={defaultCenter}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      onIdle={() => {
        if (!mapReady) {
          setMapReady(true);
        }
      }}
      onClick={() => setSelectedEvent(null)} // Close the event when clicking on the map
    >
      {/* User Location Marker */}
      {userLocation && <UserLocationMarker position={userLocation} />}

      {/* Event Markers */}
      {events.map((event) => (
        <EventMarker
          key={event._id}
          event={event}
          icon={customIcon}
          onClick={setSelectedEvent}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;

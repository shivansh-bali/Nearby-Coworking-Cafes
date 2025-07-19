import { Marker } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useCallback, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { saveLocation } from "../../../redux_toolkit/reducer/registrationReducer";
import { useSelector } from "react-redux";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";

const GeocoderModal = (props: any) => {
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
  }, [profileState.mapFuncState]);
  const [coords, setCoords] = useState({
    lat: saveLocation.lat,
    lng: saveLocation.lng,
  });
  const onMarkerDragStart = useCallback((event: any) => {
    console.log(event, "dragstart");
  }, []);

  const onMarkerDrag = useCallback((event: any) => {
    console.log(event, "dragmedium");
  }, []);

  const onMarkerDragEnd = useCallback(
    async (event: any) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat.lng},${event.lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
        );

        const features = response.data.features;
        if (features.length > 0) {
          const placeName = features[0].place_name;
          props.updateLatLng([event.lngLat.lat, event.lngLat.lng], placeName);
          setCoords(() => {
            return { lat: event.lngLat.lat, lng: event.lngLat.lng };
          });
        } else {
          console.log("No matching results found.");
        }
      } catch (error) {
        console.log("Error retrieving geocoding data:", error);
      }
    },
    [props]
  );
  return (
    <Marker
      latitude={coords.lat}
      longitude={coords.lng}
      offset={[20, -30]}
      draggable
      onDragStart={onMarkerDragStart}
      onDrag={onMarkerDrag}
      onDragEnd={onMarkerDragEnd}
    />
  );
};

export default GeocoderModal;

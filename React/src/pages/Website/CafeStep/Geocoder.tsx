import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import { useState } from "react";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";

const Geocoder = (props: any) => {
  const [latLng, setLatLng] = useState({
    lat: 42.360253,
    lng: -71.058291,
  });
  const ctrl = new MapBoxGeocoder({
    accessToken: accessToken,
    marker: true,
    collapsed: true,
    mapboxgl: mapboxgl,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    props.updateLatLng(coords);
    setLatLng({
      lat: coords[0],
      lng: coords[1],
    });
    props.fillFields("step9", "latitude", coords[1]);
    props.fillFields("step9", "longitude", coords[0]);
    const place = e?.result?.place_name?.split(",");
    props.fillFields("step10", "state", place[place.length - 2]);
    props.fillFields("step10", "city", place[place.length - 3]);
    if (place.length > 3) {
      const street = place.slice(0, place.length - 3);
      let nameString: string = street
        .map((e: any) => {
          return e;
        })
        .join(",");
      props.fillFields("step10", "streetAddress", nameString);
    }
  });
  return (
    <Marker latitude={+latLng.lat} longitude={+latLng.lng} offset={[20, -30]} />
  );
};

export default Geocoder;

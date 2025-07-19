import React, { useCallback, useEffect, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { localLocation, saveLocation } from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch, useSelector } from "react-redux";
import cx from "./Listitem.module.scss";
import {
  changeMapState,
  sliderMiles,
} from "../../../redux_toolkit/globalReducer/mapReducer";
import { NavLink } from "react-router-dom";
import ListItem from "./ListItem";
import {
  changePinState,
  myData,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { Login } from "../../../components/Website/Modals";
import PinnedMap from "../../../components/Website/Modals/PinnedMap";
import Signup from "../../../components/Website/Modals/Signup";
import { CafePin, Location2, BarPin, RestroPin, CoworkingPin, mapIcon } from "../../../assets/svgs";

const MapContainer = (props: any) => {
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState<any>({
    latitude: localLocation.lat,
    longitude: localLocation.lng,
    zoom: sliderMiles > 5 ? 10 : 12,
  });
  const profileState = useSelector((state: any) => state.profileReducer);
  const mapState = useSelector((state: any) => state.mapReducer);
  const [radius, setRadius] = useState<number>(sliderMiles);
  const onMove = useCallback(({ viewState }: any) => {
    const newCenter = [viewState.latitude, viewState.longitude];
    setViewport(newCenter);
  }, []);
  const geojson: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [localLocation.lng, localLocation.lat],
        },
      },
    ],
  };

  const metersToPixelsAtMaxZoom = (meters: any, latitude: any) => {
    return meters / 0.075 / Math.cos((latitude * Math.PI) / 180);
  };
  const layerStyle: any = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": {
        stops: [
          [5, 1],
          [20, metersToPixelsAtMaxZoom(radius * 1608, localLocation.lat)],
        ],
        base: 2,
      },
      "circle-color": "#3C3C3C",
      "circle-opacity": 0.1,
    },
  };
  useEffect(() => {
    if (mapState.mapState) {
      setRadius(sliderMiles);
      setViewport({
        latitude: localLocation.lat,
        longitude: localLocation.lng,
      });
    }
    if (mapState.mapState > 0) {
      setViewport({
        latitude: localLocation.lat,
        longitude: localLocation.lng,
        zoom: sliderMiles > 5 ? 10 : 12,
      });
      dispatch(changeMapState());
    }
  }, [dispatch, mapState.mapState]);

  useEffect(() => {
    setViewport({
      latitude: localLocation.lat,
      longitude: localLocation.lng,
    });
  }, []);
  function mapFunc(mk1: any, mk2: any) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1?.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2?.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2?.lng - mk1?.lng) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    let totalDistance = Math.round(d * 1608);
    return totalDistance;
  }
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: localLocation.lat,
    lng: localLocation.lng,
  });
  const [cafeItem, setCafeItem] = useState<any>({});
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  // const handleSignupShow = () => setSignupShow(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
    setPopupMessage("");
  };
  const handlelookOpen = () => setLookshow(true);
  useEffect(() => {
    if (popupMessage) handlelookOpen();
  }, [popupMessage]);
  useEffect(() => {
    setDistancePoint({
      lat: localLocation.lat,
      lng: localLocation.lng,
    });
  }, [mapState.mapState]);
  useEffect(() => {
    if (profileState.pinCafeState > 0) {
      dispatch(myData());
      dispatch(changePinState());
    }
  }, [dispatch, profileState.pinCafeState]);
  useEffect(() => {
    setCafeItem({});
  }, [props.number]);
  const categoryToImage: any = {
    "Coffee Shop": CafePin,
    "Cafe": CafePin,
    "Bar": BarPin,
    "Restaurant": RestroPin,
    "Other": CoworkingPin
  };
  return (
    <>
      <Map
        {...viewport}
        onMove={onMove}
        mapboxAccessToken={props.mapToken}
        mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
        minZoom={2}
        maxZoom={30}
        onClick={() =>setCafeItem({})}
      >
       {saveLocation?.lat !== 42.360253 && saveLocation?.lng !== -71.058291 && <Marker longitude={saveLocation?.lng} latitude={saveLocation?.lat}>
               <img src={mapIcon} alt="mapIcon"/>
              </Marker>}
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
          {props.cafe?.map((item: any, index: number) => {
            const distance = mapFunc(distancePoint, {
              lat: +item?.latitude,
              lng: +item?.longitude,
            });
            const checkPinCafe = profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === item?._id
            )
            return distance < radius * 1608 ? (
              <>
                <Marker longitude={item?.longitude} latitude={item?.latitude}>
                  <div className={`${cx.coffeShop}`} onClick={(e:any)=>e.stopPropagation()} style={{ background:'none', boxShadow:'none' }}>
                    <div className={`${cx.coffeShopImg}`}>
                      <NavLink
                        to="#"
                        onClick={(e: any) => setCafeItem(item)}
                      >
                        <img
                          src={checkPinCafe ? Location2 : categoryToImage[item?.category]}
                          className={`${cx.image}`}
                          alt="coffeeShop"
                        />
                      </NavLink>
                      <div className={` `}>
                        {/* {!profile?.data?.pinnedCafe?.some(
                        (e: any) => e?._id === item?._id
                      ) && (
                        <NavLink to="#" className={`${cx.viewBtn}`} onClick={()=>{
                          if (!profile?.data?.role) {
                            setLoginShow(true);
                          } else {
                            setClickPin(true);
                            dispatch(pinCafe(item?._id));
                            if (!sessionCounter) {
                              setPopupMessage(`You just pinned a place to your map!`);
                              sessionStorage.setItem("counter", JSON.stringify("1"));
                            }
                          }
                        }}>
                          <img src={Location} alt="activeLocation" />
                        </NavLink>
                      )} */}
                        {/* {profile?.data?.pinnedCafe?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <NavLink
                            to="#"
                            onClick={() => setCafeItem(item)}
                            // onClick={() => {
                            //   if (profile?.data?.role) {
                            //     setClickPin(true);
                            //     dispatch(pinCafe(item?._id));
                            //   } else {
                            //     setLoginShow(true);
                            //   }
                            // }}
                            className={`${cx.viewBtn} ${cx.active}`}
                            style={{ color: "orange" }}
                          >
                            <img src={location2} alt="deactiveLocation" />
                          </NavLink>
                        )} */}
                      </div>
                    </div>

                    {/* <div className={cx.hideBackground}>
                    <ListItem data={item} />
                  </div> */}
                  </div>
                  {/* <img src={favicon} className={`${cx.image}`} alt="coffeeShop" /> */}
                </Marker>
              </>
            ) : (
              ""
            );
          })}
        </Source>
      </Map>

      {Object.keys(cafeItem).length > 0 && (
        <div className={`${cx.listContainer}`}>
          <ListItem data={cafeItem} />
        </div>
      )}
      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
      <Signup
        showSignup={showSignup}
        handleSignupClose={handleSignupClose}
        handleLoginShow={handleLoginShow}
      />
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={popupMessage}
      />
    </>
  );
};

export default MapContainer;

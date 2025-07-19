import { Col, Row } from "react-bootstrap";
import cx from "./MapView.module.scss";
import { GridView, MapView2 } from "../../../assets/images/index";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CoffeeShop, SearchFilter } from "../../../components/Website";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MapContainer from "./MapContainer";
import { useDispatch, useSelector } from "react-redux";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import {
  localLocation
} from "../../../redux_toolkit/reducer/registrationReducer";
import {
  filterArray,
  sliderMiles,
} from "../../../redux_toolkit/globalReducer/mapReducer";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";
import { IconContext } from "react-icons/lib";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { getLocationTimezoneOffset } from '../../../utility';

const CafeListing = () => {
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const mapState = useSelector((state: any) => state.mapReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  const [mapToken, setMapToken] = useState("");
  const [showListMap, setShowListMap] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(allCafe());
    // dispatch(mapKeyFunc());
  }, [dispatch]);
  useEffect(() => {
    setMapToken(accessToken);
  }, [profileState.mapFuncState]);
  const [cafe, setCafe] = useState<any[]>([]);
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: localLocation.lat,
    lng: localLocation.lng,
    placeName: localLocation.placeName,
  });
  useEffect(() => {
    setDistancePoint({
      lat: localLocation.lat,
      lng: localLocation.lng,
      placeName: localLocation.placeName,
    });
  }, [mapState.mapState]);
  useEffect(() => {
    let cafeData: any[] = [];
    cafeList.forEach((item: any) => {
      if (item?.isAccepted === "Approved" && item?.status === true) {
        if (filterArray.length > 0) {
          let matchedNumber = 0;
          let targetFilter = 0;
          filterArray.forEach((e: any) => {
            if (e.status === true) {
              targetFilter += 1;
            }
            let changeStatus = false;
            for (let element of item?.facilities) {
              if (e.title === element && e.status === true) {
                matchedNumber += 1;
                changeStatus = true;
                break;
              }
            }
              if (
                e.title === "Fast WiFi" &&
                e.status === true &&
                item?.wifiRating > 3 &&
                changeStatus === false
              ) {
                matchedNumber += 1;
              }
              if (
                e.title === "Open Now" &&
                e.status === true &&
                changeStatus === false
                ) {
                  const publishDay: any = new Date().toLocaleDateString("en-us", {
                    weekday: "short"
                  });
                  const timezoneOffset = getLocationTimezoneOffset(item?.latitude, item?.longitude)
                  const currentTime = (new Date().getHours() + timezoneOffset) % 24
                  if(item?.openHours?.[publishDay]){
                    const startTime = item?.openHours[publishDay]?.startTime.split(":")
                    const endTime = item?.openHours[publishDay]?.endTime.split(":")
                    if(startTime?.length>0 && endTime?.length>0){
                      if(+currentTime >= +startTime[0] && +currentTime <= +endTime[0]){
                      matchedNumber += 1;
                    }
                  }}
              }
          });
          if (matchedNumber === targetFilter) {
            cafeData.push(item);
          }
        } else {
          cafeData.push(item);
        }
      }
    });
    let cafeDatas: any[] = []
    cafeData?.forEach((item: any) => {
      const distance = mapFunc(distancePoint, {
        lat: +item?.latitude,
        lng: +item?.longitude,
      });
      if (distance < sliderMiles * 1.6 * 1000) {
        cafeDatas.push(item)
      }
    })
    setCafe(cafeDatas);
  }, [cafeState.allCafeState, distancePoint, mapState.filterState]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const endOffset = itemOffset + 20;
  const currentItems = cafe?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cafe?.length / 20);

  useEffect(() => {
    const newOffset = (0 * 20) % cafe?.length;
    setItemOffset(newOffset);
    setCurrentPage(0);
  }, [cafe?.length]);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * 20) % cafe?.length;
    setItemOffset(newOffset);
  };
  const mileWay = {
    lat: localLocation.lat,
    lng: localLocation.lng,
    placeName: localLocation.placeName,
  };
  function mapFunc(mk1: any, mk2: any) {
    let R = 3958.8; // Radius of the Earth in miles
    let rlat1 = mk1?.lat * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2?.lat * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2?.lng - mk1?.lng) * (Math.PI / 180); // Radian difference (longitudes)
    let d =
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
  const [number, setNumber] = useState(0);
  function handleClickOutside() {
    setNumber(number+1)
  }
  return (
    <>
      <SearchFilter handleClickOutside={handleClickOutside}/>
      <div className={`${cx.mapViewSection}`}>
        <div
          className={`${cx.leftContainer}`}
          style={showListMap === true ? { display: "none" } : {}}
          onClick={handleClickOutside}
        >
          <div className={cx.searchResult}>
            <p>Search results based on: </p>
            <h4>{distancePoint?.placeName}</h4>
            <hr />
          </div>
          <div className={`${cx.listContainer} ${cx.showingDesktop}`}>
            <Row>
              {currentItems && currentItems?.map((item: any, index: number) => {
                const inMiles = mapFunc(mileWay, {
                  lat: +item?.latitude,
                  lng: +item?.longitude,
                });
                return (
                    <Col md={6} lg={6} xl={6} xxl={6} key={`${index}`}>
                      <CoffeeShop
                        status="inactive"
                        data={item}
                        distance={inMiles}
                      />
                    </Col>
                );
              })}
                <ReactPaginate
                      className={`pagination ${cx.paginationReview}`}
                      breakLabel="..."
                      nextLabel={
                        <IconContext.Provider
                          value={{ color: "#B8C1CC", size: "36px" }}
                        >
                          <AiFillRightCircle />
                        </IconContext.Provider>
                      }
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={2}
                      pageCount={pageCount}
                      forcePage={currentPage}
                      previousLabel={
                        <IconContext.Provider
                          value={{ color: "#B8C1CC", size: "36px" }}
                        >
                          <AiFillLeftCircle />
                        </IconContext.Provider>
                      }
                      renderOnZeroPageCount={null}
                      disabledClassName="disabled"
                      initialPage={0}
                      breakClassName="break-me"
                      marginPagesDisplayed={1}
                      // subContainerClassName="pages pagination"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      activeClassName="active"
                    />
            </Row>
          </div>

          
        </div>
      
        <div
          className={cx.mapBody}
          style={showListMap === true ? { padding: "0px" } : {}}
        >
          <div className={cx.mapBox}>
            {!showListMap && (
              <button
                className={cx.listShowBtn}
                onClick={() => setShowListMap(!showListMap)}
              >
                <FaAngleLeft /> <span>Hide list</span>
              </button>
            )}
            {showListMap && (
              <button
                className={cx.listShowBtn}
                onClick={() => setShowListMap(!showListMap)}
              >
                <FaAngleRight />
              </button>
            )}
            {showListMap && accessToken && (
              <MapContainer cafe={cafe} mapToken={mapToken} number={number}/>
            )}
            {!showListMap && accessToken && (
              <MapContainer cafe={cafe} mapToken={mapToken} number={number}/>
            )}
          </div>
        </div>
      </div>

      <div className={`${cx.buttonSize}`}>
        <div className={`${cx.twoButton}`}>
          <NavLink to="/map-view" className={`${cx.viewBtn}`}>
            <img src={MapView2} alt="mapView" />
            Map view
          </NavLink>
          <NavLink to="/cafe-listing" className={`${cx.viewBtn}`}>
            <img src={GridView} alt="gridView" />
            Grid view
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CafeListing;

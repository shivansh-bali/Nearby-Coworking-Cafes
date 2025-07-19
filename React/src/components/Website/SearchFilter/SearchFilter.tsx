import React, { useEffect, useState } from "react";
import cx from "./SearchFilter.module.scss";
import OwlCarousel from "react-owl-carousel";
import {
  dropDownIcon,
  searchIconDark,
  NOutside,
  NSnack,
  NBigTables,
  NPrivateRoom,
} from "../../../assets/images";
import {
  WiFi,
  NaturalLight,
  Outlets,
  QuietVibes,
  LargeGroup,
  SofaSeating,
  HighChairs,
  Handicap,
  Alcohol,
  SomethingToEat,
  OpenNow
} from "../../../assets/svgs";
import { ChooseAddress, PickupAddressM, SetDistanceM } from "../Modals";
import {
  filterArray,
  increaseMapState,
  setSearchFilter,
  sliderMiles,
} from "../../../redux_toolkit/globalReducer/mapReducer";
import {
  changeSearchState,
  myData,
  profile,
  searchLocate,
} from "../../../redux_toolkit/reducer/profileReducer";
import {
  increaseLocalLocation,
  localLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch, useSelector } from "react-redux";

const SearchFilter = (props: any) => {
  const dispatch = useDispatch();
  const mapState = useSelector((state: any) => state.mapReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  const options = {
    loop: false,
    dots: false,
    nav: true,
    autoplay: false,
    autoWidth: true,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [distanceShow, setdistanceShow] = useState(false);
  const handledistanceShowClose = () => setdistanceShow(false);
  const handledistanceShowShow = () => setdistanceShow(true);

  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);

  const [placeValue, setPlaceValue] = useState(localLocation?.placeName);
  useEffect(() => {
    if (mapState.mapState > 0) {
      setPlaceValue(localLocation?.placeName);
    }
  }, [mapState.mapState]);
  function placeName(place: any) {
    setPlaceValue(place);
  }
  const [filterOptions, setFilterOptions] = useState([
    // {
    //   title: "Stars",
    //   name: "Stars",
    //   image: Stars,
    //   status: false,
    // },
    // {
    //   title: "Price Range",
    //   name: "Price Range",
    //   image: PriceRange,
    //   status: false,
    // },
    // {
    //   title: "Open Now",
    //   name: "Open Now",
    //   image: OpenNow,
    //   status: false,
    // },
    {
      title: "Open Now",
      name: "Open Now",
      image: OpenNow,
      status: false,
    },
    {
      title: "WiFi",
      name: "WiFi",
      image: WiFi,
      status: false,
    },
    // {
    //   title: "Fast WiFi",
    //   name: "Fast WiFi",
    //   image: FastWifi,
    //   status: false,
    // },
    {
      title: "Natural Light",
      name: "Natural Light",
      image: NaturalLight,
      status: false,
    },

    {
      title: "Charging Outlets",
      name: "Outlets",
      image: Outlets,
      status: false,
    },

    {
      title: "Quiet Environment",
      name: "Quiet Vibes",
      image: QuietVibes,
      status: false,
    },
    {
      title: "Outdoor Seating",
      name: "Outside",
      image: NOutside,
      status: false,
    },
    {
      title: "Large Groups",
      name: "Large Groups",
      image: LargeGroup,
      status: false,
    },
    // {
    //   title: "Students",
    //   name: "Students",
    //   image: Students,
    //   status: false,
    // },
    {
      title: "Alcohol",
      name: "Alcohol",
      image: Alcohol,
      status: false,
    },
    {
      title: "Snacks",
      name: "Snacks",
      image: NSnack,
      status: false,
    },
    {
      title: "Meals",
      name: "Meals",
      image: SomethingToEat,
      status: false,
    },

    // {
    //   title: "Table Layout",
    //   title: "Table Layout",
    //   image: TableLayout,
    //   status: false,
    // },
    {
      title: "Big Tables",
      name: "Big Tables",
      image: NBigTables,
      status: false,
    },
    {
      title: "Sofa Seating",
      name: "Sofa",
      image: SofaSeating,
      status: false,
    },
    {
      title: "High Tops",
      name: "High Chairs",
      image: HighChairs,
      status: false,
    },
    // {
    //   title: "Bar Seating",
    //   name: "Bar Seating",
    //   image: Barseating,
    //   status: false,
    // },

    // {
    //   title: "Small Groups",
    //   name: "Small Groups",
    //   image: place14,
    //   status: false,
    // },
    {
      title: "Private Room",
      name: "Private Room",
      image: NPrivateRoom,
      status: false,
    },
    // {
    //   title: "Free Parking",
    //   name: "Free Parking",
    //   image: place16,
    //   status: false,
    // },
    {
      title: "Accessibility",
      name: "Accessibility",
      image: Handicap,
      status: false,
    },
  ]);
  useEffect(() => {
    if (mapState.filterState > 0) setFilterOptions([...filterArray]);
  }, [mapState.filterState]);
  useEffect(() => {
    if (profileState.searchState > 0) {
      dispatch(myData());
      dispatch(changeSearchState());
    }
  }, [dispatch, profileState.searchState]);
  return (
    <>
      <div className={`${cx.fixSpace}`}></div>
      <div className={`${cx.searchSection}`} onClick={props.handleClickOutside}>
        <div>
          <div className={`${cx.searchBar}`}>
            <div className={`${cx.textField}`}>
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={placeValue}
                onClick={() => {
                  if (
                    profile?.data?.role &&
                    profile?.data?.searchLocation?.length > 0
                  ) {
                    handleShow();
                  } else {
                    handlelocationShow();
                  }
                }}
              />
              <button
                onClick={() => {
                  if (
                    profile?.data?.role &&
                    profile?.data?.searchLocation?.length > 0
                  ) {
                    handleShow();
                  } else {
                    handlelocationShow();
                  }
                }}
                className={`${cx.arrowBtn}`}
              >
                <img src={dropDownIcon} alt="dropdownIcon" />
              </button>
            </div>

            <div className={`${cx.textField} ${cx.distanceBox} ${cx.darkFont}`}>
              <label>Distance</label>
              <input
                type="text"
                className="form-control"
                placeholder="Set distance"
                value={
                  sliderMiles + `${sliderMiles === 1 ? " Mile" : " Miles"}`
                }
                onClick={() => {
                  handledistanceShowShow();
                }}
              />
            </div>

            <div className={`${cx.textField2}`}>
              <button
                className={`btn ${cx.submitBtn}`}
                onClick={() => {
                  dispatch(increaseLocalLocation());
                  dispatch(increaseMapState());
                  if (profile?.data?.role) {
                    dispatch(searchLocate({ searchLocation: localLocation }));
                  }
                }}
              >
                <img src={searchIconDark} alt="searchIconDark" />{" "}
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className={`${cx.carouselVisibility}`}>
            {/* <div className={`${cx.visibility}`}>
              <label>Visibility</label>
              <ul>
                <li>
                  <button>All</button>
                </li>
                <li>
                  <button>My friends</button>
                </li>
              </ul>
            </div> */}
            <div className={`${cx.owlCtsCarsol}`}>
            <h4 className="mb-3">All Filters</h4>
              <OwlCarousel key="carousel" className={`owl-theme`} {...options}>
                {filterOptions.map((item: any, index: number) => {
                  return (
                    <div className="item" key={`${index}`}>
                      <button
                        className={
                          item.status === true
                            ? `${cx.iconList} ${cx.active}`
                            : `${cx.iconList}`
                        }
                        onClick={() => {
                          filterOptions[index].status =
                            !filterOptions[index].status;
                          dispatch(setSearchFilter(filterOptions));
                        }}
                      >
                        <img src={item.image} alt={item.name} />
                        <h6>{item.name}</h6>
                      </button>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>


            <ul className={`${cx.mobileFilter}`}>
            {filterOptions.map((item: any, index: number) => {
                  return (
                    <li className="item" key={`${index}`}>
                      <button
                        className={
                          item.status === true
                            ? `${cx.iconList} ${cx.active}`
                            : `${cx.iconList}`
                        }
                        onClick={() => {
                          filterOptions[index].status =
                            !filterOptions[index].status;
                          dispatch(setSearchFilter(filterOptions));
                        }}
                      >
                        <img src={item.image} alt={item.name} />
                        <h6>{item.name}</h6>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <ChooseAddress
        show={show}
        handleClose={handleClose}
        placeName={placeName}
      />

      <SetDistanceM
        distanceShow={distanceShow}
        handledistanceShowClose={handledistanceShowClose}
      />
      <PickupAddressM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
        placeName={placeName}
      />
    </>
  );
};

export default SearchFilter;

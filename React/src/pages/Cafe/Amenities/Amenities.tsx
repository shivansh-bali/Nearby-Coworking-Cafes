import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import cx from "../../../pages/Cafe/Dashboard/Dashboard.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import {
  BigTables,
  place15,
  place18,
  place19,
  place20,
  place21,
  place22,
  place23,
} from "../../../assets/images";
import am from "./Amenities.module.scss";
import { useOutletContext, useParams } from "react-router-dom";
import SuccessPopup from "../../../components/Cafe/Modals/SuccessPopup";
import { updateCafe } from "../../../redux_toolkit/reducer/cafeReducer";
import { useDispatch } from "react-redux";
import {
  Alcohol,
  Handicap,
  HighChairs,
  LargeGroup,
  NaturalLight,
  Outdoor,
  Outlets,
  QuietVibes,
  SofaSeating,
  SomethingToEat,
  WiFi,
} from "../../../assets/svgs";

const amenities = [
  // {
  //   name: "Stars",
  //   image: Stars,
  // },
  // {
  //   name: "Price Range",
  //   image: PriceRange,
  // },
  // {
  //   name: "Open Now",
  //   image: OpenNow,
  // },

  {
    name: "WiFi",
    image: WiFi,
  },
  // {
  //   name: "Fast WiFi",
  //   image: FastWifi,
  // },
  {
    name: "Natural Light",
    image: NaturalLight,
  },

  {
    name: "Charging Outlets",
    image: Outlets,
  },

  {
    name: "Quiet Environment",
    image: QuietVibes,
  },
  {
    name: "Outdoor Seating",
    image: Outdoor,
  },
  {
    name: "Large Groups",
    image: LargeGroup,
  },
  // {
  //   name: "Students",
  //   image: Students,
  // },
  {
    name: "Alcohol",
    image: Alcohol,
  },
  {
    name: "Snacks",
    image: place18,
  },
  {
    name: "Meals",
    image: SomethingToEat,
  },

  // {
  //   name: "Table Layout",
  //   image: TableLayout,
  // },
  {
    name: "Big Tables",
    image: BigTables,
  },
  {
    name: "Sofa Seating",
    image: SofaSeating,
  },
  {
    name: "High Tops",
    image: HighChairs,
  },
  // {
  //   name: "Bar Seating",
  //   image: Barseating,
  // },

  // {
  //   name: "Small Groups",
  //   image: place14,
  // },
  {
    name: "Private Room",
    image: place15,
  },
  // {
  //   name: "Free Parking",
  //   image: place16,
  // },
  {
    name: "Accessibility",
    image: Handicap,
  },
];

// const amenities = [
//   {
//     name: "WiFi",
//     image: place5,
//   },
//   {
//     name: "Quiet Environment",
//     image: place6,
//   },
//   {
//     name: "Charging Outlets",
//     image: place7,
//   },
//   {
//     name: "Natural Light",
//     image: place8,
//   },
//   {
//     name: "Big Tables",
//     image: place9,
//   },
//   {
//     name: "Outdoor Seating",
//     image: place10,
//   },
//   {
//     name: "Sofa Seating",
//     image: place11,
//   },
//   {
//     name: "High Tops",
//     image: place12,
//   },
//   {
//     name: "Large Groups",
//     image: place13,
//   },
//   {
//     name: "Small Groups",
//     image: place14,
//   },
//   {
//     name: "Private Room",
//     image: place15,
//   },
//   {
//     name: "Free Parking",
//     image: place16,
//   },
//   {
//     name: "Accessibility",
//     image: place17,
//   },
//   {
//     name: "Snacks",
//     image: place18,
//   },
// ];
const standoutAmenities = [
  {
    name: "Book Shop",
    image: place19,
  },
  {
    name: "Printer Available",
    image: place20,
  },
  {
    name: "Fast WiFi",
    image: place21,
  },
  {
    name: "Child Seats",
    image: place22,
  },
  {
    name: "Meals",
    image: place23,
  },
];

const SelectedItem = (props: any) => {
  const buttonStyle = [
    { background: "var(--Main)", color: "var(--Color)" },
    { background: "var(--Main5)", color: "var(--Color5)" },
    { background: "var(--Main2)", color: "var(--Color2)" },
    { background: "var(--Main3)", color: "var(--Color3)" },
    { background: "var(--Main4)", color: "var(--Color4)" },
  ];
  let rendomNumber = () => {
    if (props.index >= 5) {
      return props.index % 5;
    } else {
      return props.index;
    }
  };

  return (
    <div
      key={props.index}
      className={`d-flex my-2 ${am.selectedButton} `}
      style={buttonStyle[rendomNumber()]}
    >
      <p style={{ maxWidth: "max-content" }}>{props.item}</p>
      <button
        className={``}
        onClick={() => {
          props.removeItem({
            index: props.index,
            type: props.type,
            item: { name: props.item },
          });
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};
const StandoutItems = (props: any) => {
  return (
    <>
      <Col>
        <h6>Do you have standout amenities?</h6>

        <Col md={11} className={`d-flex flex-wrap gap-4`}>
          {props.standoutAmenitiesData.map((item: any, index: number) => {
            return (
              <Col
                md={3}
                sm={4}
                xs={5}
                key={index}
                className={
                  item.status ? `${am.listItem} ${am.active}` : am.listItem
                }
                onClick={() => {
                  props.setData({ index, type: "2", item });
                }}
              >
                <img src={item.image} alt="" height="16px" />
                <p style={{ margin: "15px 0 0 " }}>{item.name}</p>
              </Col>
            );
          })}
        </Col>
      </Col>
    </>
  );
};
const AmenitiesItems = (props: any) => {
  return (
    <Col>
      <h6>Top Amenities</h6>
      <Col md={11} sm={12} className={`d-flex flex-wrap gap-4`}>
        {props.amenitiesData?.map((item: any, index: number) => {
          return (
            <Col
              md={3}
              sm={4}
              xs={5}
              key={index}
              className={
                item.status ? `${am.listItem} ${am.active}` : am.listItem
              }
              onClick={() => {
                props.setData({ index, type: "1", item });
              }}
            >
              <img src={item.image} alt="" height="16px" />
              <p style={{ margin: "15px 0 0 " }}>{item.name}</p>
            </Col>
          );
        })}
      </Col>
    </Col>
  );
};

const Amenities = () => {
  const { cafeData } = useOutletContext<any>();
  const [amenitiesData, setAmenitiesData] = useState<any[]>([]);
  const [standoutAmenitiesData, setStandoutAmenitiesData] = useState<any[]>([]);
  const [filteredAmenities, setFilteredAmenities] = useState<any[]>([]);
  const [filteredStandout, setFilteredStandout] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any>([]);
  const [search, setSearch] = useState(false);
  const [searchval, setSearchVal] = useState("");
  const [show, setShow] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    setAmenitiesData(
      amenities.map((item: any) => {
        if (cafeData?.facilities?.indexOf(item.name) >= 0) {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      })
    );
    setStandoutAmenitiesData(
      standoutAmenities.map((item: any) => {
        if (cafeData?.standoutFacilities?.indexOf(item.name) >= 0) {
          item.status = true;
        } else {
          item.status = false;
        }
        return item;
      })
    );
  }, [cafeData]);
  useEffect(() => {
    setFilteredAmenities(
      amenitiesData?.filter((item: any, index: number) => item.status)
    );
    setFilteredStandout(
      standoutAmenitiesData?.filter((item: any, index: number) => item.status)
    );
    setFilteredList([
      ...amenitiesData?.filter((item: any, index: number) => !item.status),
      ...standoutAmenitiesData?.filter(
        (item: any, index: number) => !item.status
      ),
    ]);
  }, [amenitiesData, standoutAmenitiesData]);

  const addItem = ({ type, index, item }: any) => {
    if (type === "1") {
      const data = amenitiesData.map((e: any, index: number) => {
        if (e.name === item.name) {
          if (e.status) {
            e.status = false;
          } else {
            e.status = true;
          }
        }
        return e;
      });
      setAmenitiesData(data);
    } else if (type === "2") {
      const data = standoutAmenitiesData.map((e: any, index: number) => {
        if (e.name === item.name) {
          if (e.status) {
            e.status = false;
          } else {
            e.status = true;
          }
        }
        return e;
      });
      setStandoutAmenitiesData(data);
    }
  };
  const filterBySearch = (e: any) => {
    let updatedList = [
      ...amenitiesData
        ?.filter((item: any, index: number) => !item.status)
        .map((item: any) => {
          return { ...item, type: "1" };
        }),
      ...standoutAmenitiesData
        ?.filter((item: any, index: number) => !item.status)
        .map((item: any) => {
          return { ...item, type: "2" };
        }),
    ];

    // updatedList = updatedList.filter((item: any) => {
    //   return item?.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    // });

    setFilteredList(updatedList);
  };

  return (
    <>
      <Col>
        <div className={`${cx.businessInformation} ${am.fontStyle}`}>
          <h6>Amenities</h6>
          <div className={am.searchbar}>
            <input
              id="searchBar"
              type="search"
              placeholder="Search amenities here"
              value={searchval}
              onChange={(e: any) => {
                setSearchVal(e.target.value);
                filterBySearch(e);
                setShow(false);
              }}
              onFocus={(e: any) => {
                filterBySearch(e);
                setSearch(true);
                setShow(false);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShow(true);
                }, 400);
              }}
            />
            <button>
              <AiOutlineSearch />
            </button>
            {search && !show && filteredList.length > 0 && (
              <ol className={am.list}>
                {filteredList.map((item: any, index: number) => (
                  <li
                    role="button"
                    key={index}
                    onClick={() => {
                      setSearch(false);
                      setSearchVal("");
                      addItem({ type: item.type, index, item });
                      let search: any = document.getElementById("searchBar");
                      search.value = "";
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <Col>
            {filteredAmenities?.length > 0 && (
              <>
                <h6>Top Amenities</h6>
                <Col md={11} className={`d-flex flex-wrap`}>
                  {filteredAmenities.map((item: any, index: number) => {
                    return (
                      <SelectedItem
                        item={item.name}
                        index={index}
                        type="1"
                        removeItem={addItem}
                      />
                    );
                  })}
                </Col>
              </>
            )}
            {filteredStandout?.length > 0 && (
              <>
                <h6> Standout Amenities</h6>
                <Col md={11}>
                  <Col md={11} className={`d-flex flex-wrap`}>
                    {filteredStandout?.map((item: any, index: number) => {
                      return (
                        <SelectedItem
                          item={item.name}
                          index={index}
                          type="2"
                          removeItem={addItem}
                        />
                      );
                    })}
                  </Col>
                </Col>
              </>
            )}
          </Col>
          <AmenitiesItems
            amenitiesData={amenitiesData}
            setData={addItem}
            setState={setAmenitiesData}
          />
          <StandoutItems
            standoutAmenitiesData={standoutAmenitiesData}
            setData={addItem}
            setState={setStandoutAmenitiesData}
          />
        </div>
      </Col>
      <div className="my-3">
        <button
          className={cx.themeBtn}
          onClick={() => {
            const facilities = filteredAmenities.map((item: any) => item.name);
            const standoutFacilities = filteredStandout.map(
              (item: any) => item.name
            );
            dispatch(
              updateCafe({
                facilities: facilities,
                standoutFacilities: standoutFacilities,
                _id: params.id,
              })
            ).then((res: any) => {
              if (res.payload.success) {
                setOpenPopup(true);
              }
            });
          }}
        >
          Save Changes
        </button>
      </div>
      <SuccessPopup
        show={openPopup}
        handleClose={() => {
          setOpenPopup(false);
        }}
      />
    </>
  );
};

export default Amenities;

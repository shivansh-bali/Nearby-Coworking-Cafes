import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import cx from "../CafeDescription.module.scss";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

let amenities = [
  // {
  //   name: "Stars",
  // },
  // {
  //   name: "Price Range",
  // },
  // {
  //   name: "Open Now",
  // },
  {
    name: "WiFi",
  },
  {
    name: "Alcohol",
  },
  // {
  //   name: "Fast WiFi",
  // },
  {
    name: "Natural Light",
  },

  {
    name: "Charging Outlets",
  },

  {
    name: "Quiet Environment",
  },
  {
    name: "Outdoor Seating",
  },
  {
    name: "Large Groups",
  },
  // {
  //   name: "Students",
  // },
  {
    name: "Snacks",
  },
  {
    name: "Meals",
  },

  // {
  //   name: "Table Layout",
  // },
  {
    name: "Big Tables",
  },
  {
    name: "Sofa Seating",
  },
  {
    name: "High Tops",
  },
  // {
  //   name: "Bar Seating",
  // },

  // {
  //   name: "Small Groups",
  // },
  {
    name: "Private Room",
  },
  // {
  //   name: "Free Parking",
  // },
  {
    name: "Accessibility",
  },
];

const standoutAmenities = [
  {
    name: "Book Shop",
  },
  {
    name: "Printer Available",
  },
  {
    name: "Fast WiFi",
  },
  {
    name: "Child Seats",
  },
  {
    name: "Meals",
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
      className={`d-flex my-2 ${cx.selectedButton} `}
      style={buttonStyle[rendomNumber()]}
    >
      <p style={{ maxWidth: "max-content" }}>{props.item}</p>
      {!props.edit && (
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
      )}
    </div>
  );
};

const Amenities = ({ cafeData, setCafeData, edit }: any) => {
  const [amenitiesData, setAmenitiesData] = useState<any[]>([]);
  const [standoutAmenitiesData, setStandoutAmenitiesData] = useState<any[]>([]);
  const [filteredAmenities, setFilteredAmenities] = useState<any[]>([]);
  const [filteredStandout, setFilteredStandout] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any>([]);
  const [search, setSearch] = useState(false);
  const [searchval, setSearchVal] = useState("");
  const [show, setShow] = useState(false);

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
      let updatedData: any = [];
      data.forEach((item: any) => {
        if (item.status) {
          return updatedData.push(item.name);
        }
      });
      setCafeData((prev: any) => {
        return { ...prev, facilities: updatedData };
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
      let updatedData: any = [];
      data.forEach((item: any) => {
        if (item.status) {
          return updatedData.push(item.name);
        }
      });
      setCafeData((prev: any) => {
        return { ...prev, standoutFacilities: updatedData };
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

    const finalList = updatedList.filter((item: any, index: number) => {
      return (
        item?.name?.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });

    setFilteredList(finalList);
  };

  return (
    <>
      <div className={cx.container}>
        <div className={cx.header}>
          <h4>Amenities</h4>
        </div>

        {!edit && (
          <div className={cx.searchbar}>
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
              <ol className={cx.list}>
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
        )}

        <Col>
          {filteredAmenities?.length > 0 && (
            <>
              <p style={{ fontSize: "12px", margin: "10px 0 0" }}>
                Top Amenities
              </p>
              <Col md={11} className={`d-flex flex-wrap`}>
                {filteredAmenities.map((item: any, index: number) => {
                  return (
                    <SelectedItem
                      item={item.name}
                      index={index}
                      type="1"
                      removeItem={addItem}
                      edit={edit}
                    />
                  );
                })}
              </Col>
            </>
          )}
          {filteredStandout?.length > 0 && (
            <>
              <p style={{ fontSize: "12px", margin: "10px 0 0" }}>
                Standout Amenities
              </p>
              <Col md={11}>
                <Col md={11} className={`d-flex flex-wrap`}>
                  {filteredStandout?.map((item: any, index: number) => {
                    return (
                      <SelectedItem
                        item={item.name}
                        index={index}
                        type="2"
                        removeItem={addItem}
                        edit={edit}
                      />
                    );
                  })}
                </Col>
              </Col>
            </>
          )}
        </Col>
      </div>
    </>
  );
};

export default Amenities;

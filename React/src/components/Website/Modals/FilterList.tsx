import { Col } from "react-bootstrap";
import cx from "./Modal.module.scss";
import { Checkbox } from "../Forms";
import st from "../../../assets/stylesheet/style.module.scss";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}°C`;
}

const FilterList = (props: any) => {
  return (
    <div className={cx.filterPopupMain}>
      <div className={cx.filterPopup}>
        <Col className={cx.filterTitle}>
          <p>All filters</p>
          <div>
            <button className={`${cx.active}`}>All</button>
            <button>My friends</button>
          </div>
        </Col>
        <Col className={cx.amenitiesBox}>
          <h3>Amenities</h3>
          <ul>
            <li>
              <label className={st.radio}>
                <Checkbox /> 5G Wifi
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Electric car charging
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Fast charging sockets
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Small groups
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Outside dining
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Large groups
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Free parking
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Child friendly
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Near transportation
              </label>
            </li>
            <li>
              <label className={st.radio}>
                <Checkbox /> Nursing room
              </label>
            </li>
          </ul>
        </Col>
        <Col className={cx.rangeSelector}>
          <h3>Distance</h3>
          <label htmlFor="customRange2" className="form-label">
            <div>10 miles</div>
            <div> miles</div>
            <div>300 miles</div>
          </label>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
          />
        </Col>
      </div>
    </div>
  );
};

export default FilterList;

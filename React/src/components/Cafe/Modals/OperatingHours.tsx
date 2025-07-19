import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import cx from "../../../pages/Website/CafeStep/CafeStep.module.scss";
import { Checkbox } from "../../Website/Forms";
import st from "../../../assets/stylesheet/style.module.scss";
import m from "../../Admin/Modals/Modal.module.scss";

const OperatingHours = ({ show, handleClose }: any) => {
  return (
    <Modal
      centered
      scrollable
      show={show}
      onHide={handleClose}
      className={`${m.modalCts}`}
    >
      <Col md={6} className={`${cx.stepBody}`}>
        <Row>
          <Col md={12}>
            <h5 className={`${cx.titleIn} mb-5`}>Operating Hours</h5>
          </Col>
          <Col md={12}>
            <ul className={`${cx.timeSlot}`}>
              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Mon"} />
                  Mon
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Tue"} step={"step6"} />
                  Tue
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Wed"} step={"step6"} />
                  Wed
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Thu"} step={"step6"} />
                  Thu
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Fri"} step={"step6"} />
                  Fri
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Sat"} step={"step6"} />
                  Sat
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>

              <li>
                <label className={`${st.checkbox} ${cx.weekCount}`}>
                  <Checkbox nameCheckbox={"Sun"} step={"step6"} />
                  Sun
                </label>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Opening hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
                <div className={`${cx.dashLine}`}>-</div>
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label>Closing hour</Form.Label>
                  <Form.Control type="time" placeholder="00:00" />
                </Form.Group>
              </li>
            </ul>
          </Col>
          <Col md={12}>
            <Form.Group className={`${cx.formBox}`}>
              <Form.Label>
                Time limit for customers with laptop (If any)
              </Form.Label>
              <Form.Select required>
                <option value="">Select duration</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className={`${cx.formBox}`}>
              <Form.Label>Any restrictions?</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Please describe any restrictions or requirements for customers to work from your place"
                style={{ minHeight: "200px" }}
              />
            </Form.Group>
          </Col>
          <Col md={12} className={`${cx.inTitle}`}>
            <p>
              (E.g. Customers with laptops can only sit at the bar or customers
              only have WiFi access for one hour.)
            </p>
          </Col>
        </Row>
      </Col>
    </Modal>
  );
};

export default OperatingHours;

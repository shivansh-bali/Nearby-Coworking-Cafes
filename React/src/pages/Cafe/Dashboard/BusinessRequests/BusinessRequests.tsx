import React, { useState } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { FaEdit, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import cx from '../Dashboard.module.scss';
import {
  AiFillInstagram,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FiFolder } from 'react-icons/fi';
import { BsInfoCircle } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import EditBusiness from '../../../../components/Cafe/Modals/EditBusiness';
import { useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addImage } from '../../../../redux_toolkit/globalReducer/imageReducer';
import { imageUrl } from '../../../../redux_toolkit/globalReducer/imageReducer';
import PhoneInput from 'react-phone-input-2';
import m from '../../../../components/Admin/Modals/Modal.module.scss';

const ListItem = ({
  item,
  index,
  updateData,
  removeData,
  cafeData,
  updateCafeData,
}: any) => {
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState(false);

  return (
    <li key={index}>
      <div className={cx.linkContainer}>
        {item.icon}
        <p className={cx.saperator}></p>

        <div
          style={{
            position: 'relative',
          }}
        >
          <input
            type='text'
            name={item.name}
            placeholder={item.placeholder}
            value={cafeData?.[item.name]}
            disabled={!editable}
            onChange={(e: any) => {
              setError(false);
              updateData({ key: [e.target.name], value: e.target.value });
            }}
          />
          {error && (
            <p
              style={{
                color: '#ff8f8f',
                fontSize: '10px',
                position: 'absolute',
                top: '30px',
                left: '10px',
              }}
            >
              Enter a valid url
            </p>
          )}
        </div>
      </div>

      <div className={cx.actionButton}>
        <button
          onClick={() => {
            if (editable) {
              if (cafeData[item.name].length > 5) {
                updateCafeData({ [item.name]: cafeData[item.name] });
                setEditable(!editable);
              } else {
                setError(true);
              }
            } else {
              setEditable(!editable);
            }
          }}
        >
          {editable ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => {
            updateData({ key: [item.name], value: '' });
            removeData({ str: item.name });
          }}
        >
          {editable ? '' : 'Remove'}
        </button>
      </div>
    </li>
  );
};
const BusinessRequests = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  // const handleOpen = () => setShow(true);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const { updateData, removeData, cafeData, updateCafeData } =
    useOutletContext<any>();
  const availableDay = Object.keys(cafeData?.openHours ?? {})?.filter(
    (item: string, index: number) => cafeData?.openHours[item].startTime
  )?.[0];
  const data = [
    {
      value: cafeData?.facebookLink,
      icon: <FaFacebookF />,
      placeholder: 'Facebook Link',
      name: 'facebookLink',
    },
    {
      item: cafeData?.instagramLink,
      icon: <AiFillInstagram />,
      placeholder: 'Instagram Link',
      name: 'instagramLink',
    },
    {
      item: cafeData?.twitterLink,
      icon: <AiOutlineTwitter />,
      placeholder: 'Twitter Link',
      name: 'twitterLink',
    },
    {
      item: cafeData?.linkedinLink,
      icon: <FaLinkedinIn />,
      placeholder: 'LinkedIn Link',
      name: 'linkedinLink',
    },
  ];

  const timeChange = (time: any) => {
    if (time !== undefined) {
      let timeSplit = time?.split(':'),
        hours,
        minutes,
        meridian;
      hours = timeSplit[0];
      minutes = timeSplit[1];
      if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
      } else if (hours < 12) {
        meridian = 'AM';
        if (hours === 0) {
          hours = 12;
        }
      } else {
        meridian = 'PM';
      }
      return hours + ':' + minutes + ' ' + meridian + ' ';
    }
  };

  const DaysData = () => {
    return (
      <div style={{ margin: '10px' }}>
        {Object.keys(cafeData?.openHours).map((item: string, index: number) => {
          const getTime = timeChange(
            cafeData?.openHours[item]?.startTime
              ? cafeData?.openHours[item]?.startTime
              : '00:00'
          );
          const getEndTime = timeChange(
            cafeData?.openHours[item]?.endTime
              ? cafeData?.openHours[item]?.endTime
              : '00:00'
          );
          return (
            cafeData?.openHours[item]?.startTime !== '' && (
              <p key={index}>
                <span style={{ width: '30px', display: 'inline-block' }}>
                  {item}:
                </span>
                <span>{getTime}</span>-<span>{getEndTime}</span>
              </p>
            )
          );
        })}
      </div>
    );
  };
  const postImage = async ({ e, index }: any) => {
    await dispatch(addImage({ image: e.target.files[0] })).then((res: any) => {
      if (res?.payload?.success) {
        if (index !== undefined) {
          cafeData.uploadDocuments[index].name = e.target?.files[0]?.name;
          cafeData.uploadDocuments[index].url = imageUrl;
          updateCafeData({ uploadDocuments: cafeData.uploadDocuments });
        } else {
          updateCafeData({
            uploadDocuments: [
              ...cafeData?.uploadDocuments,
              { name: e.target.files[0].name, url: imageUrl },
            ],
          });
        }
      }
    });
  };
  const deleteImage = async (e: any) => {
    const filterData = cafeData?.uploadDocuments?.filter(
      (item: any) => item.name !== e.name
    );
    updateCafeData({ uploadDocuments: filterData });
  };
  console.log(cafeData?.openHours);
  return (
    <>
      <div className={cx.businessInformation}>
        <div
          className={`d-flex justify-content-between my-2 ${cx.businessInformationTitle}`}
        >
          <h6>Business Information</h6>
          <button onClick={() => setShow(true)}>
            Edit <FaEdit style={{ marginLeft: '10px' }} />
          </button>
        </div>

        <Col className={`d-flex container flex-wrap p-0 ${cx.businessList}`}>
          <div style={{ width: '300px' }}>
            <span>Business Name</span>
            <p>{cafeData?.establishmentName}</p>
          </div>
          <div style={{ width: '300px' }}>
            <span>Business Location</span>
            <p>
              {cafeData?.city},{cafeData?.state}
            </p>
          </div>
          <div style={{ width: '300px' }}>
            <span>Contact Number</span>

            <PhoneInput value={`+${cafeData?.phone}`} disabled />
          </div>

          {cafeData?.openHours && (
            <div style={{ width: '300px', cursor: 'pointer' }}>
              <span>Business Hours</span>
              <p>
                {availableDay}:
                {cafeData?.openHours[availableDay].startTime
                  ? cafeData?.openHours[availableDay].startTime
                  : '00:00'}
                -
                {cafeData?.openHours[availableDay].endTime
                  ? cafeData?.openHours[availableDay].endTime
                  : '00:00'}
                <Tooltip title={cafeData?.openHours ? <DaysData /> : 'No Data'}>
                  <button
                    style={{
                      width: 'max-content',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                    }}
                  >
                    <BsInfoCircle style={{ color: 'var(--Color5)' }} />
                  </button>
                </Tooltip>
              </p>
            </div>
          )}

          <div style={{ width: '300px' }}>
            <span>Website</span>
            <p>{cafeData?.website}</p>
          </div>
        </Col>
      </div>
      <div className={cx.businessInformation}>
        <div
          className={`d-flex justify-content-between my-2 ${cx.businessInformationTitle}`}
        >
          <h6>Menu</h6>
        </div>
        <div className={`d-flex container flex-wrap ${cx.businessList}`}>
          {cafeData?.uploadDocuments?.map((item: any, index: number) => {
            return (
              <div>
                <button className={cx.addImageBox}>
                  <FiFolder style={{ fontSize: '22px' }} />
                </button>
                <span
                  style={{
                    maxWidth: '120px',
                    margin: '5px 0 0 0',
                    fontSize: '14px',
                    textAlign: 'center',
                    color: 'black',
                    display: 'flex',
                  }}
                >
                  {item.name.length > 12 ? (
                    <>
                      {item.name.slice(0, 12)}
                      <Tooltip title={item.name}>
                        <Button sx={{ maxWidth: 'min-content' }}>...</Button>
                      </Tooltip>
                    </>
                  ) : (
                    item.name
                  )}
                </span>
                <div className={cx.actionButton}>
                  <div style={{ position: 'relative', lineHeight: '17px' }}>
                    <input
                      className={cx.uploadBtn}
                      type='file'
                      onChange={(e: any) => postImage({ e: e, index: index })}
                    />
                    <button style={{ color: '   var(--Color5)' }}>
                      Replace
                    </button>
                  </div>

                  <button onClick={() => deleteImage(item)}>Remove</button>
                </div>
              </div>
            );
          })}
          <button
            className={cx.addImageBox}
            style={{ paddingTop: '25px', color: '#bababa' }}
          >
            <input
              className={cx.uploadBtn}
              type='file'
              onChange={(e: any) => {
                const available = cafeData.uploadDocuments.some(
                  (item: any) => item.name === e.target.files[0].name
                );
                if (available) {
                  setError(true);
                } else {
                  postImage({ e: e });
                }
              }}
            />

            <AiOutlinePlus style={{ strokeWidth: '50', fontSize: '16px' }} />
            <p>Add</p>
          </button>
        </div>
      </div>
      <div
        className={`${cx.businessInformation} `}
        style={{ marginBottom: '20px' }}
      >
        <div className={` my-2 ${cx.businessInformationTitle}`}>
          <h6>Social Media Links</h6>
        </div>

        <Col className={`d-flex container flex-wrap ${cx.businessList}`}>
          <ul>
            {data.map((item: any, index: number) => {
              return (
                <ListItem
                  item={item}
                  index={index}
                  updateData={updateData}
                  removeData={removeData}
                  cafeData={cafeData}
                  updateCafeData={updateCafeData}
                />
              );
            })}
          </ul>
        </Col>
      </div>
      {error && (
        <>
          <Modal
            centered
            scrollable
            show={error}
            onHide={() => setError(false)}
            className={`${m.modalCts}`}
          >
            <div
              style={{ borderBottom: '1px solid var(--Main5)' }}
              className='d-flex justify-content-between'
            >
              <p
                style={{
                  padding: ' 15px',
                  margin: '0',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Failed!
              </p>
              <button
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'var(--Color5)',
                  padding: '10px',
                }}
                onClick={() => setError(false)}
              >
                <AiOutlineClose style={{ fontWeight: 'bold' }} />
              </button>
            </div>
            <div className={`${m.logoutPopup}`}>
              <div
                className={`${m.btnsAlignments} d-flex justify-content-center`}
              >
                <div></div>
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    color: 'red',
                    fontWeight: '500',
                  }}
                >
                  Please upload a different file, a file with the same name
                  already exists.
                </p>
              </div>
            </div>
          </Modal>
        </>
      )}
      <EditBusiness
        show={show}
        handleClose={handleClose}
        data={cafeData}
        updateData={updateData}
        updateCafeData={updateCafeData}
      />
    </>
  );
};

export default BusinessRequests;

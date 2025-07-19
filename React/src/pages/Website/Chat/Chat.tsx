import React, { useEffect, useState } from 'react';
import cx from './Chat.module.scss';
// import { NavLink } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
// import { MdOutlineMoreVert } from 'react-icons/md';
import { filter, userProfile } from '../../../assets/images';
import { GrAttachment } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineGif } from 'react-icons/ai';
import { profile } from '../../../redux_toolkit/reducer/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Unsubscribe, addDoc, collection, doc } from 'firebase/firestore';
import {
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from '../../../services/firebaseConfig';
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import axios from 'axios';

const Chat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [selectedName, setSelectedName] = useState<any>();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [reciversId, setReciversId] = useState<any>('');
  const [recivedMsgs, setRecivedMsgs] = useState<any>([]);
  const [imageLink, setImageLink] = useState<any>();
  const imageState = useSelector((state: any) => state.imageReducer);
  const profileState = useSelector((state: any) => state.profileReducer);

  const dispatch = useDispatch();

  const handleFileChange = (file: any) => {
    dispatch(addImage({ image: file?.target?.files[0] }));
  };

  useEffect(() => {
    if (imageState.imageState > 0) {
      setImageLink(imageUrl);
      dispatch(changeImageState());
    }
    if (profileState.updateState > 0) {
      setImageLink(undefined)
    }
  }, [
    dispatch,
    imageState.imageState,
    profileState.updateState,
  ]);

  useEffect(() => {
    if (profile?.data?.connection?.length > 0) {
      setSelectedName(profile?.data?.connection?.[0]);
      setReciversId(profile?.data?.connection?.[0]?._id);
    }
  }, [profileState.profileState])

  let firebaseId = profile?.data?._id + '-' + reciversId
  const chatId = `${profile?.data?._id}_${reciversId}`;
  const reciversChatId = `${reciversId}_${profile?.data?._id}`

  const sendMessage = async () => {
    // event?.preventDefault();
    setText("");
    // console.log(db, "sendMessage") 
    const messageData = {
      text: text,
      name: profile?.data?.name,
      createdAt: Date.now(),
      uid: profile?.data?._id,
      rid: reciversId,
      firebaseId: firebaseId,
      attachment: text === "" ? imageLink : '',
      gif: sendGif
    };

    try {
      const chatDocRef = doc(db, "messages", 'solo-message');
      const subcollectionRef = collection(chatDocRef, chatId);
      await addDoc(subcollectionRef, { ...messageData, messageID: chatId });
      console.log("Message added to chat with chatId: ", chatId);
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, 'messages', 'solo-message', chatId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe: Unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: any = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a: any, b: any) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    const q = query(
      collection(db, 'messages', 'solo-message', reciversChatId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe: Unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: any = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a: any, b: any) => a.createdAt - b.createdAt
      );
      setRecivedMsgs(sortedMessages);
    });

    return unsubscribe;
  }, [reciversChatId]);

  {/* Combine both arrays into a single array for sorting */ }
  const allMessages = [...recivedMsgs, ...messages];

  {/* Sort the combined array by the 'createdAt' timestamp */ }
  allMessages.sort((a, b) => a.createdAt - b.createdAt);

  // -----------------------------ENTER KEY-----------------------------//
  const useKeyPress = (targetKey: any) => {
    const [keyPressed, setKeyPressed] = React.useState(false);

    const downHandler = (e: any) => {
      if (e.key === targetKey && e.shiftKey) {
        return;
      } else {
        if (e.key === targetKey) setKeyPressed(true);
      }
    };

    const upHandler = ({ key }: any) => {
      if (key === targetKey) setKeyPressed(false);
    };
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    }, []);
    return keyPressed;
  };
  const enterPressed: any = useKeyPress("Enter");

  useEffect(() => {
    if (enterPressed === true && text !== "") {
      sendMessage();
      window.scrollTo(0, 0)
    }
  }, [enterPressed])

  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [sendGif, setSendGif] = useState('');

  const handleAiOutlineGifClick = () => {
    setShowInput(true);
  };

  const apiKey = '9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7';

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`
      );
      setGifs(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm])

  function handleImageClick(url: any) {
    setSendGif(url);
  }

  useEffect(() => {
    sendMessage();
  }, [imageLink])

  useEffect(() => {
    sendMessage();
  }, [sendGif])

  return (
    <>
      <section className={`${cx.chatSection}`}>
        <Container>
          <Row>
            <Col lg={4} xl={3} xxl={3} md={5}>
              <div className={`${cx.chatList} p-0`}>
                <div className={`${cx.chatHeading}`}>
                  <span>Messaging</span>
                </div>
                <div className={`${cx.chatSearchBox}`}>
                  <div className={`${cx.chatSearchBody}`}>
                    <FiSearch className={`${cx.searchBtn}`} />
                    <input type="text" className="form-control" placeholder='Search messages' />
                    <img alt="chatImage" src={filter} className={`${cx.filterImg}`} />
                  </div>
                  <FaEdit className={`${cx.editIcon}`} />
                </div>
                <ul>
                  {profile?.data?.connection?.map((item: any, index: any) => {
                    return (
                      <li key={index}>
                        <button
                          className={`${cx.listMenu} ${cx.active}`}
                          onClick={() => {
                            setSelectedName(item) // Set the selected name when the button is clicked
                            setReciversId(item?._id)
                          }}>
                          <img alt="chatImage" src={userProfile} className={`${cx.profileImg}`} />
                          <div className={`${cx.chatListBody}`}>
                            <h5>{item?.name}</h5>
                            <p>{allMessages[allMessages.length - 1]?.text ? allMessages[allMessages.length - 1]?.text : 'image'}</p>
                            <div className={`${cx.timeBox}`}>
                              {/* <p>12:26</p> */}
                              <p><time>
                                {new Date(allMessages[allMessages.length - 1]?.createdAt).toLocaleString("en-us", {
                                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </time></p>
                              {/* <Badge>5</Badge> */}
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Col>

            <Col lg={8} xl={9} xxl={9} md={7} className="p-0">
              <div className={`${cx.chatbody}`}>
                <Row className={`${cx.chatHead}`}>
                  <Col className='col-8' md={6}>
                    <div className={`${cx.userDetails}`}>
                      <img alt="chatImage" src={userProfile} className={`${cx.profileImg}`} />
                      <div className={`${cx.chatListBody}`}>
                        <h5>{selectedName?.name}</h5>
                        <p className={`${cx.status}`}>
                          <span style={{ background: "#738801" }}></span> Active now
                        </p>
                      </div>
                    </div>
                  </Col>

                </Row>
                <div className={`${cx.userchatBody}`}>
                  <div className={`${cx.oldDated}`}>
                    <span>July  14, 5:55 PM</span>
                  </div>

                  {/* Render the sorted messages */}
                  {allMessages.map((item: any) => {
                    return (
                      <div className={`${cx.chatMessage} ${item.uid === profile?.data?._id ? cx.chatRight : cx.chatLeft}`}>
                        <img alt="chatImage" src={item.uid !== profile?.data?._id ? userProfile : profile?.data?.profileImage || userProfile} className={`${cx.profileImg}`} />
                        <div className={`${cx.chatMessageBody}`}>
                          {item?.text ? <p>{item?.text}</p> : ''}
                          {item?.attachment ? <p><img src={item?.attachment} alt="attachment" style={{ width: "200px" }} /></p> : ''}
                          {item?.gif ? <p><img src={item?.gif} alt="gif" style={{ width: "200px" }} /></p> : ''}
                          <time>
                            {
                              new Date(item?.createdAt).toLocaleString("en-us", {
                                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            }
                          </time>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`${cx.chatSubmit}`}>
                  <div className={`${cx.chatSubmiBody}`}>
                    <div className={`${cx.actionBtns}`}>
                      {/* <button title="Location">
                        <HiLocationMarker style={{ fontSize: "22px" }} />
                      </button>
                      <button title="Gallery">
                        <FaRegImage style={{ fontSize: "22px" }} />
                      </button> */}
                      <button title="Attachment" type="submit">
                        <GrAttachment />
                        <input type="file" onChange={handleFileChange} />
                      </button>
                      <button title="Gif" onClick={handleAiOutlineGifClick}>
                        <AiOutlineGif style={{ fontSize: "25px" }} />
                      </button>
                      {(showInput &&
                        <input
                          placeholder="Search for GIFs"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      )}
                      <div style={{ width: '200px', whiteSpace: 'nowrap', overflowX: 'scroll' }}>
                        {gifs.map((gif: any) => {
                          return (
                            <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title}
                              onClick={() => {
                                handleImageClick(gif?.images?.downsized_still?.url);
                              }} />
                          );
                        })}
                      </div>
                    </div>

                    <div className={`${cx.typeForm}`}>
                      <input
                        type="text"
                        value={text}
                        className="form-control"
                        placeholder="Write a message..."
                        onChange={(e: any) => {
                          setText(e?.target?.value)
                        }}
                      />
                    </div>

                    <div className={`${cx.submitAction}`}>
                      <button title="Send" type='submit'
                        onClick={() => {
                          sendMessage();
                        }}>
                        <FaTelegramPlane />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section >
    </>
  )
}

export default Chat
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Layout,
  Menu,
  Popover,
  Row,
  Segmented,
  Space,
  Typography,
} from "antd";

import React, { Fragment, useEffect, useRef, useState } from "react";

import "./index.css";
import {
  Link,
  NavLink,
  useNavigate,
  Navigate,
  redirect,
} from "react-router-dom";
import { Slider } from "Components";
import data from "Components/Buyer/DumpData";
import { LivestreamCard, Product, FeaturedCard } from "UI/elements";
import ChatBox from "./ChatBox";
import {
  MenuUnfoldOutlined,
  MailOutlined,
  MenuFoldOutlined,
  HeartFilled,
} from "@ant-design/icons";
import SharePopover from "./SharePopover";
import AgoraRTM from "agora-rtm-sdk";

import App from "App.js";
import Room from "./Room";
import axios from "../../../api/axios";
import { socket } from "../../../Hooks/socket/useSocket";
import FeaturedCardNew from "../../../UI/elements/FeaturedCardNew";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

let token;
let uid = String(Math.floor(Math.random() * 1232));
const APP_ID = "b8c5abca5a9a4fbc987e2efe3bb374c6";

const chatClient = AgoraRTM.createInstance(APP_ID);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// const navigateStore = useNavigate();

const hangleClickStore = () => {
  console.log("store");
  // return redirect('/store');
  window.location.href = "/store";
};



const items = [
  getItem("Following", "sub1", <MailOutlined />, [
    getItem(
      "Pink Black Shop",
      "g1",
      <Badge count="Live" className="my-xl" onClick={hangleClickStore}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      </Badge>
      // [getItem('Option 1', '1'), getItem('Option 2', '2')],
      // 'group'
    ),
    getItem(
      "Dadies Fashion",
      "g2",
      <Badge count="Live" className="my-xl" onClick={hangleClickStore}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      </Badge>
      // [getItem('Option 3', '3'), getItem('Option 4', '4')],
      // 'group'
    ),
  ]),

  { type: "divider" },

  getItem("Featured Creators", "sub2", <MailOutlined />, [
    getItem(
      "Bomb Phone",
      "g3",
      <Badge count="Live" className="my-xl">
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      </Badge>
      // [getItem('Option 1', '1'), getItem('Option 2', '2')],
      // 'group'
    ),
    getItem(
      "Lazy Shop",
      "g4",
      <Badge count="Live" className="my-xl">
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
      </Badge>
      // [getItem('Option 3', '3'), getItem('Option 4', '4')],
      // 'group'
    ),
  ]),
];

export default function LivePage() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showDiscover, setShowDiscover] = useState(true);
  const { livestreams } = data;
  
  const [settings, setSettings] = useState({
    // className: 'center',
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 2,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    infinite: true,
    draggable: false,
    vertical: false,
    // vertical: true,
    // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  const fullScreenContainerRef = useRef(null);

  const [isShowPinedProduct, setIsShowPinedProduct] = useState(false);

  const showPinedProduct = (value) => {
    console.log("value", value);
    setIsShowPinedProduct(value);
  };

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch("http://localhost:8080/api/product", {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data);
  };


  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", (e) => {
      if (document.fullscreenElement) {
        setSettings((prev) => ({
          ...prev,
          rows: 1,
          slidesToShow: 2,
          vertical: true,
        }));
      } else {
        setSettings((prev) => ({
          ...prev,
          rows: 1,
          slidesToShow: 2,
          vertical: false,
        }));
      }
    });
  }, []);

  const [roomsData, setRoomsData] = useState([]);

  // const { chatClient } = useAgora();

  const lobbyChannel = useRef(chatClient.createChannel("lobby")).current;
  const initRTM = async () => {
    await chatClient.login({ uid, token });
    await lobbyChannel.join();

    lobbyChannel
      .getMembers()
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };
  let leaveChannel = async () => {
    await lobbyChannel.leave();
  };

  window.addEventListener("beforeunload", leaveChannel);
  useEffect(() => {
    initRTM();
    // return () => {
    //   initRTM();
    // }
  }, []);

  const [productsLive, setProductsLive] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `/livestream/getProductsByLivestreamId/${4}`
        );
        console.log(res.data);
        setProductsLive(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  const checkHeartBeat = async (roomsData) => {
    console.log("Checking hearbeat....");
    let rooms_all = roomsData;
    // console.log(rooms_all);
    // console.log(roomsData);

    for (let room of rooms_all) {
      let { roomId, members } = room;
      console.log(roomId);

      let count = await chatClient.getChannelMemberCount([roomId]);
      console.log(count);

      if (count[roomId] < 1) {
        setRoomsData((pre) => {
          return pre.filter((room) => room.roomId !== roomId);
        });
      } else {
        console.log("set room data");

        setRoomsData((pre) => {
          return pre?.map((item) => {
            if (item.roomId === roomId) {
              return { ...item, members: count[roomId] };
            }
            return item;
          });
        });
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkHeartBeat(roomsData);
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, [roomsData, chatClient, lobbyChannel]);

  const getRooms = async (roomId) => {
    let attributes = await chatClient.getChannelAttributesByKeys(roomId, [
      "room_name",
      "host",
      "thumbnail",
    ]);
    return attributes;
  };
  const handleMessageFromFeer = async (message, peerId) => {
    let messageData = JSON.parse(message.text);
    let count = await chatClient.getChannelMemberCount([messageData.room]);
    console.log(count);
    let attributes = await getRooms(messageData.room);
    console.log(attributes);
    console.log("called lobby");

    setRoomsData((pre) => {
      let found = pre.find((item) => item.roomId === messageData.room);
      console.log(found);

      if (!found)
        return [
          ...pre,
          {
            roomId: messageData.room,
            members: count[messageData.room],
            hostName: attributes.host.value,
            roomName: attributes.room_name.value,
            thumbnail: attributes.thumbnail?.value,
          },
        ];
      return pre;
    });
  };

  useEffect(() => {
    let randomId = Math.floor(Math.random() * 100);

    sessionStorage.setItem("display_name", "user");
  }, []);

  useEffect(() => {
    console.log("hello hello");

    chatClient.on("MessageFromPeer", handleMessageFromFeer);
    // return () => {
    //   chatClient.off("MessageFromPeer", handleMessageFromFeer);
    // }
  }, [chatClient, lobbyChannel]);

  const handleJoinRoom = (e, roomId) => {
    e.preventDefault();
    socket.emit("join-room", roomId);
    setTimeout(() => {
      navigate(`/room?room=${roomId}`);
    }, 1000);
  };
  console.log(roomsData);

  return (
    <Fragment>
      <Layout className="p-xl">
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          //   onCollapse={(value) => setCollapsed(value)}
        >
          <div className="text-end">
            <Button
              type="text"
              onClick={() => {
                setCollapsed((prev) => !prev);
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          {/* <h1 className="p-xl mx-[4px] my-0 text-center">Following</h1> */}
          <Menu
            mode="inline"
            // defaultSelectedKeys={['g1']}
            // defaultOpenKeys={['sub1', 'sub2']}
            style={{ borderRight: 0 }}
            items={items}
            inlineCollapsed={collapsed}
            // multiple
          />
          {/* <Divider />
          <h1 className="px-xl mx-[4px] my-0 text-center">Featured Creators</h1>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ borderRight: 0 }}
            items={items2}
            className="h-60[px]"
          /> */}
        </Sider>
        <Content className="px-xl">
          <div className="mb-xl">
            <Segmented
              options={[
                { label: "Discover", value: 1 },
                { label: "Following", value: 2 },
              ]}
              onChange={(value) => {
                if (value === 1) {
                  setShowDiscover(true);
                } else {
                  setShowDiscover(false);
                }
              }}
            />
          </div>
          {showDiscover ? (
            <Fragment>
              <div>
                <div className="font-bold text-xl">CURRENT LIVE</div>
                  <div className="grid grid-cols-4 gap-4">
                    {roomsData?.map((room, index) => (
                      <div
                        key={index}
                        className="flex flex-col bg-slate-500 w-[300px] h-[220px] border border-collapse"
                      >
                        {/* <img className='w-full h-[60%] object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzj9vzPuAjx58iQkzPwG1THxXllp6skvR9DsY0NcmvI6nY6D3b5kluBLyRSZJuGiA2ACA&usqp=CAU" alt="" /> */}
                        <img
                          className="w-full h-[60%] object-cover"
                          src={room.thumbnail}
                        alt="Thumbnail"
                      />
                      <div className="p-2">
                        <p className="text-white">{room.roomName}</p>
                        <span>{`${room.members} watching`}</span>
                        <div className="flex items-center justify-between">
                          <p className="font-bold">{room.hostName}</p>
                          <button
                            onClick={(e) => handleJoinRoom(e, room.roomId)}
                            className="bg-blue-400 px-1 py-[2px] rounded-md"
                          >
                            Join Room
                            {/* <Link to={`/room?room=${room.roomId}`}>Join Room</Link> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col overflow-y-scroll h-[500px]">
                    {productsLive?.map((item, index) => (
                      <div className="mb-5" key={index}>
                        <FeaturedCardNew product={item} containerRef={fullScreenContainerRef} />
                      </div>
                    ))}
              </div>

              {/* <Slider
                settings={{ ...settings, slidesPerRow: 1, slidesToShow: 5 }}
                textLevel={4}
                title="CURRENT LIVESTREAMS"> */}

              {/* {livestreams.map((item, index) => (
                  <NavLink to={``} key={index} className="px-5">
                    <LivestreamCard {...item} />
                  </NavLink>

                ))} */}

              {/* </Slider> */}
              <Slider
                settings={{
                  ...settings,
                  // rows: 1,
                  slidesPerRow: 1,
                  slidesToShow: 5,
                }}
                textLevel={4}
                title="UPCOMING LIVESTREAMS"
              >
                {livestreams.map((item, index) => (
                  <NavLink to={``} key={index} className="px-5">
                    <LivestreamCard {...item} />
                  </NavLink>
                ))}
              </Slider>
              <Slider
                settings={{
                  ...settings,
                  // rows: 1,
                  slidesPerRow: 1,
                  slidesToShow: 5,
                }}
                textLevel={4}
                title="RECENT LIVESTREAMS"
              >
                {livestreams.map((item, index) => (
                  <NavLink to={``} key={index} className="px-5">
                    <LivestreamCard {...item} />
                  </NavLink>
                ))}
              </Slider>
            </Fragment>
          ) : (
            <div ref={fullScreenContainerRef}>
              <Row gutter={16}>
                <Col span={24}>
                  {/* <App
                    fullScreenContainerRef={fullScreenContainerRef}
                    showPinedProduct={showPinedProduct}
                    isShowPinedProduct={isShowPinedProduct}
                  /> */}
                  {/* <Room /> */}
                </Col>
                <Col span={24} className="w-0">
                  <Row className="testss">
                    <Col span={12} xl={8}>
                      <FeaturedCard
                        containerRef={fullScreenContainerRef}
                        isShow={isShowPinedProduct}
                        setIsShow={showPinedProduct}
                      />
                    </Col>
                    <Col span={12} xl={16}>
                      <Slider
                        settings={{
                          ...settings,
                          responsive: [
                            {
                              breakpoint: 1200,
                              settings: {
                                slidesToShow: 1,
                              },
                            },
                          ],
                        }}
                      >
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                        <FeaturedCard containerRef={fullScreenContainerRef} />
                      </Slider>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          )}
        </Content>
      </Layout>
      <Layout className="px-xl">
        {showDiscover ? (
          <Slider
            settings={{
              ...settings,
              rows: 1,
              slidesToShow: 6,
              // slidesPerRow: 6,
              // responsive: [],
            }}
            textLevel={4}
            title={"TOP PRODUCTS"}
          >
            {products.map((product, index) => (
              <NavLink to={`/product_detail?id=${product.id}`} key={product.id}>
                <Product {...product} />
              </NavLink>
            ))}
          </Slider>
        ) : (
          <Fragment>
            <Slider
              settings={{
                ...settings,
                rows: 1,
                slidesPerRow: 1,
                slidesToShow: 5,
              }}
              textLevel={4}
              title="CURRENT LIVESTREAMS"
            >
              {livestreams.map((item, index) => (
                <NavLink to={`""`} key={index} className="px-5">
                  <LivestreamCard {...item} />
                </NavLink>
              ))}
            </Slider>
            <Slider
              settings={{ ...settings, slidesPerRow: 1, slidesToShow: 5 }}
              textLevel={4}
              title="UPCOMING LIVESTREAMS"
            >
              {livestreams.map((item, index) => (
                <NavLink to={`""`} key={index} className="px-5">
                  <LivestreamCard {...item} />
                </NavLink>
              ))}
            </Slider>
            <Slider
              settings={{ ...settings, slidesPerRow: 1, slidesToShow: 5 }}
              textLevel={4}
              title="PREVIOUS LIVESTREAMS"
            >
              {livestreams.map((item, index) => (
                <NavLink
                  to={`?sort=category&value=${item.title}`}
                  key={index}
                  className="px-5"
                >
                  <LivestreamCard {...item} />
                </NavLink>
              ))}
            </Slider>
          </Fragment>
        )}
      </Layout>
    </Fragment>
  );
}


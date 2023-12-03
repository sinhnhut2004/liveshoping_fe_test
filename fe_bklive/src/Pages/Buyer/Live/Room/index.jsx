import  { useEffect, useRef, useState } from 'react'

import AgoraRTM from 'agora-rtm-sdk';
import { redirect, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AgoraRTC, { IAgoraRTCRemoteUser, ILocalVideoTrack } from 'agora-rtc-sdk-ng';

import useAgoraVideo from '../../../../Hooks/useAgoraVideo';
import useAgorachat from '../../../../Hooks/useAgoraChat';
import Message from '../Message';
import VideoLivestream from '../VideoLiveStream';
import axios from '../../../../api/axios';
import { ImportExport } from '@mui/icons-material';
import { socket } from '../../../../Hooks/socket/useSocket';
import FeaturedCardNew from '../../../../UI/elements/FeaturedCardNew';
import { Col, Row, Slider } from 'antd';


// type PropsType = {
//   api: {
//     join: Function;
//     leave: Function;
//     publish: Function;
//     unpublish: Function;
//   },
//   state: {
//     joined: boolean;
//     published: boolean;
//     localVideoTrack: ILocalVideoTrack | undefined;
//     remoteUsers: IAgoraRTCRemoteUser[] | undefined;
//   }
// }

const APP_ID="b8c5abca5a9a4fbc987e2efe3bb374c6"

const chatClient = AgoraRTM.createInstance(APP_ID);
const rtcClient = AgoraRTC.createClient({codec: "vp8", mode: "live"});

const Room = () => {

  const [channel, setChannel] = useState("default");
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const fullScreenContainerRef = useRef(null);
  const [isShowPinedProduct, setIsShowPinedProduct] = useState(false);

  const showPinedProduct = (value) => {
    console.log('value', value);
    setIsShowPinedProduct(value);
  };
  //const {chatClient } = useAgora();
  // const location = useLocation();
  // let params = new URLSearchParams(location.search);
  // console.log(params.get("room"));
  const [searchParams, setSearchParams] = useSearchParams();
  let displayName = sessionStorage.getItem("display_name");
  console.log(displayName);
  
  let room = searchParams.get("room");
  // useEffect(() => {
  //   if(room === null || displayName === null) {
  //     console.log("redirect");
      
  //     navigate(`/join/?room=${room}`);
      
  //   }  
  // }, [room, displayName])
  
  
  
  //console.log(room);
  
  // if(room === null) {
  //     room = 'default'
  // }
  let channelName = room;
  const {messages, sendChannelMessage, membersPaticipate, isHost} = useAgorachat(chatClient, channelName);
  console.log(membersPaticipate);
  const {api, state} = useAgoraVideo(rtcClient);
  useEffect(() => {
    const getProducts = async () => {
      try {
        console.log(room);
        const res = await axios.get(`/livestream/getProductsByLivestreamId/${room}`);
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [])
  
  useEffect(() => {
   
    api.join();
    console.log(rtcClient.remoteUsers);
    
  }, [rtcClient])
  useEffect(() => {
    const handleUpdateLikes = (data) => {
      setLikes(data);
      console.log(data);
    }
    socket.on('updateLikes', handleUpdateLikes);
    return () => {
      socket.off('updateLikes', handleUpdateLikes);
    }
  }, [])
  useEffect(() => {
    const handleReceiveOrder = (data) => {
      console.log(data);
    }
    socket.on('orderProduct', handleReceiveOrder);
    return () => {
      socket.off('orderProduct', handleReceiveOrder);
    }
  }, [])
  const handleLike = (e, room) => {
    e.preventDefault();
    socket.emit("like", room);
  }
  return (
    // <div>
    //   This is room page
    // </div>
    <div id='room-container' className='w-full h-full flex p-2'>
        <div className='flex-[1] online-user'>
            <div className='mx-3 my-2 flex flex-col overflow-y-scroll h-[60%]'>
              {products?.map((item, index) => (
                <div className='mb-5'>
                  <FeaturedCardNew key={index} product={item} containerRef={fullScreenContainerRef} />
                </div>
              ))}
            </div>
        </div>
        <div className='flex-[3] flex-col video-container'>
            <VideoLivestream api={api} state={state} />
            {/* {
              isHost && <ViewChart membersPaticipate={membersPaticipate} />
            } */}
            <span>{likes}</span>
            <button 
              onClick={(e) => handleLike(e, room)}
              className='bg-blue-400 px-3 py-4 border-[2px]'
            >Like</button>
        </div>
        <div className='p-2 flex-[1] h-full message'>
            <Message messages={messages} sendChannelMessage={sendChannelMessage} />
        </div>
        <div>
        </div>
    </div>
  )
}

export default Room

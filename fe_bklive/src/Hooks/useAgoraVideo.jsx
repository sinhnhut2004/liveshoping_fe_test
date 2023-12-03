import AgoraRTC, {
    IAgoraRTCClient,
    IAgoraRTCRemoteUser,
    ILocalAudioTrack,
    ILocalVideoTrack,
  } from "agora-rtc-sdk-ng";

  import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

//   type PropsType = {
//     api: {
//       join: Function;
//       leave: Function;
//       publish: Function;
//       unpublish: Function;
//     },
//     state: {
//       joined: boolean;
//       published: boolean;
//       localVideoTrack: ILocalVideoTrack | undefined;
//       localAudioTrack: ILocalAudioTrack | undefined;
//       remoteUsers: IAgoraRTCRemoteUser[] | undefined;
//     }
//   }
  
  
  
  const APP_ID = "b8c5abca5a9a4fbc987e2efe3bb374c6";
  let token;
  let rtcUid = Math.floor(Math.random() * 232);
  
  export default function useAgoraVideo(rtcClient) {
    const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
    const [joined, setJoined] = useState(false);
    const [published, setPublished] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [searchParams] = useSearchParams();
    
    let room = searchParams.get("room");
    console.log(room);
    
    const config = {
      appId: APP_ID,
      token: token,
      uid: rtcUid,
      channel: room,
    };
    const join = useCallback(async () => {
      if (!rtcClient) return;
      console.log("before join");
      console.log(config.appId, config.channel);
      
      try {
        await rtcClient.join(
          config.appId,
          config.channel,
          null,
          config.uid
        );
  
      setJoined(true);
      } catch (error) {
        console.log(error);
        
      }
      
      
      
    }, [rtcClient]);
    console.log(joined);
    
    const publish = useCallback(async () => {
      if(!rtcClient) return;
      const cameraTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      
      await rtcClient.setClientRole("host");
      const video_stream = document.getElementById('video-stream');
      video_stream.innerHTML = '';
      let player = `<div class="w-full h-full" id="user-container-${rtcUid}">
                      <div class="w-full h-full" id="user-${rtcUid}"></div>
                    </div>`
      video_stream.insertAdjacentHTML('beforeend', player);
      cameraTrack.play(`user-${rtcUid}`);
      audioTrack.play();
      await rtcClient.publish([cameraTrack, audioTrack]);
      setLocalVideoTrack(cameraTrack);
      setLocalAudioTrack(audioTrack);
      setPublished(true);
  
    }, [rtcClient])
  
    const unpublish = useCallback(async () => {
      localVideoTrack?.stop();
      localAudioTrack?.stop();
      localVideoTrack?.close();
      localAudioTrack?.close();
      await rtcClient?.unpublish();
      await rtcClient?.setClientRole("audience");
      setPublished(false);
    }, [rtcClient, localVideoTrack, localAudioTrack])
  
    const leave = useCallback(async () => {
      await unpublish();
      await rtcClient?.leave();
      setRemoteUsers([]);
      setJoined(false);
    }, [rtcClient, unpublish])
  
    useEffect(() => {
      if(!rtcClient) return;
      
      console.log(rtcClient.remoteUsers);
      
      setRemoteUsers(rtcClient.remoteUsers);
  
      const handleUserPublished = async(
        user,
        mediaType
      ) => {
        await rtcClient.subscribe(user, mediaType);
        if(mediaType === 'video') {
          let player = document.getElementById(`user-container-${user.uid}`);
          if(player != null) player.remove();
          let players = `<div class="w-full h-full" id="user-container-${user.uid}">
                      <div class="w-full h-full" id="user-${user.uid}"></div>
                    </div>`
          const video_stream = document.getElementById(`video-stream`);
          
          video_stream.insertAdjacentHTML('beforeend', players);
          user.videoTrack?.play(`user-${user.uid}`)
        }
  
      }
      const handleUserUnpublished = (user) => {
        
        //setRemoteUsers((remoteUsers) => Array.from(rtcClient.remoteUsers));
      };
      const handleUserJoined = (user) => {
        setRemoteUsers((remoteUsers) => Array.from(rtcClient.remoteUsers));
      };
      const handleUserLeft = (user) => {
        setRemoteUsers((remoteUsers) => Array.from(rtcClient.remoteUsers));
      };
      rtcClient.on("user-published", handleUserPublished);
      rtcClient.on("user-unpublished", handleUserUnpublished);
      rtcClient.on("user-joined", handleUserJoined);
      rtcClient.on("user-left", handleUserLeft);
      return () => {
        rtcClient.off("user-published", handleUserPublished);
        rtcClient.off("user-unpublished", handleUserUnpublished);
        rtcClient.off("user-joined", handleUserJoined);
        rtcClient.off("user-left", handleUserLeft);
      }
    }, [rtcClient]) 
    const api = useMemo(() => ({ join, leave, publish, unpublish }), [
      join,
      leave,
      publish,
      unpublish
    ]);
    console.log(remoteUsers);
    
    const state = useMemo(
      () => ({ joined, published, localVideoTrack, localAudioTrack, remoteUsers }),
      [joined, published, localVideoTrack, remoteUsers, localAudioTrack]
    );
  
    return {api, state}
  }
  

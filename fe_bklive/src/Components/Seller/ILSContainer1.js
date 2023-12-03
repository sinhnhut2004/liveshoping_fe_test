import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2';
import ViewChart from "./ViewChart";
import Product from "./Product";
import {
  Constants,
  createCameraVideoTrack,
  useMeeting,
  usePubSub,
} from "@videosdk.live/react-sdk";

// import { SidebarConatiner } from "../../Livestream/sidebar/SidebarContainer";
import { SidebarConatiner } from "../Common/Livestream/sidebar/SidebarContainer";

// import { nameTructed, trimSnackBarText } from "../utils/helper";
import { nameTructed, trimSnackBarText } from "../Common/Livestream/dependencies/utils/common";

// import { ILSBottomBar } from "../../Livestream_folder/interactive-live-streaming/components/ILSBottomBar";

// import { TopBar } from "../../Livestream_folder/interactive-live-streaming/components/TopBar";
import { TopBar } from "../Common/Livestream/dependencies/interactive-live-streaming/components/TopBar"
// import useIsTab from "../hooks/useIsTab";
import useIsTab from "../Common/Livestream/dependencies/hooks/useIsTab";

// import PollsListner from "../../Livestream_folder/interactive-live-streaming/components/pollContainer/PollListner";
import PollsListner from "../Common/Livestream/dependencies/interactive-live-streaming/components/pollContainer/PollListner"


// import HLSContainer from "../../Livestream_folder/interactive-live-streaming/components/hlsViewContainer/HLSContainer";

import HLSContainer from "../Common/Livestream/dependencies/interactive-live-streaming/components/hlsViewContainer/HLSContainer"

// import FlyingEmojisOverlay from "../../Livestream_folder/interactive-live-streaming/components/FlyingEmojisOverlay";
import FlyingEmojisOverlay from "../Common/Livestream/dependencies/interactive-live-streaming/components/FlyingEmojisOverlay"

// import MemorizedILSParticipantView from "../../Livestream_folder/interactive-live-streaming/components/ILSParticipantView";
import MemorizedILSParticipantView from "../Common/Livestream/dependencies/interactive-live-streaming/components/ILSParticipantView"


// import WaitingToJoinScreen from "../../Livestream/screens/WaitingToJoinScreen";
import WaitingToJoinScreen from "../Common/Livestream/screens/WaitingToJoinScreen";
// import LocalParticipantListner from "../../Livestream_folder/interactive-live-streaming/components/LocalParticipantListner";
import LocalParticipantListner from "../Common/Livestream/dependencies/interactive-live-streaming/components/LocalParticipantListner"
// import ConfirmBox from "../../Livestream/ConfirmBox";
import ConfirmBox from "../Common/Livestream/ConfirmBox";

// import useIsMobile from "../hooks/useIsMobile";
import useIsMobile from "../Common/Livestream/dependencies/hooks/useIsMobile";
// import { useMediaQuery } from "react-responsive";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { useMeetingAppContext } from "../Common/Livestream/dependencies/MeetingAppContextDef";
// import { useMeetingAppContext } from "../MeetingAppContextDef";
// import ModeListner from "../../Livestream_folder/interactive-live-streaming/components/ModeListner";
import ModeListner from "../Common/Livestream/dependencies/interactive-live-streaming/components/ModeListner"
// import { ChatPanel } from "../../Livestream/sidebar/ChatPanel";
import { ChatPanel } from "../Common/Livestream/sidebar/ChatPanel";
import { ILSBottomBar1 } from "./ILSBottomBar1";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
)

const DUMP = {
  products: [
    {
      id: 1,
      title: 'Product 1',
      price: 50,
      currency: 'USD',
      img: 'https://picsum.photos/500/500',
      inStock: 30,
      star: 4,
    }]
  };

export function ILSContainer1({
  onMeetingLeave,
  setIsMeetingLeft,
  selectedMic,
  selectedWebcam,
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
  micEnabled,
  webcamEnabled,
  meetingMode,
  setMeetingMode,
}) {
  const {
    setAfterMeetingJoinedHLSState,
    useRaisedHandParticipants,
    sideBarMode,
  } = useMeetingAppContext();
  const bottomBarHeight = 60;
  const topBarHeight = 60;

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [meetingError, setMeetingError] = useState(false);
  const [meetingErrorVisible, setMeetingErrorVisible] = useState(false);
  const mMeetingRef = useRef();
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] =
    useState(null);

  const containerRef = createRef();
  const containerHeightRef = useRef();
  const containerWidthRef = useRef();
  const meetingModeRef = useRef(meetingMode);

  useEffect(() => {
    containerHeightRef.current = containerHeight;
    containerWidthRef.current = containerWidth;
  }, [containerHeight, containerWidth]);

  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const sideBarContainerWidth = isXLDesktop
    ? 400
    : isLGDesktop
    ? 360
    : isTab
    ? 320
    : isMobile
    ? 280
    : 240;

  useEffect(() => {
    containerRef.current?.offsetHeight &&
      setContainerHeight(containerRef.current.offsetHeight);
    containerRef.current?.offsetWidth &&
      setContainerWidth(containerRef.current.offsetWidth);

    window.addEventListener("resize", ({ target }) => {
      containerRef.current?.offsetHeight &&
        setContainerHeight(containerRef.current.offsetHeight);
      containerRef.current?.offsetWidth &&
        setContainerWidth(containerRef.current.offsetWidth);
    });
  }, [containerRef]);

  const { participantRaisedHand } = useRaisedHandParticipants();

  const _handleMeetingLeft = () => {
    setIsMeetingLeft(true);
  };
  const { startHls, stopHls, hlsState } = useMeeting({});
  startHls();

  const _handleOnRecordingStateChanged = ({ status }) => {
    if (
      meetingModeRef.current === Constants.modes.CONFERENCE &&
      (status === Constants.recordingEvents.RECORDING_STARTED ||
        status === Constants.recordingEvents.RECORDING_STOPPED)
    ) {
      toast(
        `${
          status === Constants.recordingEvents.RECORDING_STARTED
            ? "Meeting recording is started."
            : "Meeting recording is stopped."
        }`,
        {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const _handleOnHlsStateChanged = (data) => {
    //
    if (
      meetingModeRef.current === Constants.modes.CONFERENCE && // trigger on conference mode only
      (data.status === Constants.hlsEvents.HLS_STARTED ||
        data.status === Constants.hlsEvents.HLS_STOPPED)
    ) {
      toast(
        `${
          data.status === Constants.hlsEvents.HLS_STARTED
            ? "Meeting HLS is started."
            : "Meeting HLS is stopped."
        }`,
        {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }

    if (data.status === Constants.hlsEvents.HLS_STARTED) {
      setAfterMeetingJoinedHLSState("STARTED");
    }

    if (data.status === Constants.hlsEvents.HLS_STOPPED) {
      setAfterMeetingJoinedHLSState("STOPPED");
    }
  };

  function onParticipantJoined(participant) {
    // Change quality to low, med or high based on resolution
    participant && participant.setQuality("high");
    // console.log(" onParticipantJoined", participant);
  }

  function onEntryResponded(participantId, name) {
    // console.log(" onEntryResponded", participantId, name);
    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (name === "allowed") {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        setTimeout(() => {
          _handleMeetingLeft();
        }, 3000);
      }
    }
  }

  async function onMeetingJoined() {
    // console.log("onMeetingJoined");
    const { changeWebcam, changeMic, muteMic, disableWebcam } =
      mMeetingRef.current;

    if (webcamEnabled && selectedWebcam.id) {
      await new Promise((resolve) => {
        disableWebcam();
        setTimeout(async () => {
          const track = await createCameraVideoTrack({
            optimizationMode: "motion",
            encoderConfig: "h540p_w960p",
            facingMode: "environment",
            cameraId: selectedWebcam.id,
            multiStream: false,
          });
          changeWebcam(track);
          resolve();
        }, 500);
      });
    }

    if (micEnabled && selectedMic.id) {
      await new Promise((resolve) => {
        muteMic();
        setTimeout(() => {
          changeMic(selectedMic.id);
          resolve();
        }, 500);
      });
    }
  }
  function onMeetingLeft() {
    // console.log("onMeetingLeft");
    onMeetingLeave();
  }

  const _handleOnError = (data) => {
    const { code, message } = data;

    const joiningErrCodes = [
      4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010,
    ];

    const isJoiningError = joiningErrCodes.findIndex((c) => c === code) !== -1;
    const isCriticalError = `${code}`.startsWith("500");

    new Audio(
      isCriticalError
        ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
        : `https://static.videosdk.live/prebuilt/notification_err.mp3`
    ).play();

    setMeetingErrorVisible(true);
    setMeetingError({
      code,
      message: isJoiningError ? "Unable to join meeting!" : message,
    });
  };

  const mMeeting = useMeeting({
    onParticipantJoined,
    onEntryResponded,
    onMeetingJoined,
    onMeetingLeft,
    onError: _handleOnError,
    onRecordingStateChanged: _handleOnRecordingStateChanged,
    onHlsStateChanged: _handleOnHlsStateChanged,
  });

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const isPresenting = mMeeting.presenterId ? true : false;

  usePubSub("RAISE_HAND", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName } = data;

      const isLocal = senderId === localParticipantId;

      new Audio(
        `https://static.videosdk.live/prebuilt/notification.mp3`
      ).play();

      toast(`${isLocal ? "You" : nameTructed(senderName, 15)} raised hand 🖐🏼`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      participantRaisedHand(senderId);
    },
  });

  usePubSub("CHAT", {
    onMessageReceived: (data) => {
      const localParticipantId = mMeeting?.localParticipant?.id;

      const { senderId, senderName, message } = data;

      const isLocal = senderId === localParticipantId;

      if (!isLocal) {
        new Audio(
          `https://static.videosdk.live/prebuilt/notification.mp3`
        ).play();

        toast(
          `${trimSnackBarText(
            `${nameTructed(senderName, 15)} says: ${message}`
          )}`,
          {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
    },
  });

  return (
    // <div className="snkk1 fixed inset-0">
    //   <div ref={containerRef} className="snkk2 h-full flex flex-col bg-gray-800">
    <div className="snkk1 inset-0">

      <div className="snkk0"> đây là sp</div>
      <div ref={containerRef} className="snkk2 h-full flex flex-col bg-gray-800">
        {/* <FlyingEmojisOverlay /> */}
        {typeof localParticipantAllowedJoin === "boolean" ? (
          localParticipantAllowedJoin ? (
            <>
              <ModeListner
                setMeetingMode={setMeetingMode}
                meetingMode={meetingMode}
              />
              <PollsListner />

              {mMeeting?.localParticipant?.id && (
                <LocalParticipantListner
                  localParticipantId={mMeeting?.localParticipant?.id}
                  meetingMode={meetingMode}
                />
           
              )}
              {meetingMode === Constants.modes.CONFERENCE &&
                (isMobile || isTab ? (
                  <></>
                ) : (
                  <></>
                  // <div
                  //   style={{
                  //     display: "flex",
                  //     flexDirection: isTab || isMobile ? "" : "column",
                  //     height: topBarHeight,
                  //   }}
                  // >
                  //   {/* <TopBar topBarHeight={topBarHeight} /> */}
                  // </div>
                ))}

              <div className={`snkk3 flex flex-1 flex-row bg-gray-800 `}>
              {/* <div className={`snkk3`}> */}
              {/* <div className={`snkk4`}> */}
                {/* {meetingMode === Constants.modes.CONFERENCE ? ( */}
                  {/* <div className={`snkk6 flex flex-1 `}> */}
                    {/* {isPresenting ? ( */}
                      {/* <PresenterView
                        height={
                          containerHeight - topBarHeight - bottomBarHeight
                        }
                      /> */}
                    {/* ) : null} */}
                    {/* {isPresenting && isMobile ? null : ( */}
                    {/* <div className="chatvsmh"> */}
                  
                      <div className="mh flex flex-1 flex-row bg-gray-800 ">
                      <MemorizedILSParticipantView
                        isPresenting={isPresenting}
                      />
                      </div>
                
                    {/* )} */}
                  {/* </div> */}

                {/* ) : ( */}
                  {/* <HLSContainer
                    {...{
                      width:
                        containerWidth -
                        (isTab || isMobile
                          ? 0
                          : typeof sideBarMode === "string"
                          ? sideBarContainerWidth
                          : 0),
                    }}
                  />  */}
                {/* )} */}
               {/* <div className="snkk5"> */}
                {/* <SidebarConatiner
                  height={
                    meetingMode === Constants.modes.VIEWER
                      ? containerHeight - bottomBarHeight
                      : isMobile || isTab
                      ? containerHeight - bottomBarHeight
                      : containerHeight - topBarHeight - bottomBarHeight
                  }
                  sideBarContainerWidth={sideBarContainerWidth}
                  meetingMode={meetingMode}
                /> */}
               {/* </div> */}
               {/* <div className="chat"> */}
               <div className="chat h-full flex flex-col bg-gray-800">
                <ChatPanel panelHeight={300} />
                </div>

               {/* </div> */}
               </div>



          <div className="snkk5">
              <ILSBottomBar1
                bottomBarHeight={bottomBarHeight}
                setIsMeetingLeft={setIsMeetingLeft}
                selectWebcamDeviceId={selectWebcamDeviceId}
                setSelectWebcamDeviceId={setSelectWebcamDeviceId}
                selectMicDeviceId={selectMicDeviceId}
                setSelectMicDeviceId={setSelectMicDeviceId}
                meetingMode={meetingMode}
              />
     
      </div>
                     

            </>
          ) : (
            <></>
          )
        ) : (
          !mMeeting.isMeetingJoined && <WaitingToJoinScreen />
        )}
        {/* <ConfirmBox
          open={meetingErrorVisible}
          successText="OKAY"
          onSuccess={() => {
            setMeetingErrorVisible(false);
          }}
          title={`Error Code: ${meetingError.code}`}
          subTitle={meetingError.message}
        /> */}

</div>


<div className="snkk678" id="n1">
<div className="snkk6" id="n2">
  <Product img={DUMP.products[0].img}
          star={DUMP.products[0].star}
          title={DUMP.products[0].title}
          inStock={DUMP.products[0].inStock}
          price={DUMP.products[0].price}
          currency={DUMP.products[0].currency}
          />
</div>
<div className="snkk7" id="n3">
  <ViewChart/>
</div>
<div className="snkk8" id="n4">
                   <h1>Sell Product</h1>
      <Bar
      data={{
        labels:['Product1','Product2','Product3','Product4','Product5','Product6'],
        datasets:[{
          label:'Store 1',
          data:[100,200,300,400,500,600],
          backgroundColor:'red',
          barThickness:12
        },
        {
          label:'Store 2',
          data:[321,212,344,332,223,566],
          backgroundColor:'green',
          barThickness:12
        },
        // {
        //   label:'Store 3',
        //   data:[123,200,232,400,232,23],
        //   backgroundColor:'orange',
        //   barThickness:12
        // },
        // {
        //   label:'Store 4',
        //   data:[100,500,300,343,43,343],
        //   backgroundColor:'purple',
        //   barThickness:12
        // },
        ]
      }}
      options={{
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
          xAxes:[
            {
              gridLines:{
              color:'cyan'
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            gridLines:{
              color:'cyan'
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'blue',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
              
            }
          }
          ]
        }
      }}
      >

      </Bar> 
      
      </div>
      
    </div>


</div>


  );
}

import React, { useEffect, useState, createContext, useContext } from 'react';
import { Constants, MeetingProvider } from '@videosdk.live/react-sdk';
import { LeaveScreen } from './Components/Common/Livestream/screens/LeaveScreen';
import { JoiningScreen } from './Components/Common/Livestream/screens/JoiningScreen';
import { ILSContainer } from './Components/Common/Livestream/dependencies/interactive-live-streaming/ILSContainer';
import { MeetingAppProvider } from './Components/Common/Livestream/dependencies/MeetingAppContextDef';
import 'Components/Common/Livestream/dependencies/index.css';
import './App.css';

// import {getAll} from './axios';
const LivestreamContext = createContext(null);
export const useLivestreamContext = () => useContext(LivestreamContext);

const App = ({
  fullScreenContainerRef,
  showPinedProduct,
  isShowPinedProduct,
}) => {
  // process.env.REACT_APP_VIDEOSDK_TOKEN || 
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzIzNzljMi1kNzJkLTQzYzktOGE4MS1lYWJmMDY0OGJlYmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDYwMjE3NSwiZXhwIjoxNjkxMjA2OTc1fQ.8FDboR7_6xtfrmNIEd7jsZD5-x9F-bC8Rm-PWxjrSE0");
  const [meetingId, setMeetingId] = useState('w1g4-2xc1-j3ri');
  const [participantName, setParticipantName] = useState('tony');
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  // const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [meetingMode, setMeetingMode] = useState(Constants.modes.VIEWER);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  // const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingStarted, setMeetingStarted] = useState(true);

  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const isMobile = window.matchMedia(
    'only screen and (max-width: 768px)'
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return 'Are you sure you want to exit?';
      };
    }
  }, [isMobile]);

  return (
    <LivestreamContext.Provider
      value={{ showPinedProduct, isShowPinedProduct }}
    >
      {isMeetingStarted ? (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : 'TestUser',
              mode: meetingMode,
              multiStream: false,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <ILSContainer
              onMeetingLeave={() => {
                setToken('');
                setMeetingId('');
                setParticipantName('');
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
              meetingMode={meetingMode}
              setMeetingMode={setMeetingMode}
              fullScreenContainerRef={fullScreenContainerRef}
              isShowPinedProduct={isShowPinedProduct}
              showPinedProduct={showPinedProduct}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setToken}
          setMicOn={setMicOn}
          micEnabled={micOn}
          webcamEnabled={webcamOn}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          setWebcamOn={setWebcamOn}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
          meetingMode={meetingMode}
          setMeetingMode={setMeetingMode}
        />
      )}
    </LivestreamContext.Provider>
  );
};

export default App;

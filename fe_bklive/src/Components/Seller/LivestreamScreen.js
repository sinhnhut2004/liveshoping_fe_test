import React, { useEffect, useState } from "react";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
// import {LeaveScreen} from "./Components/Livestream/screens/LeaveScreen"
// import { JoiningScreen } from "./Components/Livestream/screens/JoiningScreen";
// import { ILSContainer } from "./Components/Livestream/interactive-live-streaming/ILSContainer";
import { ILSContainer1 } from "./ILSContainer1";
// import { ILSContainer } from "./Components/Livestream_folder/interactive-live-streaming/ILSContainer";

import { MeetingAppProvider } from "../Common/Livestream/dependencies/MeetingAppContextDef";


const LivestreamScreen = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);


  return (
    <>
       <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
    <MeetingProvider
            config={{
              meetingId: "w1g4-2xc1-j3ri",
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              mode: meetingMode,
              multiStream: false,
            }}
            token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3MzIzNzljMi1kNzJkLTQzYzktOGE4MS1lYWJmMDY0OGJlYmIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MDYwMjE3NSwiZXhwIjoxNjkxMjA2OTc1fQ.8FDboR7_6xtfrmNIEd7jsZD5-x9F-bC8Rm-PWxjrSE0"}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
        <ILSContainer1
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
            />
    </MeetingProvider>
    </MeetingAppProvider>
    </>
  );
};

export default LivestreamScreen;

import "./Videosdk.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import ReactPlayer from "react-player";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {RxExit} from 'react-icons/rx';
import {BsFillMicFill} from 'react-icons/bs';
import {CiVideoOn} from 'react-icons/ci';
import {BiMicrophoneOff} from 'react-icons/bi';
import { MdOutlineVoiceChat } from "react-icons/md";



function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
        className="meeting-id-videosdk"
      />
      <button onClick={onClick} className="meeting-btn">
        Join
      </button>
      {" or "}
      <button onClick={onClick} className="meeting-btn">
        Create Meeting
      </button>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
   
      <div className="center-it">
        <div className="meeting-btn-icon">Webcam: {webcamOn ? "ON" : "OFF"}</div>
        <div className="meeting-btn-icon">Mic:{" "}
        {micOn ? "ON" : "OFF"}</div>
      </div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          style={{margin:"auto",padding:"20px"}}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className="controls-meeting">
      <RxExit onClick={() => leave()} className="meeting-icon"/>
        <BsFillMicFill onClick={()=>toggleMic()} className="meeting-icon"/>
        <CiVideoOn onClick={()=>toggleWebcam()} className="meeting-icon"/>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <h3 className="meeting-btn">Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div>
          {[...participants.keys()].map((participantId) => (
              <ParticipantView
              participantId={participantId}
              key={participantId}
              />
              ))}
              <Controls />
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting} className="meeting-btn-alt">Join</button>
      )}
    </div>
  );
}

function Videosdk() {
  const [visible, setVisible] = useState(false);
  const [modalvisible, setModalVisible] = useState(false);

  const [meetingId, setMeetingId] = useState(null);

  //Getting the meeting id by calling the api we just wrote
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setMeetingId(null);
  };
  const footerContent = (
    <div>
      <Button
        label="Okay"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
        style={{ backgroundColor: "black" }}
      />
    </div>
  );
  const show = (position) => {
    setVisible(true);
  };

  return authToken && meetingId ? (
    <Dialog header="Legalease: The VideoChat Solution" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
    <MeetingProvider
      config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "C.V. Raman",
        }}
        token={authToken}
        >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
        </Dialog>
  ) : (
    <>
      <Dialog
        header="Legalease: The VideoChat Solution"
        visible={visible}
        position={"top-right"}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      </Dialog>
      <div onClick={() => show("top-right")}>
        <MdOutlineVoiceChat className="box-dash-icon"/>
      </div>
    </>
    // <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default Videosdk;

import AgoraRTM, { RtmClient, RtmMessage } from "agora-rtm-sdk";
import { useEffect, useRef, useState } from "react";

let USER_ID = Math.floor(Math.random() * 232);
let token;
export default function useAgorachat(client, channelName) {
  const [joinState, setJoinState] = useState(false);
  const [memberId, setMemberId] = useState();
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  let display_name = sessionStorage.getItem("display_name");
  let roomName = sessionStorage.getItem("room_name");
  const [displayName, setDisplayName] = useState(display_name);
  console.log(typeof(displayName));
  console.log(display_name);
  
  console.log(displayName);
  const [membersPaticipate, setMembersPaticipate] = useState([]);
  
  
  const channel = useRef(client.createChannel(channelName)).current;
  const lobbyChannel = useRef(client.createChannel('lobby')).current;

  let leaveChannel = async () => {
    await channel.leave(); 
  }

  window.addEventListener('beforeunload', leaveChannel);
  // useEffect((() => {
   
  //   let display_name = sessionStorage.getItem("display_name");
  //   setDisplayName(display_name);
  // }), [displayName])
  
  //console.log(displayName);
  
  const handleAddMembers = async (memberId) => {
    let {name} = await client.getUserAttributesByKeys(memberId, ['name']);    
    setMembersPaticipate((pre) => ([...pre, { memberId, name}]));  
  }

  const initRm = async () => {
    await client?.login({
      uid: USER_ID.toString(),
      token
    });
    await channel.join();

    try {
      let attributes = await client.getChannelAttributesByKeys(channelName, ['room_name', 'host_id']);
      roomName = attributes.room_name.value;
      let hostId = attributes.host_id.value;
      if(hostId === USER_ID.toString()) {
        setIsHost(true);
        const stream_controls = document.getElementById('stream-controls')
        stream_controls.style.display = 'block'
      }
    } catch (error) {
      await client.setChannelAttributes(channelName, 
        {'room_name': roomName, 
        'host': displayName,
        'host_id': USER_ID.toString(),
      }
        )
      setIsHost(true);
      const stream_controls = document.getElementById('stream-controls')
        stream_controls.style.display = 'block'

    }
    await lobbyChannel.join();
    displayName && await client.setLocalUserAttributes({
          name: displayName,
    });
    
    channel.getMembers()
    .then((data) => {
      for(let item of data) {
        console.log("hahaha");
        
        handleAddMembers(item);
      }
    })
    
    .catch((err) => {console.log(err);
    })
    

  };
  useEffect(() => {
    initRm();
  }, [USER_ID]);

  useEffect(() => {
    const getParticipants = async () => {
      try {
        let participants = await channel.getMembers();
        console.log(participants); 
        if(participants.length <= 1) {
          let lobbyMembers = await lobbyChannel.getMembers();
          for(let i = 0; i < lobbyMembers.length; i++) {
            console.log("hohoHoHO");
            
            await client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, lobbyMembers[i]);
          }
        }
      } catch (error) {
        console.log("hhehehe");  
      }
       
      
    }
    const timer = setTimeout(() => {
      getParticipants();
    }, 2000)
    return () => clearTimeout(timer);
  }, [channel, lobbyChannel])

  useEffect(() => {
    
    async function handleMessageReceived(messageData , uid) {
      //let user = await client.getUserAttributes(uid);
      let data = JSON.parse(messageData.text);
      console.log(data);
      if (messageData.messageType === "TEXT") {
        let newMessageData = { 
          userId: uid, 
          message: data.message,
          displayName: data.displayName
           
        };
        setMessages((pre) => ([...pre, newMessageData]))
      }
    }
    const handleAddMember = async (memberId) => {
      console.log(memberId);
      console.log("listener ....");
      setMemberId(memberId);  
      // const { name } = await client.getUserAttributesByKeys(memberId, ['name']);
          
      // setMembersPaticipate((pre: any) => ([...pre, { memberId, name}]));  
    }
    

    
    const handleUserLeft = async (memberId) => {
      console.log(memberId);
      setMembersPaticipate((pre) => {
        return pre?.filter((item) => item.memberId !== memberId);
        
      })
    }
    const numberOfUser = async (sum) => {
      console.log(sum);
      
    }
    const MessageFromLobby = async (memberId) => {
      console.log("memeber called room");
      let participants = await channel.getMembers();
     
      console.log(participants[0]);
      console.log(USER_ID);
      await client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, memberId);
      if(participants[0] === USER_ID.toString()) {
        let lobbyMembers = await lobbyChannel.getMembers();
        for(let i = 0; i < lobbyMembers.length; i++) {
          
          client.sendMessageToPeer({text: JSON.stringify({'room': channelName, 'type':'room_added'})}, lobbyMembers[i]);
        }
      }
    }

    channel.on("MemberJoined", handleAddMember);
    channel.on("ChannelMessage", handleMessageReceived);
    channel.on("MemberLeft", handleUserLeft);
    channel.on("MemberCountUpdated", numberOfUser);
    lobbyChannel.on("MemberJoined", MessageFromLobby);
    // channel.on("ChannelMessage", async (data, uid) => {
    //   await handleMessageReceived(data, uid);
    // });
    
    return () => {
      channel.off("MemberJoined", handleAddMember);
      channel.off("ChannelMessage", handleMessageReceived);
      channel.off("MemberLeft", handleUserLeft);
      channel.off("MemberCountUpdated", numberOfUser);
      lobbyChannel.off("MemberJoined", MessageFromLobby);

      
    }
  }, [channel, lobbyChannel, client]);

  useEffect(() => {
      const addNewMember = async (memberId) => {
        const { name } = await client.getUserAttributesByKeys(memberId, ['name']);  
        console.log(name);
        
        setMembersPaticipate((pre) => ([...pre, { memberId, name}]));  
      }
      const timeout = setTimeout(() => {
        memberId && addNewMember(memberId);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      }
  }, [memberId])
  
  console.log(membersPaticipate);

  async function sendChannelMessage(text) {
    console.log(text);

    channel
      .sendMessage({ text: JSON.stringify({'message': text, 'displayName': displayName}) })
      .then(() => {
        let newMessageData =  {
          userId: USER_ID,
          message: text,
          displayName: displayName
        }
        setMessages((pre) => ([...pre, newMessageData]))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // useEffect(() => {
  //   if (currentMessage) setMessages([...messages, currentMessage]);
  // }, [currentMessage]);
  
  console.log(messages);
  console.log(membersPaticipate);
  
  
  
  return { messages, sendChannelMessage, membersPaticipate, isHost };
}


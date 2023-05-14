import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
//icon
import AttachFileIcon from "@mui/icons-material/AttachFile";
// image
import avatar from "../../../../assets/img/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Close, EmojiEmotions, Send } from "@mui/icons-material";
// redux state
import { useDispatch, useSelector } from "react-redux";

// Sockets
import Socket from "../../../../sockets/Socket";
import  EmojiPicker from "emoji-picker-react";
import { setMessage } from "../../../../store/action/action";
// import emojis from "emoji-picker-react/dist/data/emojis";

const ChatBox = ({ history, styleClass, chatTo }) => {
  const [chat, setChat] = useState([]);

  useEffect(()=>{
    setChat([])
  },[chatTo])
  // Redux State
  // const {socket} = useSelector(state=>state)
  return (
    <>
      {chatTo ? (
        <Box className={styleClass}>
          {/* header */}
          <Header chatTo={chatTo} />
          {/* header ends */}
          {/* chat display  */}
          <ChatDisplay chatTo={chatTo} chat={chat} setChat={setChat} />
          {/* chat display ends */}
          {/* message display  */}
          <MessageBox chatTo={chatTo} setChat={setChat} />
          {/* message display ends */}
        </Box>
      ) : (
        <Box className="noContent">
          <center>
            <Typography variant="h6" align="center">
              <p>&#128512;</p>
              Please select chat...
            </Typography>
          </center>
        </Box>
      )}
    </>
  );
};

function Header({ chatTo }) {
  const [typing,setTyping] = useState(false)
  
  Socket.Typing(setTyping)
  
  return (
    <Box className="chat-box-header">
      <Box className="chat-box-avatar">
        <img src={chatTo.image || avatar} alt="avatar" />
        <Box className = "chat-box-name">
        <Typography variant="h6">{chatTo.name}</Typography>
        <Typography variant = 'caption'>{typing ? chatTo.name + "is typing..." : "-" }</Typography>
        </Box>
      </Box>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}
function ChatDisplay({ chatTo, chat }) {
  useEffect(() => {}, [chatTo.id]);

  return (
    <Box className="chat-box-display">
      {chat.map((row) => {
        if (row.type === "message")
          return (
            <Box className="chat-box-message">
              <Typography sx={{ width: "fitContent" }} variant="body2">
                {row.message}
              </Typography>
            </Box>
          );
        else
          return (
            <Box className="chat-box-message chat-box-message-right ">
              <Typography sx={{ width: "fitContent" }} variant="body2">
                {row.message}
              </Typography>
            </Box>
          );
      })}
    </Box>
  );
}
function MessageBox({ chatTo, setChat }) {
  const { auth, socket, message } = useSelector((state) => state);

  const [reply, setReply] = useState("");
  const [Attachment, setAttachMent] = useState({
    emoji : false,
    files : false,
  });

  function handleEmojiPanel(){
    setAttachMent({
      emoji : !Attachment.emoji
    })
  }
  
  useEffect(() => {
    // console.log(message)
    if (message.email === chatTo.email) {
      setChat((old) => [...old, message]);
    }
  }, [message]);


//  for typing events 
  function handleKeyPress(e){
    // console.log(true)
    Socket.Send_Typing_Alert(true)
  }
  function handleKeyUp(e){
    // console.log(false)
    Socket.Send_Typing_Alert(false)
  }

  function handleMessage() {
    Socket.Send_Message({
      from: socket.id,
      sender_mail: auth.email,
      to: chatTo.id,
      receiver_email: chatTo.email,
      message: reply,
    });
    setChat((old) => [
      ...old,
      {
        type: "reply",
        message: reply,
      },
    ]);
    setReply("")
  }

  function onEmojiClick(e){
    console.log(e)
    setReply(reply+e.emoji)
  }

  function handleMessageVal(e) {
    setReply(e.target.value);
  }
  return (
    <Box className="chat-box-msg-box">
      {Attachment.emoji && <Box className = 'emoji-wrapper'>
      <EmojiPicker onEmojiClick = {onEmojiClick}/>
      </Box>}
      {/* Attachments */}
      <IconButton>
        {Attachment.emoji ?   <Close
        onClick = {handleEmojiPanel}
        /> : <EmojiEmotions onClick = {handleEmojiPanel} /> }
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      {/* Attachments ends */}
      {/* message field  */}
      <TextField
        fullWidth
        placeholder="Text here..."
        variant="outlined"
        size="small"
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyUp}
        value={reply || ""}
        onChange={handleMessageVal}
      />
      {/* message field ends */}
      <IconButton onClick={handleMessage}>
        <Send />
      </IconButton>
    </Box>
  );
}

export default ChatBox;

import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
//icon
import AttachFileIcon from "@mui/icons-material/AttachFile";
// image
import avatar from "../../../../assets/img/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close, EmojiEmotions, Send } from "@mui/icons-material";
// redux state
import { useDispatch, useSelector } from "react-redux";

// Sockets
import Socket from "../../../../sockets/Socket";
import EmojiPicker from "emoji-picker-react";
import { setAlert, setMessage } from "../../../../store/action/action";
import { getMessage } from "../../../../services/service";

// images
import startChat from '../../../../assets/img/chat/start_chat.svg'
import selectChat from '../../../../assets/img/chat/selectChat.svg'

const ChatBox = ({ styleClass, localState }) => {
  const [chat, setChat] = useState([]);
  // Redux State
  const {auth} = useSelector(state=>state)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(localState.chat)
    if(localState.chat)
    fetchChats()
  },[localState.chat]);

  async function fetchChats(){
    try {
      const res = await getMessage({sender : auth.email,receiver : localState.chat.email});
      if(res.status === 200){
      // console.log(res.data.message)
      setChat(res.data.message)}
    } catch (error) {
      dispatch(setAlert({
        open : true,
        variant : 'error',
        message : 'Facing problem in loading messages !!!',
    }))
    }

  }

  return (
    <>
      {localState.chat ? (
        <Box className={styleClass}>
          {/* header */}
          <Header chatTo={localState.chat} />
          {/* header ends */}
          {/* chat display  */}
          <ChatDisplay auth = {auth} chatTo={localState.chat} chat={chat} setChat={setChat} />
          {/* chat display ends */}
          {/* message display  */}
          <MessageBox chatTo={localState.chat} setChat={setChat} />
          {/* message display ends */}
        </Box>
      ) : (
        <Box className="noContent">
          <img src={selectChat} alt = 'select_chat'/>
            <Typography variant="body1" align="center">
              Please select chat...
            </Typography>
        </Box>
      )}
    </>
  );
};

function Header({ chatTo }) {
  return (
    <Box className="chat-box-header">
      <Box className="chat-box-avatar">
        <Box className="chat-box-header-image">
          <img src={chatTo.image || avatar} alt="avatar" />
        </Box>
        <Box className="chat-box-name">
          <Typography sx={{ fontWeight: 600 }} variant="body1">
            {chatTo.name}
          </Typography>
        </Box>
      </Box>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}
function ChatDisplay({ chatTo, chat, auth }) {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    window.document.getElementById('message-box').scrollTo(0,1000)
  }, [chat,typing]);

  Socket.Typing(setTyping);

  return (
    <Box id = 'message-box' className="chat-box-display">
      {chat.length > 0 ? chat.map((row) => {
        return row.sender_email === auth.email ?
            <Box className="chat-box-message chat-box-message-right">
              <Typography sx={{ width: "fitContent" }} variant="body2">
                {row.message}
              </Typography>
            </Box> :
            <Box className="chat-box-message  ">
              <Typography sx={{ width: "fitContent" }} variant="body2">
                {row.message}
              </Typography>
            </Box>
      }) :
      <Box className="start-chat">
        <img src={startChat} alt = 'startChat'/>
        <Typography variant = 'body1'>Let's start conversation buddy...</Typography>
      </Box>
      }
      {typing && (
        <Box className="chat-box-message">
          <Typography sx={{ width: "fitContent" }} variant="body2">
            {chatTo.name} Is Typing...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
function MessageBox({ chatTo, setChat }) {
  const { auth, socket, message } = useSelector((state) => state);

  const [reply, setReply] = useState("");
  const [Attachment, setAttachMent] = useState({
    emoji: false,
    files: false,
  });

  function handleEmojiPanel() {
    setAttachMent({
      emoji: !Attachment.emoji,
    });
  }

  useEffect(() => {
    // // console.log(message)
    if (message.email === chatTo.email) {
      setChat((old) => [...old, message]);
    }
  }, [message]);

  //  for typing events
  function handleKeyPress(e) {
    // // console.log(true)
    Socket.Send_Typing_Alert(true);
  }
  function handleKeyUp(e) {
    // // console.log(false)
    Socket.Send_Typing_Alert(false);
  }

  function handleMessage() {
    Socket.Send_Message({
      from: socket.id,
      sender_email: auth.email,
      to: chatTo.id,
      receiver_email: chatTo.email,
      message: reply,
    });
    setChat((old) => [
      ...old,
      {
        sender_email: auth.email,
        type: "reply",
        message: reply,
      },
    ]);
    setReply("");
  }

  function onEmojiClick(e) {
    // console.log(e);
    setReply(reply + e.emoji);
  }

  function handleMessageVal(e) {
    setReply(e.target.value);
  }
  return (
    <Box className="chat-box-msg-box">
      {Attachment.emoji && (
        <Box className="emoji-wrapper">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Box>
      )}
      {/* Attachments */}
      <IconButton>
        {Attachment.emoji ? (
          <Close onClick={handleEmojiPanel} />
        ) : (
          <EmojiEmotions onClick={handleEmojiPanel} />
        )}
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

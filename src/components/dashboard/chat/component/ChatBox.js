import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//icon
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";

// image
import avatar from "../../../../assets/img/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close, EmojiEmotions, Send } from "@mui/icons-material";
// redux state
import { useDispatch, useSelector } from "react-redux";

// Sockets
import Socket from "../../../../sockets/Socket";
import EmojiPicker from "emoji-picker-react";
import { setAlert } from "../../../../store/action/action";
import { getMessage, uploadImageForSend } from "../../../../services/service";

// images
import startChat from "../../../../assets/img/chat/start_chat.svg";
import selectChat from "../../../../assets/img/chat/selectChat.svg";
import { useDropzone } from "react-dropzone";

const ChatBox = ({ styleClass, localState }) => {
  const [chat, setChat] = useState([]);
  // Redux State
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(localState.chat)
    if (localState.chat) fetchChats();
  }, [localState.chat]);

  async function fetchChats() {
    try {
      const res = await getMessage({
        sender: auth.email,
        receiver: localState.chat.email,
      });
      if (res.status === 200) {
        // console.log(res.data.message)
        setChat(res.data.message);
      }
    } catch (error) {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Facing problem in loading messages !!!",
        })
      );
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
          <ChatDisplay
            auth={auth}
            chatTo={localState.chat}
            chat={chat}
            setChat={setChat}
          />
          {/* chat display ends */}
          {/* message display  */}
          <MessageBox chatTo={localState.chat} setChat={setChat} />
          {/* message display ends */}
        </Box>
      ) : (
        <Box className="noContent">
          <img src={selectChat} alt="select_chat" />
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
    let box = window.document.getElementById("message-box");
    box.scrollTo(0, box.scrollHeight);
  }, [chat, typing]);

  Socket.Typing(setTyping);

  return (
    <Box id="message-box" className="chat-box-display">
      {console.log(chat)}
      {chat.length > 0 ? (
        chat.map((row) => {
          return row.sender_email === auth.email ? (
            <Box className="chat-box-message chat-box-message-right">
              {row.files &&
                row.files.map((row) => (
                  <Box key = {row}>
                    <a href={row} target="_blank" rel="canonical noreferrer">
                    <img width={"200px"} src={row} alt="file" />
                    </a>
                  </Box>
                ))}
              <Box>
                <Typography sx={{ width: "fitContent" }} variant="body2">
                  {row.message}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box className="chat-box-message ">
              {row.files &&
                row.files.map((row) => (
                  <Box key = {row}>
                    <a href={row} target="_blank" rel="canonical noreferrer">
                      <img width={"200px"} src={row} alt="file" />
                    </a>
                  </Box>
                ))}
              <Box>
                <Typography sx={{ width: "fitContent" }} variant="body2">
                  {row.message}
                </Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <Box className="start-chat">
          <img src={startChat} alt="startChat" />
          <Typography variant="body1">
            Let's start conversation buddy...
          </Typography>
        </Box>
      )}
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
  const { auth, message } = useSelector((state) => state);

  const [reply, setReply] = useState("");
  const [sendFiles, setSendFiles] = useState({
    open: false,
    files: [],
    text: "Shear some files",
  });
  const [Attachment, setAttachMent] = useState({
    emoji: false,
    files: false,
  });

  function handleEmojiPanel() {
    setAttachMent({
      emoji: !Attachment.emoji,
    });
  }

  // for loading the messages and re run the message state update
  useEffect(() => {
    if (message.email === chatTo.email) {
      setChat((old) => [...old, message]);
    }
  }, [message]);

  async function handleMessage() {
    try {
      let FD = new FormData();
      let URLS = [];

      if (sendFiles.files.length > 0) {
        sendFiles.files.map((element) => {
          return FD.append("images", element);
        });
        URLS = await uploadImageForSend(FD);
      }

      Socket.Send_Message({
        sender_email: auth.email,
        receiver_email: chatTo.email,
        message: reply,
        files: URLS.data && URLS.data.status === 200 ? URLS.data.urls : [],
      });

      // set chat for display
      setChat((old) => [
        ...old,
        {
          sender_email: auth.email,
          type: "reply",
          message: reply,
          files: URLS.data && URLS.data.status === 200 ? URLS.data.urls : [],
        },
      ]);

      // reset
      setSendFiles({
        open: false,
        files: [],
        text: "Shear some files",
      });
      setReply("");
    } catch (err) {
      console.log("ERROR >> ", err);
    }
  }

  function onEmojiClick(e) {
    setReply(reply + e.emoji);
  }

  function handleMessageVal(e) {
    setReply(e.target.value);
  }

  //  for typing events
  function handleKeyPress(e) {
    // // console.log(true)
    Socket.Send_Typing_Alert(true);
  }
  function handleKeyUp(e) {
    Socket.Send_Typing_Alert(false);
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
      <Button
        variant="outline"
        component="label"
        startIcon={<AttachFileIcon />}
        onClick={() => setSendFiles({ ...sendFiles, open: true })}
      ></Button>
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
      <SendAttachments
        sendFiles={sendFiles}
        handleMessage={handleMessage}
        setSendFiles={setSendFiles}
      />
      {/* message field ends */}
      <IconButton onClick={handleMessage}>
        <Send />
      </IconButton>
    </Box>
  );
}

function SendAttachments({ sendFiles, setSendFiles, handleMessage }) {
  function handleClose() {
    setSendFiles((old) => {
      return { ...old, open: !old.open };
    });
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={sendFiles.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={sendFiles.open}>
          <Box sx={style}>
            <ImagePreviews sendFiles={sendFiles} setSendFiles={setSendFiles} />
            {sendFiles.files.length > 0 && (
              <Grid sx={{ p: 2 }} spacing={2} container>
                {sendFiles.files.map((img, index) => {
                  return (
                    <>
                      <Grid item xs={2} sx={{ position: "relative" }}>
                        <CancelIcon
                          onClick={() => {
                            // this function is for removing the image from savedImage array
                            let temp = sendFiles.files;
                            // console.log(">>>>>>", temp, files);
                            temp.splice(index, 1);
                            setSendFiles((old) => {
                              return { ...old, files: [...temp] };
                            });
                          }}
                          className="imageCross"
                          color="primary"
                        />
                        <img
                          style={{ width: "100%" }}
                          src={URL.createObjectURL(img)}
                          alt={img.name}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            )}

            <IconButton onClick={handleMessage}>
              <Send />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

function ImagePreviews({ sendFiles, setSendFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setSendFiles((old) => {
        return {
          ...old,
          files: acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        };
      });
    },
  });

  const thumbs = sendFiles.files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="Images"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <section className="container dorpContainer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>{sendFiles.text}</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 50,
  height: 50,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

export default ChatBox;

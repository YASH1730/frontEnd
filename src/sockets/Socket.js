import io from "socket.io-client";
import config from "../config.json";
import { setActiveUser, setMessage, setSocket } from "../store/action/action";

const socket = io.connect(config.Socket_Official_API);

function Send_Message(message) {
  // console.log(message)
  return socket.emit("send_message", message);
}

function Receive_Message(setMessage) {
  socket.on("receive_message", (message) => {
    setMessage(message);
  });
}
function Connect(data) {
  return socket.emit("connect_user", data);
}
function Get_ID(dispatch) {
  return socket.on("receive_id", (id) => {
    dispatch(setSocket(id));
  });
}

function Send_Typing_Alert(data) {
  return socket.emit("is_typing",data);
}

function Typing(setTyping) {
  return socket.on("typing", (typing) => {
     setTyping(typing)  
  });
}

function Log_Out(data) {
  return socket.emit("logout",data)
}



function Notifications(dispatch) {
  return socket.on("receive_notification", (data) => {
    // console.log(data);
    switch (data.type) {
      case "Adding_New_User":
        dispatch(setActiveUser(data.payload));
        break;
        case "User_Logout":
          console.log(data.payload)
          dispatch(setActiveUser(data.payload));
          break;
      case "New_Message":
        dispatch(setMessage(data.payload));
        break;
      case "REFRESH":
        console.log(data.payload);
        dispatch(setActiveUser(data.payload));
        break;
      default:
        return 1;
    }
  });
}

const Socket = {
  Send_Message,
  Connect,
  Get_ID,
  Receive_Message,
  Notifications,
  Typing,
  Send_Typing_Alert,
  Log_Out,
  socket,
};

export default Socket;

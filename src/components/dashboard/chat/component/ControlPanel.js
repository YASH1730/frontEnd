import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// image
import avatar from "../../../../assets/img/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
const ControlPanel = ({ history, styleClass, setChatTo, chatList }) => {
  // chat list
  // const [chatList, setChatList] = useState([
  //   {
  //     lastChat: "Hi how are you.",
  //     name: "Yashwant Sahu",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastTime: "12:30pm",
  //   },
  //   {
  //     lastChat: "Hi how are you.",
  //     name: "Harsh Sahu",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastTime: "12:30pm",
  //   },
  //   {
  //     lastChat: "Hi how are you.",
  //     name: "Nilesh Prajapati",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastTime: "12:30pm",
  //   },
  //   {
  //     lastChat: "Hi how are you.",
  //     name: "Raj Metha",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastTime: "12:30pm",
  //   },
  //   {
  //     name: "Ravi Tak",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastChat: "Hi how are you.",
  //     lastTime: "12:30pm",
  //   },
  //   {
  //     lastChat: "Hi how are you.",
  //     name: "Amar Soni",
  //     image: avatar,
  //     code: "2US2D5",
  //     lastTime: "12:30pm",
  //   },
  // ]);

  const {auth} = useSelector(state=>state)

  return (
    <Box className={styleClass}>
      {/* header */}
      <Header />
      {/* header ends */}
      {/* search box customer */}
      <Search />
      {/* search box list */}
      {/* listing customer */}
      <List auth = {auth} chatList={chatList} setChatTo = {setChatTo} />
      {/* listing customer list */}
    </Box>
  );
};

function Header() {
  return (
    <Box className="control-box-header">
      <img src={avatar} alt="avatar" />
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}

function Search() {
  return (
    <Box className="control-box-search">
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        placeholder="Search..."
        variant="outlined"
      />
    </Box>
  );
}

function List({ chatList, setChatTo, auth }) {
  useEffect(()=>{},[chatList])
  return (
    <Box className="control-box-list">
      {chatList.map((row) => ( auth.email !== row.email &&
        <Box className="control-box-chat-label" onClick = {()=>{
          setChatTo(row)
        }} >
          <img className={row.id ? "control-box-chat-image-online" : "control-box-chat-image-offline" } src={row.image || avatar} alt={"profile"} />
          <Box className="control-box-chat-text">
            <Typography sx={{ fontWeight: 600 }} variant="body1">
              {row.user_name} 
            </Typography>
            {/* <Typography sx = {{ fontWeight : 700, color : row.id ?  "green": 'red'}} variant="body1">{row.id ? "*" : '*'}</Typography> */}
          </Box>
          <Box className="control-box-chat-button">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      
    </Box>
  );
}

export default ControlPanel;

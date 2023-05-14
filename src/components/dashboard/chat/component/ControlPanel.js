import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// image
import avatar from "../../../../assets/img/avatar.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

const ControlPanel = ({ history, styleClass, setChatTo, chatList, setList }) => {

  const { auth } = useSelector((state) => state);

  return (
    <Box className={styleClass}>
      {/* header */}
      <Header auth={auth} setList={setList} />
      {/* header ends */}
      {/* search box customer */}
      <Search />
      {/* search box list */}
      {/* listing customer */}
      <List auth={auth} chatList={chatList} setChatTo={setChatTo} />
      {/* listing customer list */}
    </Box>
  );
};

function Header({ auth, setList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose () {
    setAnchorEl(null);
  };
  function renderList (type){
    setList(old=>({
      list : old.list ,type
    }))
    handleClose()
  }

  return (
    <Box className="control-box-header">
      <Box className="control-box-header-image">
        <img src={avatar} alt="avatar" />
      </Box>
      <Box className="control-box-header-name">
        <Typography sx={{ fontWeight: 700 }} variant="body2">
          {auth.name}
        </Typography>
      </Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <ListMenu renderList = {renderList} setList = {setList} anchorEl={anchorEl} handleClose={handleClose} open={open} />
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
  useEffect(() => {}, [chatList]);
  return (
    <Box className="control-box-list">
      {chatList.list.map(
        (row) =>
          auth.email !== row.email && (
            <Box
              className="control-box-chat-label"
              onClick={() => {
                setChatTo(row);
              }}
            >
              <img
                className={
                  row.id
                    ? "control-box-chat-image-online"
                    : "control-box-chat-image-offline"
                }
                src={row.image || avatar}
                alt={"profile"}
              />
              <Box className="control-box-chat-text">
                <Typography sx={{ fontWeight: 600 }} variant="body2">
                  {row.name}
                </Typography>
                {/* <Typography sx = {{ fontWeight : 700, color : row.id ?  "green": 'red'}} variant="body1">{row.id ? "*" : '*'}</Typography> */}
              </Box>
              <Box className="control-box-chat-button">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          )
      )}
    </Box>
  );
}

function ListMenu({ anchorEl,handleClose, renderList, open }) {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={()=>renderList("customer")}>List Customer</MenuItem>
        <MenuItem onClick={()=>renderList("team")}>List Team</MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}

export default ControlPanel;

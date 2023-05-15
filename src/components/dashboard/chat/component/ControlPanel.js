import {
  Box,
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

const ControlPanel = ({ styleClass, setChatTo, localState, setList, setState }) => {

  const { auth } = useSelector((state) => state);

  return (
    <Box className={styleClass}>
      {/* header */}
      <Header auth={auth} setList={setList} setState={setState}  localState = {localState}/>
      {/* header ends */}
      {/* search box customer */}
      <Search />
      {/* search box list */}
      {/* listing customer */}
      <List auth={auth} localState={localState} setState = {setState} setChatTo={setChatTo} />
      {/* listing customer list */}
    </Box>
  );
};

function Header({ auth,setState }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose () {
    setAnchorEl(null);
  };
  function renderList (type){
    setState({type : "Set_List_Type",
    payload : {type}
  })
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
      <ListMenu renderList = {renderList}  anchorEl={anchorEl} handleClose={handleClose} open={open} />
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

function List({auth, setState, localState }) {
  useEffect(() => {}, [localState]);
  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event,i) => {
    setAnchorEl(old=>({
      ...old,
      [i] : event.currentTarget
    }));
  };
  function handleClose (i) {
    setAnchorEl(old=>({...old,
      [i] : null
    }));
  };
  function renderDetails (email,i){
    setState({
      type : 'Set_Search',
      payload : {
        showCusDetails : true,
        searchEmail : email,
      }
    })
    handleClose(i)
  }
  function handleChat(row){
    setState({
      type : "Set_Chat",
      payload : {
        chat : row
      }
    })
  }
  return (
    <Box className="control-box-list">
      {localState.list.map(
        (row,i) =>
          auth.email !== row.email && (
            <Box
            onClick = {()=>handleChat(row)}
              className="control-box-chat-label"
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
              <Box
              className="control-box-chat-text">
                <Typography sx={{ fontWeight: 600 }} variant="body2">
                  {row.name}
                </Typography>
                {/* <Typography sx = {{ fontWeight : 700, color : row.id ?  "green": 'red'}} variant="body1">{row.id ? "*" : '*'}</Typography> */}
              </Box>
              <Box className="control-box-chat-button">
                <IconButton onClick={(e)=>handleClick(e,i)} >
                  <MoreVertIcon />
                </IconButton>
              </Box>
              {/* // customer menu */}
              <CustomerProfileMenu  index = {i} cusEmail = {row.email}  renderDetails = {renderDetails} setState = {setState} anchorEl={anchorEl} handleClose={handleClose} 
              />
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

function CustomerProfileMenu({index, anchorEl,handleClose, renderDetails,cusEmail}) {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl[index]}
        open={Boolean(anchorEl[index])}
        onClose={()=>handleClose(index)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={()=>renderDetails(cusEmail,index)}>Customer Details</MenuItem>
        {/* <MenuItem onClick={()=>renderList("team")}>List Team</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}

export default ControlPanel;

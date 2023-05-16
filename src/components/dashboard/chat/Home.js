import { Box } from "@mui/material";
import React, { useReducer, useState, useEffect } from "react";
// chat css
import "../../../assets/custom/css/chat.css";
// component
import ChatBox from "./component/ChatBox";
import ControlPanel from "./component/ControlPanel";
import CustomerDetails from "./component/CustomerDetails";
//APIs
import {
  getCustomer,
  getTeam,
  getCustomerByEmail,
} from "../../../services/service.js";
import { useSelector } from "react-redux";

const Home = ({ history }) => {
  const { socket } = useSelector((state) => state);

  const initialState = {
    showCusDetails: false,
    searchEmail: null,
    cusData: null,
    list: [],
    type: "team",
    chat : null
  };

  const [localState, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUsers();
  }, [socket.active_user, localState.type]);

  useEffect(() => {
    if (localState.searchEmail) fetchCustomerDetails();
  }, [localState.searchEmail]);

  async function fetchCustomerDetails() {
    let res = await getCustomerByEmail(localState.searchEmail);

    if (res.status === 200 && res.data.data.length > 0) {
      setState({
        type: "Set_Customer_Details",
        payload: {
          cusData: res.data.data[0],
        },
      });
    } else {
      setState({
        type: "Set_Customer_Details",
        payload: {
          cusData: null,
        },
      });
    }
  }

  async function fetchUsers() {
    const res =
      localState.type === "customer" ? await getCustomer() : await getTeam();
    if (res.status === 200) {
      let active_user = socket.active_user.map((row) => row.email);
      const active_user_id = socket.active_user.map((row) => row.id);

      active_user = res.data.map((row) => {
        if (active_user.includes(row.email)) {
          row.id = active_user_id[active_user.indexOf(row.email)];
        }

        return row;
      });

      setState({type : "Set_User_List",
      payload : {
        list: active_user,
      }});
    }
  }

  return (
    <Box className="chat-box-container">
      <ControlPanel
        localState={localState}
        setState={setState}
        styleClass={"control-panel"}
      />
      <ChatBox history={history} localState={localState} styleClass={"chat-box"} />
      {/* Customer details */}
      {(localState.showCusDetails && localState.type !== 'team' ) && <CustomerDetails localState={localState} />}
      {/* Customer details ends */}
    </Box>
  );
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "Set_Search":
      return (state = { ...state, ...action.payload });
    case "Set_Customer_Details":
      return (state = { ...state, ...action.payload });
    case "Set_List_Type":
      return (state = { ...state, ...action.payload });
    case "Set_User_List":
      return (state = { ...state, ...action.payload });
    case "Set_Chat":
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
}

export default Home;

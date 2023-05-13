import { Box } from '@mui/material';
import React, { useState , useEffect} from 'react';
// chat css
import '../../../assets/custom/css/chat.css'
// component
import ChatBox from  './component/ChatBox'
import ControlPanel from  './component/ControlPanel'
//APIs 
import {listUser} from '../../../services/service.js'
import { useSelector } from 'react-redux';

const Home = ({history}) => {
  const {socket,auth} = useSelector(state=>state)

  const [chatTo,setChatTo] = useState(null);
  const [chatList,setUser] = useState([]);

  useEffect(()=>{
    fetchUsers()
  },[socket.active_user])

  async function fetchUsers(){
    const res = await listUser(); 
    if(res.status === 200)
    {
      let active_user = socket.active_user.map(row=>row.email)
      const active_user_id = socket.active_user.map(row=>row.id)

      active_user = res.data.map(row=>{
        if(active_user.includes(row.email))
        {
          row.id = active_user_id[active_user.indexOf(row.email)]
        }

        return row
      })

      
      setUser(active_user);
    }
  }


    return (
        <Box className ='chat-box-container'>
                <ControlPanel history = {history} setChatTo = {setChatTo} chatList = {chatList} styleClass = {"control-panel"}/>
                <ChatBox history = {history} chatTo = {chatTo} styleClass = {"chat-box"} />
        </Box>
    );
}

export default Home;
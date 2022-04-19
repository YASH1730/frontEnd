import axios from 'axios';
// require('dotenv').config();


const loacalBaseUrl = 'http://localhost:8000'

export const addCategory = (data)=>{
    axios.post(`${loacalBaseUrl}/addCategory`,data,{headers: { 
        'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
     }}).then((response)=>{

        console.log(response)

     }).catch((err)=>{
        console.log(err)
     })

}
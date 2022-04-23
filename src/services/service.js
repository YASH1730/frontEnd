import axios from 'axios';
// require('dotenv').config();


const loacalBaseUrl = 'http://localhost:8000'


// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list 
export const addCategory = async(data)=>{
  return await axios.post(`${loacalBaseUrl}/addCategory`,data,{headers: { 
        'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
     }})

}

// for list of category
export const categoryList = async(data) =>{
   return await axios.get(`${loacalBaseUrl}/listCategory`,{headers: { 
      'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
   }})
}

// for update the category
export const editCategory = async(data) =>{
   // console.log(data.ID)
   return await axios.patch(`${loacalBaseUrl}/editCategory/?ID=${data.ID}`,data,{headers: { 
      'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
   }})
}

// for delete the category
export const deleteCategory = async(data) =>{
   console.log(data)
   return await axios.delete(`${loacalBaseUrl}/deleteCategory/?ID=${data}`,{headers: { 
      'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
   }})
}

// =========================== CURD FOR PRODUCTS  ===========================


// for  adding category to the list 

export const addProduct = async(data)=>{
   return await axios.post(`${loacalBaseUrl}/addProducts`,data,{headers: { 
         'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
      }})
 
 }

 // for getting the last product 

 export const getLastProduct = async()=>{
   return await axios.get(`${loacalBaseUrl}/getLastProduct`,{headers: { 
      'Authorization' : `Bearer ${process.env.REACT_APP_API_Token}`
   }})
 }
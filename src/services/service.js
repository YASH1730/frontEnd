import axios from 'axios';


const loacalBaseUrl = 'http://localhost:8000';


//  login 

export const login = async(data)=>{
   return await axios.post(`${loacalBaseUrl}/login`,data)
  }
 


// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list 
export const addCategory = async(data)=>{
  return await axios.post(`${loacalBaseUrl}/addCategory`,data,{headers: { 
        'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
     }})

}

// for list of category
export const categoryList = async(data) =>{
   return await axios.get(`${loacalBaseUrl}/listCategory`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the category
export const editCategory = async(data) =>{
   // console.log(data.ID)
   return await axios.patch(`${loacalBaseUrl}/editCategory/?ID=${data.ID}`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for delete the category
export const deleteCategory = async(data) =>{
   console.log(data)
   return await axios.delete(`${loacalBaseUrl}/deleteCategory/?ID=${data}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for status the category
export const statusCategory = async(data) =>{
   
   return await axios.post(`${loacalBaseUrl}/changeStatusCategory`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// =========================== CURD FOR PRODUCTS  ===========================


// for  adding category to the list 

export const addProduct = async(data)=>{
   
   return await axios.post(`${loacalBaseUrl}/addProducts`,data,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the products

export const getListProduct = async()=>{
   return await axios.get(`${loacalBaseUrl}/getListProduct`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for deleting the product 

export const deleteProduct = async (ID) => {
   return await axios.delete(`${loacalBaseUrl}/deleteProduct/?ID=${ID}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the product 

export const updateProduct = async (data) => { 
   return await axios.patch(`${loacalBaseUrl}/updateProduct`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


 // for getting the last product 

 export const getLastProduct = async()=>{
   return await axios.get(`${loacalBaseUrl}/getLastProduct`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
 }


//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addBanner`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list banner

export const listBanner = async ()=>{
   return await axios.get(`${loacalBaseUrl}/listBanner`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change status banner

export const chaneStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/chaneStatusBanner`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addSubCategories`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}



// list subcategories

export const getSubCatagories = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getSubCatagories`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const changeSubSatatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeSubStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  subcategories

export const editSubCatagories = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editSubCatagories`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addPrimaryMaterial`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// // list getPrimaryMaterial

export const getPrimaryMaterial = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getPrimaryMaterial`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changePrimaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// // change status  subcategories

export const editPrimaryMaterial = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editPrimaryMaterial`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addSecondaryMaterial`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// // list getSecondaryMaterial

export const getSecondaryMaterial = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getSecondaryMaterial`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeSecondaryMaterialStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// // change editSecondaryMaterial

export const editSecondaryMaterial = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editSecondaryMaterial`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Polish ========================

export const addPolish = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addPolish`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getSecondaryMaterial

export const getPolish = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getPolish`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changePolishStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editPolish = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editPolish`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addHinge`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHinge = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getHinge`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHingeStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeHingeStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHinge = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editHinge`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addFitting`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getFitting = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getFitting`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeFittingStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeFittingStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editFitting = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editFitting`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Knob ========================

export const addKnob = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addKnob`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getKnob = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getKnob`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeKnobStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeKnobStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editKnob = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editKnob`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
//  =========================== CURD For  Door ========================

export const addDoor = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addDoor`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getDoor = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getDoor`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeDoorStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeDoorStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editDoor = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editDoor`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

//  =========================== CURD For Handle ========================

export const addHandle = async (data)=>{
   return await axios.post(`${loacalBaseUrl}/addHandle`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list getHinge

export const getHandle = async ()=>{
   return await axios.get(`${loacalBaseUrl}/getHandle`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}
// change status  changeHingeStatus

export const changeHandleStatus = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/changeHandleStatus`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change editPolish

export const editHandle = async (data)=>{
   return await axios.patch(`${loacalBaseUrl}/editHandle`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


// =============== CURD of Gallaery ======================

// change status  changeHingeStatus

export const getGallery = async (data)=>{
   return await axios.get(`${loacalBaseUrl}/getGallery/?SKU=${data}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`}})
      
   }
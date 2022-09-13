
import axios from "axios";


const localURL = "http://localhost:8000/api";
const official = "http://157.245.102.136/api";

//  login

export const login = async (data) => {
  return await axios.post(`${localURL}/login`, data);
};

// =========================== CURD FOR Cetagory ===========================

// for  adding category to the list
export const addCategory = async (data) => {
  return await axios.post(`${localURL}/addCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for list of category
export const categoryList = async (data) => {
  return await axios.get(`${localURL}/listCategory`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the category
export const editCategory = async (data) => {
  // console.log(data.ID)
  return await axios.patch(`${localURL}/editCategory/?ID=${data.ID}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for delete the category
export const deleteCategory = async (data) => {
  console.log(data);
  return await axios.delete(`${localURL}/deleteCategory/?ID=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for status the category
export const statusCategory = async (data) => {
  return await axios.post(`${localURL}/changeStatusCategory`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR PRODUCTS  ===========================

// for  adding category to the list

export const addProduct = async (data) => {
  return await axios.post(`${localURL}/addProducts`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for listing the products

export const getListProduct = async () => {
  return await axios.get(`${localURL}/getListProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for deleting the product

export const deleteProduct = async (ID) => {
  return await axios.delete(`${localURL}/deleteProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the product

export const updateProduct = async (data) => {
  return await axios.patch(`${localURL}/updateProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last product

export const getLastProduct = async () => {
  return await axios.get(`${localURL}/getLastProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last product

export const getPresentSKUs = async () => {
  return await axios.get(`${localURL}/getPresentSKUs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Bannner ========================

// add banner

export const addBanner = async (data) => {
  return await axios.post(`${localURL}/addBanner`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list banner

export const listBanner = async () => {
  return await axios.get(`${localURL}/listBanner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change status banner

export const changeStatus = async (data) => {
  return await axios.patch(`${localURL}/changeStatusBanner`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Sub Categories ========================

export const addSubCategories = async (data) => {
  return await axios.post(`${localURL}/addSubCategories`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list subcategories

export const getSubCatagories = async () => {
  return await axios.get(`${localURL}/getSubCatagories`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  subcategories

export const changeSubSatatus = async (data) => {
  return await axios.patch(`${localURL}/changeSubStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  subcategories

export const editSubCatagories = async (data) => {
  return await axios.patch(`${localURL}/editSubCatagories`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Primary Material ========================

export const addPrimaryMaterial = async (data) => {
  return await axios.post(`${localURL}/addPrimaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// // list getPrimaryMaterial

export const getPrimaryMaterial = async () => {
  return await axios.get(`${localURL}/getPrimaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePrimaryMaterialStatus = async (data) => {
  return await axios.patch(`${localURL}/changePrimaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// // change status  subcategories

export const editPrimaryMaterial = async (data) => {
  return await axios.patch(`${localURL}/editPrimaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Secondary Material ========================

export const addSecondaryMaterial = async (data) => {
  return await axios.post(`${localURL}/addSecondaryMaterial`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// // list getSecondaryMaterial

export const getSecondaryMaterial = async () => {
  return await axios.get(`${localURL}/getSecondaryMaterial`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changeSecondaryMaterialStatus = async (data) => {
  return await axios.patch(`${localURL}/changeSecondaryMaterialStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// // change editSecondaryMaterial

export const editSecondaryMaterial = async (data) => {
  return await axios.patch(`${localURL}/editSecondaryMaterial`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Polish ========================

export const addPolish = async (data) => {
  return await axios.post(`${localURL}/addPolish`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getSecondaryMaterial

export const getPolish = async () => {
  return await axios.get(`${localURL}/getPolish`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changePrimaryMaterialStatus

export const changePolishStatus = async (data) => {
  return await axios.patch(`${localURL}/changePolishStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editPolish = async (data) => {
  return await axios.patch(`${localURL}/editPolish`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For  Hinge ========================

export const addHinge = async (data) => {
  return await axios.post(`${localURL}/addHinge`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getHinge = async () => {
  return await axios.get(`${localURL}/getHinge`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHingeStatus = async (data) => {
  return await axios.patch(`${localURL}/changeHingeStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editHinge = async (data) => {
  return await axios.patch(`${localURL}/editHinge`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Hinge ========================

export const addFitting = async (data) => {
  return await axios.post(`${localURL}/addFitting`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getFitting = async () => {
  return await axios.get(`${localURL}/getFitting`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeFittingStatus = async (data) => {
  return await axios.patch(`${localURL}/changeFittingStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editFitting = async (data) => {
  return await axios.patch(`${localURL}/editFitting`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Knob ========================

export const addKnob = async (data) => {
  return await axios.post(`${localURL}/addKnob`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getKnob = async () => {
  return await axios.get(`${localURL}/getKnob`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeKnobStatus = async (data) => {
  return await axios.patch(`${localURL}/changeKnobStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editKnob = async (data) => {
  return await axios.patch(`${localURL}/editKnob`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  =========================== CURD For  Door ========================

export const addDoor = async (data) => {
  return await axios.post(`${localURL}/addDoor`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getDoor = async () => {
  return await axios.get(`${localURL}/getDoor`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeDoorStatus = async (data) => {
  return await axios.patch(`${localURL}/changeDoorStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editDoor = async (data) => {
  return await axios.patch(`${localURL}/editDoor`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

//  =========================== CURD For Handle ========================

export const addHandle = async (data) => {
  return await axios.post(`${localURL}/addHandle`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list getHinge

export const getHandle = async () => {
  return await axios.get(`${localURL}/getHandle`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// change status  changeHingeStatus

export const changeHandleStatus = async (data) => {
  return await axios.patch(`${localURL}/changeHandleStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change editPolish

export const editHandle = async (data) => {
  return await axios.patch(`${localURL}/editHandle`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =============== CURD of Gallaery ======================

// get gallery

export const getGallery = async (data) => {
  return await axios.get(`${localURL}/getGallery/?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// delete image

export const deleteImage = async (data) => {
  return await axios.delete(
    `${localURL}/deleteImage/?SKU=${data.SKU}&imageIndex=${data.imageIndex}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
      },
    }
  );
};

// updateImage

export const updateImage = async (data) => {
  return await axios.patch(`${localURL}/updateImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// addImage

export const addImage = async (data) => {
  return await axios.post(`${localURL}/addImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =============== CURD of Blog ======================

// addImage

export const uploadImage = async (data) => {
  return await axios.post(`${localURL}/uploadImage`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// createBlog

export const createBlog = async (data) => {
  return await axios.post(`${localURL}/createBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// getBlogHome

export const getBlogHome = async () => {
  return await axios.get(`${localURL}/getBlogHome`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// getBlog description

export const getBlog = async (data) => {
  return await axios.get(`${localURL}/getBlog?uuid=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// deleteBLog

export const deleteBLog = async (data) => {
  return await axios.delete(`${localURL}/deleteBLog?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// updateBlog

export const updateBlog = async (data) => {
  return await axios.patch(`${localURL}/updateBlog`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Draft ==========================

export const getDraft = async () => {
  return await axios.get(`${localURL}/getDraft`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeProductStatus = async (data) => {
  return await axios.patch(`${localURL}/changeProductStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const updateBulk = async (data) => {
  console.log(data)
  return await axios.post(`${localURL}/updateBulk`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Fabric ==========================

export const addFabric = async (data) => {
  return await axios.post(`${localURL}/addFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const editFabric = async (data) => {
  return await axios.patch(`${localURL}/editFabric`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const getFabric = async () => {
  return await axios.get(`${localURL}/getFabric`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeFabricStatus = async (data) => {
  return await axios.patch(`${localURL}/changeFabricStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const deleteFabric = async (data) => {
  return await axios.delete(`${localURL}/deleteFabric?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================== CURD for Textile ==========================

export const addTextile = async (data) => {
  return await axios.post(`${localURL}/addTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const editTextile = async (data) => {
  return await axios.patch(`${localURL}/editTextile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const getTextile = async () => {
  return await axios.get(`${localURL}/getTextile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const changeTextileStatus = async (data) => {
  return await axios.patch(`${localURL}/changeTextileStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

export const deleteTextile = async (data) => {
  return await axios.delete(`${localURL}/deleteTextile?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR MERGE PRODUCTS  ===========================

// for  adding category to the list

export const addMergeProduct = async (data) => {
  return await axios.post(`${localURL}/addMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for listing the MergeProducts

export const getListMergeProduct = async () => {
  return await axios.get(`${localURL}/getListMergeProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for deleting the MergeProduct

export const deleteMergeProduct = async (ID) => {
  return await axios.delete(`${localURL}/deleteMergeProduct/?ID=${ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for update the MergeProduct

export const updateMergeProduct = async (data) => {
  return await axios.patch(`${localURL}/updateMergeProduct`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for getting the last MergeProduct

export const getLastMergeProduct = async () => {
  return await axios.get(`${localURL}/getLastMergeProduct`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR Order PRODUCTS  ===========================

// for  adding order to the list

export const addOrder = async (data) => {
  return await axios.post(`${localURL}/placeOrder`,data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for  adding category to the list

export const getOrder = async () => {
  return await axios.get(`${localURL}/listOrders`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change status 
export const changeOrderStatus = async (data) => {
  return await axios.post(`${localURL}/changeOrderStatus`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// order ID at last
export const getLastOrder = async () => {
  return await axios.get(`${localURL}/getLastOrder`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// =========================== CURD FOR Customer  ===========================

// for  list customer to the list

export const listCustomer = async () => {
  return await axios.get(`${localURL}/listCustomer`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for  list customer to the list

export const deleteCustomer = async () => {
  return await axios.delete(`${localURL}/deleteCustomer`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// change add Customer 
export const addCustomer = async (data) => {
  return await axios.post(`${localURL}/addCustomer`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
//  add Customer 
export const updateCustomer = async (data) => {
  return await axios.patch(`${localURL}/updateCustomer`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// Catalog Customer 
export const customerCatalog = async () => {
  return await axios.get(`${localURL}/customerCatalog`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// ================= CURD for Stock =========================

// add stock 
export const addStock = async (data) => {
  return await axios.post(`${localURL}/addStock`,data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
// update stock 
export const updateStock = async (data) => {
  return await axios.patch(`${localURL}/updateStock`,data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list stock 
export const listStock = async () => {
  return await axios.get(`${localURL}/listStock`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// list stock 
export const preview = async (data) => {
  return await axios.get(`${localURL}/preview?SKU=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// delete stock 
export const deleteStock = async (data) => {
  return await axios.delete(`${localURL}/deleteStock?_id=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

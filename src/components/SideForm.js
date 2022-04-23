import React, { useState, useContext, useRef } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import {Editor} from '@tinymce/tinymce-react'
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode, Notify } from "../App";

// service 
import { addCategory, editCategory, addProduct, getLastProduct } from '../services/service.js'


const Sideform = () => {




  const post = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "CEO",
      label: "CEO",
    },
    {
      value: "Driver",
      label: "Driver",
    },
    {
      value: "Delivery Person",
      label: "Delivery Person",
    },
    {
      value: "Manager",
      label: "Manager",
    },
    {
      value: "Security Gaurd",
      label: "Security Gaurd",
    },
  ];

  const category = [
    {
      value: "Grocery",
      label: "Grocery",
    },
    {
      value: "Foods",
      label: "Foods",
    },
    {
      value: "Cloths",
      label: "Cloths",
    },
    {
      value: "Health Care",
      label: "Health Care",
    },
    {
      value: "Medicine",
      label: "Medicine",
    },
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Bags",
      label: "Bags",
    },
    {
      value: "Sports & Fitness",
      label: "Sports & Fitness",
    },
    {
      value: "Home Accessories",
      label: "Home Accessories",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
  ];

  const subCategory = [
    {
      value: "Grocery",
      label: "Grocery",
    },
    {
      value: "Foods",
      label: "Foods",
    },
    {
      value: "Cloths",
      label: "Cloths",
    },
    {
      value: "Health Care",
      label: "Health Care",
    },
    {
      value: "Medicine",
      label: "Medicine",
    },
    {
      value: "Books",
      label: "Books",
    },
    {
      value: "Bags",
      label: "Bags",
    },
    {
      value: "Sports & Fitness",
      label: "Sports & Fitness",
    },
    {
      value: "Home Accessories",
      label: "Home Accessories",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
  ];

//   ﻿3 to 5 Days
// ﻿5 to 8 Days
// 1 to 2 Week
// ﻿2 to 3 Week
// ﻿3 to 4 Week
// ﻿4 to 5 Week
// ﻿5 to 6 Week
// ﻿6 to 7 Week


  const dispatchTimeCatalog = [
    {
      value: "3 to 5 Days",
      label: "3 to 5 Days",
    },
    {
      value: "5 to 8 Days",
      label: "5 to 8 Days",
    },
    {
      value: "1 to 2 Week",
      label: "1 to 2 Week",
    },
    {
      value: "2 to 3 Week",
      label: "2 to 3 Week",
    },
    {
      value: "3 to 4 Week",
      label: "3 to 4 Week",
    },
    {
      value: "4 to 5 Week",
      label: "4 to 5 Week",
    },
    {
      value: "5 to 6 Week",
      label: "5 to 6 Week",
    },
    {
      value: "6 to 7 Week",
      label: "6 to 7 Week",
    }
  ];
  

  const taxRateCatalog = [
    {
      value: "18",
      label: "18",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "2",
      label: "2",
    }
  
  ];
  
  const fittingCatalog = [
    {
      value: "Brass",
      label: "Brass",
    },
    {
      value: "Metallic",
      label: "Metallic",
    },
    {
      value: "Silver",
      label: "Silver",
    }
  
  ];
  


  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);



  // states
  const [cat, setCat] = useState("catagory");
  const [subCat, setSubCat] = useState("subCatagory");
  const [dispatchTime, setDispatch] = useState("Dispatch Time");
  const [taxRate, setTaxRate] = useState("Dispatch Time");
  const [fitting, setFitting] = useState("Fitting");
  const [SKU,setSKU] = useState('');


  // ref
  const editorRef = useRef()

  const handleChange = (event) => {
    setCat(event.target.value);
  };
  const handleChangeSubCat = (event) => {
    setSubCat(event.target.value);
  };
 
  const handleChangeDispatchTime = (event) => {
    setDispatch(event.target.value);
  };
 
  const handleChangeTaxRate = (event) => {
    setTaxRate(event.target.value);
  };

  const handleChangeFitting = (event) => {
    setFitting(event.target.value);
  };

  const handelClose = () => {
    SideBox.setOpen({ state: false, formType: null });
    resetAll();
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // function for genrating product SKU ID

const getSKU = () => {

  getLastProduct()
  .then((res)=>{
    if(res.data.length > 0)
    {
      // console.log(res.data[0].SKU)
      
      let index = parseInt(res.data[0].SKU.split('-')[1]) + 1;

      setSKU(`WS-0${index}`);
    }
    else {
      setSKU('WS-01001')
    }
  })
  .catch((err)=>{
    console.log(err)
  })

}



  // function for handling category
  const handelCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('category_image', acceptedFiles[0], acceptedFiles[0].name);
    FD.append('category_name', e.target.category_name.value)
    FD.append('category_sub_name', e.target.category_sub_name.value)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)

    

    const res = addCategory(FD)

    res.then((data)=>{
      console.log(data)
      dispatchAlert.setNote({
        open : true,
        variant : 'success',
        message : data.data.message
  
      })
    })
    .catch((err)=>{
      console.log(err)
      dispatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "May be duplicate Category found !!!"
  
      })
    })
 


  }

  // function for handling update category
  const handelUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    console.log(acceptedFiles,e.target.category_name.value)
    
    FD.append('_id', SideBox.open.payload)
    acceptedFiles.length !== 0 ? FD.append('category_image', acceptedFiles[0], acceptedFiles[0].name) : console.log() ;
    e.target.category_name.value !== 'category' ? FD.append('category_name', e.target.category_name.value) : console.log() ;
    e.target.sub_category_name.value !== undefined ? FD.append('sub_category_name', e.target.sub_category_name.value) : console.log() ;



    const res = editCategory(FD)

    res.then((data)=>{
      console.log(data)
      dispatchAlert.setNote({
        open : true,
        variant : 'success',
        message : data.data.message
  
      })
    })
    .catch((err)=>{
      console.log(err)
      dispatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "May be duplicate Category found !!!"
  
      })
    })
  }

  // function fo reseting the values

  const resetAll = ()=>{
    document.getElementById('myForm').reset();
  }

  // function for handling Products category
  const handelProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    // console.log(acceptedFiles,
    //   e.target.category_name.value,
    //   e.target.sub_category_name.value,
    //   e.target.dispatch_time.value,
    //   e.target.product_title.value,
    //   e.target.SKU.value,
    //   e.target.MRP.value,
    //   e.target.seo_title.value,
    //   e.target.seo_description.value,
    //   e.target.discount_limit.value,
    //   e.target.blog_url.value,
    //   e.target.selling_price.value)
      
      
    // FD.append('_id', SideBox.open.payload)
     FD.append('product_image', acceptedFiles[0], acceptedFiles[0].name) ;
     FD.append('category_name', e.target.category_name.value) ;
     FD.append('sub_category_name', e.target.sub_category_name.value);
     FD.append('dispatch_time', e.target.dispatch_time.value) ;
     FD.append('product_title', e.target.product_title.value) ;
     FD.append('product_description', editorRef.current.getContent()) ;
     FD.append('SKU', e.target.SKU.value) ;
     FD.append('MRP', e.target.MRP.value) ;
     FD.append('seo_title', e.target.seo_title.value) ;
     FD.append('seo_description', e.target.seo_description.value) ;
     FD.append('discount_limit', e.target.discount_limit.value) ;
     FD.append('selling_price', e.target.selling_price.value) ;

    


    // const res = addProduct(FD)

    // res.then((data)=>{
    //   console.log(data)

    //   if(data.status !== 203)
    //   {
    //     dispatchAlert.setNote({
    //       open : true,
    //       variant : 'success',
    //       message : data.data.message
    
    //     })
    //   }
    //   else {

    //     dispatchAlert.setNote({
    //       open : true,
    //       variant : 'error',
    //       message : data.data.message
    
    //     })
    //   }

    // })
    // .catch((err)=>{
    //   console.log(err)
    //   dispatchAlert.setNote({
    //     open : true,
    //     variant : 'error',
    //     message : "May be duplicate Category found !!!"
  
    //   })
    // })
  }

  return (
    <>
      <Slide
        direction="left"
        in={SideBox.open.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={SideBox.open.state}
        //   onClick={handelClose}
        >
          <Box className={viewMode.mode === true ? "mainDarkContainer" : "mainContainer"}>
            <IconButton
              onClick={handelClose}
              color="primary"
              className="crossButton"
            >
              <CancelIcon />
            </IconButton>

            {/* add Products */}

            {SideBox.open.formType === "product" && (
              
              <Grid container p={5}>
                {getSKU()}
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Product
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product product and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id = 'myForm' onSubmit={handelProduct} enctype='multipart/form-data' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input type='file' {...getInputProps()} name='product_image' />
                        <p>
                          Drag & drop some product images here, or click to
                          select image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                   

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_name'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='sub_category_name'
                      label="Sub Category"
                      value={subCat}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="SKU"
                      type="text"
                      value = {SKU}
                      disabled
                      variant="outlined"
                      name = 'SKU'
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Product Title"
                      type="text"
                      variant="outlined"
                      name = "product_title"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Title"
                      type="text"
                      variant="outlined"
                      name = 'seo_title'
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="SEO Description"
                      type="text"
                      variant="outlined"
                      name = 'seo_description'
                    />

          

                    <br></br>
          {/* product description  */}
                    <Editor
                    apiKey= "nrxcqobhboeugucjonpg61xo1m65hn8qjxwayuhvqfjzb6j4"
                    initialValue="<p>Wirte some product disceription !!!</p>"
                    onInit = {(event,editor) => editorRef.current = editor}
                    init={{
                      height: 300,
                      menubar: false,}}

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Length"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name = "length"
                      helperText="From left to right"
                    />
                    
                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Breadth"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name = "breadth"
                      helperText="From front to back"

                    />
                    
                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Height"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Inch</InputAdornment>,
                      }}
                      variant="outlined"
                      name = "height"
                      helperText = "From bottom to top"
                    />
                    
                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Weight"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                      }}
                      variant="outlined"
                      name = "weight"
                    />
                    
                    
                    <br></br>

                  <TextField
                    fullWidth
                    required
                    id="outlined-select"
                    select
                    name  = 'fitting'
                    label="Fitting"
                    value={fitting}
                    multiple
                    onChange={handleChangeFitting}
                    helperText="Please select your fitting."

                  >
                    {fittingCatalog.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>


                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="MRP"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name = "MRP"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Selling Price"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      }}
                      variant="outlined"
                      name  = "selling_price"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Discount Limit"
                      type="number"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      variant="outlined"
                      name = 'discount_limit'
                    />


                  <br></br>

                  <TextField
                    fullWidth
                    required
                    id="outlined-select"
                    select
                    name  = 'tax_rate'
                    label="Tax Rate"
                    value={taxRate}
                    multiple
                    onChange={handleChangeTaxRate}
                    helperText="Please select your tax rate."
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                  >
                    {taxRateCatalog.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>


                  <br></br>

                  <TextField
                    fullWidth
                    required
                    id="outlined-select"
                    select
                    name  = 'dispatch_time'
                    label="Dispatch Time"
                    value={dispatchTime}
                    multiple
                    onChange={handleChangeDispatchTime}
                    helperText="Please select your dispatch time"
                  >
                    {dispatchTimeCatalog.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>


                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Product
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}


            {/* add Products Ends */}

            {/*  add Catagory */}

            {SideBox.open.formType === "category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your product category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" onSubmit={handelCategory} id = 'myForm' enctype='multipart/form-data' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input type='file' {...getInputProps()} name='category_image' />
                        <p>
                          Drag & drop some product images here, or click to
                          select image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_name'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_sub_name'
                      label="Sub Category"
                      value={subCat}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* add Catagory Ends */}

            {/*  update Catagory */}

            {SideBox.open.formType === "update_category" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update Category
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update your product category and necessary information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id = 'myForm' onSubmit={handelUpdateCategory} enctype='multipart/form-data' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input type='file' {...getInputProps()} name='category_image' />
                        <p>
                          Drag & drop some product images here, or click to
                          select image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='category_name'
                      label="Category"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your category"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <TextField
                      fullWidth
                      required
                      id="outlined-select"
                      select
                      name='sub_category_name'
                      label="Sub Category"
                      value={subCat}
                      multiple
                      onChange={handleChangeSubCat}
                      helperText="Please select your sub category"
                    >
                      {subCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* update Catagory Ends */}

            {/* Ore Staff */}

            {SideBox.open.formType === "staff" && (
              <Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Staff
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your staff necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" id = 'myForm' action="" method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Drag & drop your staff image here, or click to select
                          image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Staff Name"
                      type="textl"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Email"
                      type="email"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Password"
                      type="password"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Phone Number"
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label=""
                      type="date"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Staff Role"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select the staff role"
                    >
                      {post.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <Button color="primary" fullWidth variant="contained">
                      Add Staff
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/* Ore Staff Ends */}

            {/* Coupone  */}
            {SideBox.open.formType === 'coupone' &&

              (<Grid container p={5}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    Add Coupone
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Add your coupone and necessary information from here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>
                  <form className="form" action="" id = 'myForm' method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Drag & drop your banner image here, or click to select
                          image
                        </p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                      </div>
                      <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                      </aside>
                    </section>

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Campaign Name"
                      type="textl"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Couponse Code"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Discount Percentage"
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Minimum Amount "
                      type="number"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label=""
                      type="date"
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      id="outlined-select"
                      select
                      label="Product Type"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select the product type"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <br></br>

                    <Button color="primary" fullWidth variant="contained">
                      Add Coupone
                    </Button>
                  </form>
                </Grid>
              </Grid>)

            }
            {/* Coupone Ends */}
          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default Sideform;

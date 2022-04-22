import React, { useState, useContext } from "react";
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
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode, Notify } from "../App";

// service 
import { addCategory, editCategory, addProduct } from '../services/service.js'

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


  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);

  // states
  const [cat, setCat] = useState("catagory");
  const [subCat, setSubCat] = useState("subCatagory");


  const handleChange = (event) => {
    setCat(event.target.value);
  };
  const handleChangeSubCat = (event) => {
    setSubCat(event.target.value);
  };

  const handelClose = () => {
    SideBox.setOpen({ state: false, formType: null });
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
     FD.append('product_description', e.target.product_description.value) ;
     FD.append('SKU', e.target.SKU.value) ;
     FD.append('MRP', e.target.MRP.value) ;
     FD.append('seo_title', e.target.seo_title.value) ;
     FD.append('seo_description', e.target.seo_description.value) ;
     FD.append('discount_limit', e.target.discount_limit.value) ;
     FD.append('blog_url', e.target.blog_url.value) ;
     FD.append('selling_price', e.target.selling_price.value) ;

    



    const res = addProduct(FD)

    res.then((data)=>{
      console.log(data)

      if(data.status !== 203)
      {
        dispatchAlert.setNote({
          open : true,
          variant : 'success',
          message : data.data.message
    
        })
      }
      else {

        dispatchAlert.setNote({
          open : true,
          variant : 'error',
          message : data.data.message
    
        })
      }
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
                  <form className="form" onSubmit={handelProduct} enctype='multipart/form-data' method="post">
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

                    {/* // a. SKU 
                    // b. Title
                    // c. Product Specification (Differentiating factor between each category/ sub-category)
                    // d. Product description
                    // e. Seo title
                    // f. Seo Description
                    // g. Blogs Embed (like in bed category bed blogs can be shown)
                    // h. Images / size photos / video (if any)
                    // i. MRP
                    // j. Selling Price
                    // k. Discount Limit
                    // l. Dispatch time */}

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
                      type="number"
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
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Product description"
                      type="text"
                      variant="outlined"
                      name = 'product_description'

                    />

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      label="Blog URL"
                      type="url"
                      variant="outlined"
                      name = 'blog_url'

                    />

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
                      autoComplete={false}
                      id="fullWidth"
                      name  = 'dispatch_time'
                      // label="Dispatch Date"
                      type="date"
                      variant="outlined"
                    />

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
                  <form className="form" onSubmit={handelCategory} enctype='multipart/form-data' method="post">
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
                  <form className="form" onSubmit={handelUpdateCategory} enctype='multipart/form-data' method="post">
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
                  <form className="form" action="" method="post">
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
                  <form className="form" action="" method="post">
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

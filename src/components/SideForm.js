import React, { useState, useContext } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode } from "../App";

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

  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);

  const [cat, setCat] = useState("catagory");

  const handleChange = (event) => {
    setCat(event.target.value);
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
          <Box className={viewMode.mode === true ? "mainDarkContainer" :"mainContainer"}>
            <IconButton
              onClick={handelClose}
              color="primary"
              className="crossButton"
            >
              <CancelIcon />
            </IconButton>

            {/* Catagory */}

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
                  <form className="form" action="" method="post">
                    <section className="dorpContainer">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
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
                      id="outlined-select"
                      select
                      label="Product Type"
                      value={cat}
                      multiple
                      onChange={handleChange}
                      helperText="Please select your product type"
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
                      autoComplete={false}
                      id="fullWidth"
                      label="Category Title"
                      type="text"
                      variant="outlined"
                    />

                    <br></br>

                    <Button color="primary" fullWidth variant="contained">
                      Add Category
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}
            {/* Catagory Ends */}

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

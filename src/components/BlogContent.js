import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  Link,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import Fotter from "./Fotter";

//logo
import logo from "../assets/img/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
//css
import "../assets/custom/css/blogContent.css";

export default function BlogContent() {
  return (
    <>
      <title>Blog-Content</title>

      {/* // top bar */}

      <Grid container className="navBar">
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className="logo">
          <img src={logo} alt="logo" />
        </Grid>
        <Grid item className="backBtn" xs={4}>
          <IconButton variant="contained" color="primary">
            <KeyboardBackspaceSharpIcon
              onClick={() => {
                window.location = "/blog";
              }}
            />
          </IconButton>
        </Grid>
      </Grid>

      {/* Read Box */}

      <Grid container className="readBox">
        {/* Table OF COntent */}
        <Grid item xs={4} md={2} className="TOC">
          <Typography variant="h6" color="primary">
            Table Of Content
          </Typography>

          <List color="black">
            <ListItem>
              <ListItemIcon>
                <ArrowRightOutlinedIcon />
              </ListItemIcon>
              <Link underline="hover">
                <ListItemText className="listText" primary="How to use?" />
              </Link>
            </ListItem>
          </List>
        </Grid>
        {/* Table OF COntent Ends */}

        {/* Content Box */}
        <Grid item xs={8} md={10} className="content">
            <Typography variant= 'h5'>Chair Price</Typography>
            <Grid item className = 'banner' ></Grid>
        </Grid>
        {/* Content Box Ends */}
      </Grid>

      {/* Ends Read Box */}

      <Fotter></Fotter>
    </>
  );
}

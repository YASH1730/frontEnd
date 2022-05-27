import React, {useEffect, useState} from "react";
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
import ReactHtmlParser from "react-html-parser";
import Fotter from "./Fotter";

import { Image } from 'mui-image'
//logo
import logo from "../assets/img/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
//css
import "../assets/custom/css/blogContent.css";

import {getBlog} from '../services/service'

export default function BlogContent() {

  const [data,setData] = useState()

  useEffect(()=>{
    getBlog(localStorage.getItem('uuid'))
    .then((data)=>{
      console.log(data)
      setData(data.data)
    })
  },[])

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
        {data && <Grid item xs={7.5} md={9.5} className="content">
            <Typography variant= 'h5'>{data.title}</Typography>
            <br></br>
            <img
            src = {data.card_image}
            className  = 'banner'
          />
            <br></br>

            <Grid item className = 'content' >{ReactHtmlParser(data.description)}</Grid>
            
        </Grid>}
        {/* Content Box Ends */}
      </Grid>

      {/* Ends Read Box */}
      <Fotter></Fotter>
    </>
  );
}

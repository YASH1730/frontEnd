import React, { useState, useContext, useEffect } from "react";
import {
    Typography,
    ImageList,
    Grid,
    TextField,
    ImageListItem,
} from "@mui/material";

import { getGallery } from '../services/service';
import '../assets/custom/css/category.css'
import { Notify } from '../App';




export default function Knob() {

    const dispatchAlert = useContext(Notify)

    const [images, setImages] = useState([]);


    const handleSKU = (e) => {

        const res = getGallery(e.target.value)
            
        res.then((res) => {
                console.log(res)
                if (res.status !== 203) {
                    
                    setImages(res.data)
                }
            })

    }

    const handleClick = (e) =>{
console.log(e.target);
    }



    return (
        <>
            <Typography sx={{ display: "block" }} variant="h5">
                Gallery
            </Typography>

            <Grid
                container
                p={3}
                mt = {5}
                sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    justifyContent: "center !important",
                    alignItems: "center !important",
                    gap: "15px",
                }}
            >

                <Grid xs={12} >
                    <TextField
                        fullWidth
                        autoComplete={false}
                        id="demo-helper-text-aligned-no-helper"
                        label="Search by SKU"
                        name='seachQuery'
                        type="search"
                        onChange={handleSKU}
                    />
                </Grid>


            </Grid>

            <br></br>

            <Typography sx={{ display: "block" }} variant="h5">
                Product Images
            </Typography>
            <br></br>

           <ImageList sx={{ width: 700, height: 450, margin : 'auto' }} cols={4} rowHeight={164}>
                {images.map((item, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={'images'}
                            loading="lazy"
                            onClick = {handleClick}
                        />
                    </ImageListItem>
                ))}
            </ImageList>


        </>
    );
}

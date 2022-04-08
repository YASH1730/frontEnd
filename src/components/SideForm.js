import React,{useState,useContext} from 'react';
import {Button,IconButton,MenuItem,Grid,Box,Typography,TextField} from '@mui/material';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import '../assets/custom/css/sideForm.css'
import {useDropzone} from 'react-dropzone';
import CancelIcon from '@mui/icons-material/Cancel';
import {OpenBox} from '../App';

const Sideform = () => {

const category = [
    {
      value: 'Grocery',
      label: 'Grocery',
    },
    {
      value: 'Foods',
      label: 'Foods',
    },
    {
      value: 'Cloths',
      label: 'Cloths',
    },
    {
      value: 'Health Care',
      label: 'Health Care',
    },
    {
      value: 'Medicine',
      label: 'Medicine',
    },
    {
      value: 'Books',
      label: 'Books',
    },
    {
      value: 'Bags',
      label: 'Bags',
    },
    {
      value: 'Sports & Fitness',
      label: 'Sports & Fitness',
    },
    {
      value: 'Home Accessories',
      label: 'Home Accessories',
    },
    {
      value: 'Electronics',
      label: 'Electronics',
    },
    {
      value: 'Furniture',
      label: 'Furniture',
    }
  ];

  const open = useContext(OpenBox);

  const [cat, setCat] = useState('catagory');

  const handleChange = (event) => {
    setCat(event.target.value);
  };


const handelClose = () =>{
    open.setOpen(false)
}

    const {
      acceptedFiles,
      
      getRootProps,
      getInputProps
    } = useDropzone({
      accept: 'image/jpeg,image/png'
    });
  
    const acceptedFileItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    

    return (
        <>
        <Slide direction="left" in={open.open} mountOnEnter unmountOnExit>
            <Backdrop  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open.open}
            //   onClick={handelClose}
            >
           <Box className = 'mainContainer'>

           <IconButton onClick = {handelClose} color = 'primary' className = 'crossButton'><CancelIcon  /></IconButton>

               {/* Catagory */}

               <Grid container p = {5}>

                   <Grid item xs = {12}>
                   <Typography  variant = 'h5'>
                       Add Category 
                    <Typography sx = {{display : 'block !important'}} variant = 'caption'>Add your product category and necessary information from here</Typography>
                   </Typography>
                   </Grid>


                   <Grid item xs = {12} mt = {5} >

                    <form className='form' action="" method = 'post'>

                    <section className="dorpContainer">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input  {...getInputProps()} />
                        <p>Drag & drop some product images here, or click to select image</p>
                        <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </div>
                    <aside>
                        <h5>File Name</h5>
                        <ul>{acceptedFileItems}</ul>
                       
                    </aside>
                     </section>

                    <TextField fullWidth 
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

                      <TextField  fullWidth autoComplete = {false}  id="fullWidth" label="Category Title" type = 'text' variant="outlined" />
                     
                     <br></br>
                    
                    <Button color = 'primary' fullWidth variant = 'contained'>Add Product</Button>
                      

                    </form>

                   </Grid>
                   
                   
               </Grid>

               {/* Catagory Ends */}
           </Box>
           </Backdrop>
        </Slide>
        </>
    );
}

export default Sideform;

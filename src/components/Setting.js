import React from 'react'
import {Box,FormControl,MenuItem,Typography,TextField,InputLabel,Select,Grid,Button} from '@mui/material'

export default function Setting() {
  return (
    <>
     <Typography sx = {{display : 'block'}} variant = "h5">
           Edit Profile   
        </Typography>

        {/* Section 1  */}
        <Grid container p = {3} pt = {0}  pb = {0}sx = {{borderRadius : 2,justifyContent: 'center !important', alignItems : 'center !important'}}>  
            <Grid item xs = {8}>

        <form  method = 'post' className = 'formStyle'>
                    <Box
                      sx={{
                        '& .MuiTextField-root': { mt: 2}, margin : 'auto'
                      }}>

                        
                        <TextField  fullWidth autoComplete = {false}  id="fullWidth" label="Name" type = 'text' variant="outlined" />
                        
                        <TextField  fullWidth autoComplete = {false}  id="fullWidth" label="Name" type = 'text' variant="outlined" />
                        
                        <TextField  fullWidth autoComplete = {false}  id="fullWidth" label="Email" type = 'email' variant="outlined" />
                        
                        <TextField  fullWidth id="fullWidth"  type = 'password' label="Password" variant="outlined"  />


                    
                        <Button variant = 'contained' color =  'primary' sx = {{marginTop : '5%',marginBottom : '8%',float : 'right'}}  > Register</Button>
                    </Box>
                    </form>


            </Grid>
    </Grid>
    </>
  )
}

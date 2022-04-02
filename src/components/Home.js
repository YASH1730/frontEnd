import React ,{useState}from 'react';
import {Tabs,Tab,Typography,IconButton,Box,Grid} from '@mui/material'
import '../assets/custom/css/home.css'
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
// inner components
import Dashboard from './Dashboard';
import Products from './Products';

// icons 
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {

  const [ShowTabs, setShowTabs] = useState(false);

  const handleClose = () =>{
    setShowTabs(false)
  }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            class = 'tabPanel' 
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
     
      
      function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
      }
      
      function VerticalTabs() {
        const [value, setValue] = React.useState(0);
      
        const handleChange = (event, newValue) => {
          setValue(newValue);
        };
      
        return (
          
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',width : '100%'}}
          >

            {ShowTabs === true &&     
            
            <Slide direction="right" in={ShowTabs} mountOnEnter unmountOnExit>
               <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={ShowTabs}
              onClick={handleClose}
                >
                  <Typography align = 'center' pt={3} pb = {3} color = 'primary' variant = 'h5' {...a11yProps(-1)}>
                            WoodSala
                        </Typography>
            <Tabs
              orientation="vertical"
              value={value}
              
              onChange={handleChange}
              indicatorColor = 'primary'
              textColor = 'primary'
              aria-label="Vertical tabs example"
              className = 'tabs2'
              sx={{borderRight: 1, borderColor: 'divider',
              '.MuiTabs-indicator': {
                left: 0, width : '5px' 
              }}}
            >
               
              <Tab wrapped icon = {<GridViewIcon/>} label="Dashboard" {...a11yProps(0)} />
              <Tab wrapped icon = {<ShoppingBagOutlinedIcon/>} label="Product" {...a11yProps(1)} />
              <Tab wrapped icon = {<FormatListBulletedOutlinedIcon/>} label="Category" {...a11yProps(2)} />
              <Tab wrapped icon = {<PeopleAltOutlinedIcon/>} label="Customers" {...a11yProps(3)} />
              <Tab wrapped icon = {<ExploreOutlinedIcon/>} label="Orders" {...a11yProps(4)} />
              <Tab wrapped icon = {<CardGiftcardOutlinedIcon/>} label="Coupons" {...a11yProps(5)} />
              <Tab wrapped icon = {<PersonOutlineOutlinedIcon/>} label="Our Staff" {...a11yProps(6)} />
              <Tab wrapped icon = {<SettingsOutlinedIcon/>} label="Settings" {...a11yProps(7)} />
            </Tabs>
            </Backdrop>
  </Slide>
            
          }
            <Tabs
            orientation="vertical"
            value={value}
            
            onChange={handleChange}
            indicatorColor = 'primary'
            textColor = 'primary'
            aria-label="Vertical tabs example"
            className = 'tabs'
            sx={{borderRight: 1, borderColor: 'divider',
            '.MuiTabs-indicator': {
              left: 0, width : '5px' 
            }}}
          >
          
            <Tab wrapped icon = {<GridViewIcon/>} label="Dashboard" {...a11yProps(0)} />
            <Tab wrapped icon = {<ShoppingBagOutlinedIcon/>} label="Product" {...a11yProps(1)} />
            <Tab wrapped icon = {<FormatListBulletedOutlinedIcon/>} label="Category" {...a11yProps(2)} />
            <Tab wrapped icon = {<PeopleAltOutlinedIcon/>} label="Customers" {...a11yProps(3)} />
            <Tab wrapped icon = {<ExploreOutlinedIcon/>} label="Orders" {...a11yProps(4)} />
            <Tab wrapped icon = {<CardGiftcardOutlinedIcon/>} label="Coupons" {...a11yProps(5)} />
            <Tab wrapped icon = {<PersonOutlineOutlinedIcon/>} label="Our Staff" {...a11yProps(6)} />
            <Tab wrapped icon = {<SettingsOutlinedIcon/>} label="Settings" {...a11yProps(7)} />
          </Tabs>




            <TabPanel value={value} index={0}>
              <Dashboard/>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Products/>
            </TabPanel>
            <TabPanel   value={value} index={2}>
           {/* <Products/> */}
            </TabPanel>
            <TabPanel  value={value} index={3}>
              Item Three
            </TabPanel>
            <TabPanel  value={value} index={4}>
              Item Four
            </TabPanel>
            <TabPanel  value={value} index={5}>
              Item Six
            </TabPanel>
            <TabPanel  value={value} index={6}>
              Item Seven
            </TabPanel>
            <TabPanel  value={value} index={7}>
            <Dashboard/>
            </TabPanel>
          </Box>
        );
      }
      
    
    return (
        
        <>
            {/* Top Bar  */}

            <Grid container p = {1} spacing = {2} className = 'topNav' sx = {{boxShadow : 1}} >
              
                    
                    <Grid item xs ={4}  sx = {{display: 'flex'}}>

                      {ShowTabs === false ? 

                      <IconButton className = 'hamIcon' onClick = {()=>{
                      setShowTabs(true)}} size ='small' color="primary">
                            <MenuIcon />
                        </IconButton>
                        :


                        <IconButton className = 'hamIcon' onClick = {()=>{
                      setShowTabs(false)
                    }} size ='small' color="primary">
                            <CloseIcon />
                        </IconButton>}

                    
                        <Typography  variant = 'h5'>
                            WoodSala
                        </Typography>
                    </Grid>
                    
                    <Grid item xs ={4} >
                        {/* Nothing to fill  */}
                    </Grid>
                    
                    <Grid item sx = {{display : 'flex',justifyContent : 'end'}} xs ={4} >
                        <IconButton size ='small' color="primary">
                            <WbSunnyIcon  />
                        </IconButton>

                        <IconButton size ='small' color="primary">
                            <DarkModeIcon />
                        </IconButton>

                        <IconButton size ='small' color="primary">
                            <NotificationsIcon />
                        </IconButton>

                        <IconButton size ='small' color="primary">
                            <PersonIcon/>
                        </IconButton>
                    </Grid>
            </Grid>

            {/* Top Bar Ends */}

            {/* Sidenav  */}
            {VerticalTabs()}
            {/* Sidenav Ends  */}
        </>
    );
}

export default Home;

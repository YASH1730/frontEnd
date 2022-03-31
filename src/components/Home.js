import React from 'react';
import {Tabs,Tab,Typography,IconButton,Box,Grid} from '@mui/material'
import '../assets/custom/css/home.css'

// inner components
import Dashboard from './Dashboard';

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


const Home = () => {

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
              },width : '200px' }}
            >
              <Tab wrapped icon = {<GridViewIcon/>} label="Dashboard" {...a11yProps(0)} />
              <Tab wrapped icon = {<ShoppingBagOutlinedIcon/>} label="Product" {...a11yProps(1)} />
              <Tab wrapped icon = {<FormatListBulletedOutlinedIcon/>} label="Category" {...a11yProps(2)} />
              <Tab wrapped icon = {<PeopleAltOutlinedIcon/>} label="Customers" {...a11yProps(3)} />
              <Tab wrapped icon = {<ExploreOutlinedIcon/>} label="Orders" {...a11yProps(4)} />
              <Tab wrapped icon = {<CardGiftcardOutlinedIcon/>} label="Coupons" {...a11yProps(5)} />
              <Tab wrapped icon = {<PersonOutlineOutlinedIcon/>} label="Our Staff" {...a11yProps(6)} />
              <Tab wrapped icon = {<SettingsOutlinedIcon/>} label="Settings" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Dashboard/>
            </TabPanel>
            <TabPanel   value={value} index={1}>
            <Dashboard/>

            </TabPanel>
            <TabPanel  value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel  value={value} index={3}>
              Item Four
            </TabPanel>
            <TabPanel  value={value} index={4}>
              Item Five
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
                    
                    <Grid item xs ={4} >
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

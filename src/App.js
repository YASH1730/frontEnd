import './App.css';
import {useState} from 'react'
import EntryPoints from './components/EntryPoints';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Auth} from './context/context'
import Home from './components/Home';
import { createTheme,ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#91441f',
    }
  },
  typography : {
    fontFamily : "Work+Sans",
    fontWeightLight : 100, 
    fontWeightRegular : 300, 
    fontWeightMedium : 300, 
    fontWeightBold : 400, 

  }
});


function App() {

  // states for the authentication
  const [auth, setAuth] = useState(null);
  

  return (
     <>
          <ThemeProvider theme= {theme}>
            <BrowserRouter>
              <Auth.Provider value={{auth,setAuth}}>
                  <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/login" element={<EntryPoints/>} />
                      <Route path="/register" element={<EntryPoints/>} />
                  </Routes>
              </Auth.Provider>
            </BrowserRouter>
          </ThemeProvider>
   
     </>
  );
}

export default App;

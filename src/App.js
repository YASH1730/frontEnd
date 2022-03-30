import './App.css';
import {useState} from 'react'
import EntryPoints from './components/EntryPoints';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Auth} from './context/context'

function App() {

  // states for the authentication
  const [auth, setAuth] = useState(null);
  

  return (
     <>
          <BrowserRouter>
          <Auth.Provider value={{auth,setAuth}}>
            <Routes>
                <Route path="/login" element={<EntryPoints/>} />
                <Route path="/register" element={<EntryPoints/>} />
            </Routes>
          </Auth.Provider>
         </BrowserRouter>
   
     </>
  );
}

export default App;

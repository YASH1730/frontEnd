import "./App.css";
import { useState } from "react";
import EntryPoints from "./components/EntryPoints";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, OpenBox, Mode } from "./context/context";
import Home from "./components/Home";
import SideForm from "./components/SideForm";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  // const initialval = localStorage.getItem('mode') || false;
  // states for the authentication
  const [auth, setAuth] = useState(null);

  //state for the mode pot dark
  const [mode, setMode] = useState(false);

  const light = createTheme({
    palette: {
      primary: {
        main: "#91441f",
      },
    },
    typography: {
      fontFamily: "Work+Sans",
      fontWeightLight: 100,
      fontWeightRegular: 300,
      fontWeightMedium: 300,
      fontWeightBold: 400,
    },
  });

  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // states for the open the side form
  const [open, setOpen] = useState({
    state: false,
    formType: null,
  });

  return (
    <>
      <ThemeProvider theme={mode === true ? dark : light}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Auth.Provider value={{ auth, setAuth }}>
            <OpenBox.Provider value={{ open, setOpen }}>
              <Mode.Provider value={{ mode, setMode }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<EntryPoints />} />
                  <Route path="/register" element={<EntryPoints />} />
                </Routes>
                <SideForm />
              </Mode.Provider>
            </OpenBox.Provider>
          </Auth.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

export { Auth, OpenBox, Mode };

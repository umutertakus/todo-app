import { ThemeProvider } from "@emotion/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

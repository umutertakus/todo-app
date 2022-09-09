import { ThemeProvider } from "@emotion/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TodoList />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

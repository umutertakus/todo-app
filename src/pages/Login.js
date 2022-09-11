import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    isShowErrorMessage: false,
  });
  
  const handleLoginInfoChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const showErrorMessage = () => {
    return (
      loginInfo.isShowErrorMessage && "Username must be at least 3 characters"
    );
  };

  const handleLogin = () => {
    if (loginInfo.username.length < 3) {
      setLoginInfo({
        ...loginInfo,
        isShowErrorMessage: true,
      });
    } else {
      navigate("/dashboard");
      localStorage.setItem("username", loginInfo.username)
    }
  };

  const handleKeyDownLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Wrapper>
      <LoginCard>
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          spacing={2}
        >
          <Typography variant="h4">Welcome!</Typography>
          <PersonIcon color="secondary" fontSize="large" />
          <Typography variant="body1">Please login to view todos</Typography>
          <LoginTextField
            name="username"
            variant="outlined"
            size="small"
            label="Enter username"
            value={loginInfo.username}
            onChange={handleLoginInfoChange}
            onKeyDown={handleKeyDownLogin}
            helperText={showErrorMessage()}
          />
          <LoginButton
            variant="contained"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </LoginButton>
        </Stack>
      </LoginCard>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ebf5f3",
}));

const LoginCard = styled(Box)(() => ({
  boxShadow:
    "rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
  width: "400px",
  borderRadius: "4px",
  padding: "8px",
}));

const LoginTextField = styled(TextField)(() => ({
  width: "300px",
}));

const LoginButton = styled(Button)(() => ({
  width: "300px",
}));

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Wrapper>
      <div>Login</div>
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
}));

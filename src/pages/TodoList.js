import styled from '@emotion/styled';
import  { Box, TextField } from '@mui/material';
import { useState } from 'react';

const TodoList = () => {
  const [todoList, setTodoList] = useState([])

  return (
    <Wrapper>
      <TextField />
    </Wrapper> 
  )
}

export default TodoList

const Wrapper = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ebf5f3",
}));
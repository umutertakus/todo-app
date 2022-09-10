import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TodoList = () => {
  const BASE_URL = "https://631b2f2ffae3df4dcff73e53.mockapi.io/todos";
  const [animationParent] = useAutoAnimate();

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    content: "",
    isComplete: false,
  });

  const getTodos = () => {
    axios.get(BASE_URL).then((response) => setTodoList(response.data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleTodoChange = (event) => {
    setTodo({
      ...todo,
      content: event.target.value,
    });
  };

  const addTodo = async () => {
    await axios.post(BASE_URL, todo);
    getTodos();
  };

  return (
    <Wrapper>
      <Stack direction="row" spacing={1} width="500px" pb={1}>
        <TodoTextField
          onChange={handleTodoChange}
          variant="outlined"
          size="small"
        />
        <AddTodoButton variant="contained" color="secondary" onClick={addTodo}>
          Add Todo
        </AddTodoButton>
      </Stack>
      <TodoListBox ref={animationParent}>
        {todoList.map((todo) => (
          <Todo>
            <Typography pl={1}>{todo.content}</Typography>
          </Todo>
        ))}
      </TodoListBox>
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#ebf5f3",
}));

const TodoListBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const Todo = styled(Box)(() => ({
  margin: "8px",
  borderRadius: "8px",
  backgroundColor: "red",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "500px",
  height: "40px",
}));

const TodoTextField = styled(TextField)(() => ({
  width: "70%",
}));

const AddTodoButton = styled(Button)(() => ({
  width: "30%",
}));

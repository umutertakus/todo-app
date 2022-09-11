import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const TodoList = () => {
  const BASE_URL = "https://631b2f2ffae3df4dcff73e53.mockapi.io/todos";
  const [animationParent] = useAutoAnimate();

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    content: "",
    isCompleted: false,
  });
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const getTodos = async () => {
    setIsTodoListLoading(true);
    const response = await axios.get(BASE_URL);
    setTodoList(response.data);
    setIsTodoListLoading(false);
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

  const showErrorMessage = () => {
    return isShowErrorMessage && "Todo content must be at least 3 characters";
  };

  const showNoTodoMessage = () => {
    return todoList.length === 0 && !setIsTodoListLoading ? (
      <Typography variant="h6" pt={1}>
        There are no todos to show. You can add something new!
      </Typography>
    ) : (
      ""
    );
  };

  const showLoadingMessage = () => {
    return (
      isTodoListLoading && (
        <Typography variant="h6" pt={1}>
          Loading...
        </Typography>
      )
    );
  };

  const addTodo = async () => {
    if (todo.content.length < 3) {
      setIsShowErrorMessage(true);
    } else {
      setIsLoading(true);
      await axios.post(BASE_URL, todo);
      setIsShowErrorMessage(false);
      setTodo({
        ...todo,
        content: "",
      });
      setIsLoading(false);
      getTodos();
    }
  };

  const handleKeyDownTodo = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = async (todoId) => {
    await axios.delete(`${BASE_URL}/${todoId}`);
    getTodos();
  };

  const handleTodoComplete = async (event, content, todoId) => {
    const request = {
      content,
      isCompleted: event.target.checked
    }
    await axios.put(`${BASE_URL}/${todoId}`, request);
    getTodos();
  }

  return (
    <Wrapper>
      <Typography variant="h4" pt={2}>
        Hi {localStorage.getItem("username")}!
      </Typography>
      <Stack direction="row" spacing={1} width="500px" pb={1} pt={3}>
        <TodoTextField
          value={todo.content}
          onChange={handleTodoChange}
          onKeyDown={handleKeyDownTodo}
          label="Enter todo"
          placeholder="What's on your mind?"
          variant="outlined"
          size="small"
          helperText={showErrorMessage()}
        />
        <AddTodoButton
          variant="contained"
          color="secondary"
          onClick={addTodo}
          loading={isLoading}
          disabled={isLoading}
        >
          Add Todo
        </AddTodoButton>
      </Stack>
      <TodoListBox ref={animationParent}>
        {showLoadingMessage()}
        {showNoTodoMessage()}
        {!isTodoListLoading &&
          todoList.map((todo) => (
            <Todo key={todo.id}>
              <Typography pl={1}>{todo.content}</Typography>
              <Stack direction="row">
                <Checkbox
                  checked={todo.isCompleted}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<TaskAltIcon />}
                  onChange={(event) => handleTodoComplete(event, todo.content, todo.id)}
                />
                <IconButton onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
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
  backgroundColor: "#ccb2d1",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "500px",
  height: "60px",
}));

const TodoTextField = styled(TextField)(() => ({
  width: "75%",
}));

const AddTodoButton = styled(LoadingButton)(() => ({
  width: "25%",
  maxHeight: "40px",
}));

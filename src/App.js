import styled from "@emotion/styled";
import { Box } from "@mui/system";

function App() {
  return (
    <Wrapper>
      Todo App
    </Wrapper>
  );
}

export default App;

const Wrapper = styled(Box)(() => ({
  padding: 0,
  margin: 0,
  height: "100vh",
  width: "100vw",
  display: "flex",
}));
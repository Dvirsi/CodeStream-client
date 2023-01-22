import { Route, Routes } from "react-router-dom";
import CodeBlock from "./CodeBlock/CodeBlock";
import Main from "./Main/Main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="/block/:blockId" element={<CodeBlock />} />
      </Routes>
    </div>
  );
}

export default App;

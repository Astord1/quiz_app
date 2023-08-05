import {BrowserRouter, Routes, Route} from "react-router-dom";
import Quiz from "./pages/Quiz";
import Error from "./pages/Error";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element ={<Quiz />} />
          <Route path = "error" element = {<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

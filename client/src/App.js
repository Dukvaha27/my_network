import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Header from "./components/header";
import Main from "./pages/Main";

const pages = [
  {
    path: "/log",
    key: 1,
    element: <Login />,
  },
  {
    path: "/register",
    key: 2,
    element: <Register />,
  },
  {
    path: "/chat",
    key: 3,
    element: <Chat />,
  },
  {
    path: "/",
    key: 4,
    element: <Main />,
  },
];

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {pages.map((elem) => (
          <Route key={elem.key} {...elem} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

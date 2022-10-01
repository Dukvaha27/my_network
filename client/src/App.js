import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
     <Routes>
         <Route path={'/'} element={<Header />}/>
         <Route path={'/log'} element={<Login/>}/>
         <Route path={'/register'} element={<Register/>}/>
         <Route path={'/chat'} element={<Chat/>}/>
     </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Home/ChatPage";
import Register from "./component/Register";
import Login from "./component/Login";
import ChatAppLanding from "./component/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./UserContext";

export default function AppLayout() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatAppLanding />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </BrowserRouter>
    </UserProvider>
  );
}

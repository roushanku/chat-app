import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Home/ChatPage.jsx";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";
import ChatAppLanding from "./component/Landing.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./UserContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import FriendSuggestions from "./component/Friendsuggestions.jsx";
import PostList from "./component/Post.jsx";

export default function AppLayout() {
  return (
    <SocketProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatAppLanding />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/friend-suggestion" element={<FriendSuggestions />} />
            <Route path="/post" element={<PostList />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </BrowserRouter>
      </UserProvider>
    </SocketProvider>
  );
}

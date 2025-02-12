import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ChattingPage from "./pages/Chatting_page/ChattingPage";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/Profile_Page/ProfilePage";
import { useEffect, useState } from "react";
import { auth } from "./components/firebase";

 function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/profile" /> : <SignUp />}
        />
        <Route path="chat" element={user ? <ChattingPage /> : <SignUp/>} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

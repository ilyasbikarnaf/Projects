import style from "./SignUp.module.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
   
      if (user) {
        await setDoc(doc(database, "Users", user.uid), {
          email: user.email,
          username: userName,
          uid: user.uid,
          bio : "Hi there I'm using the chatting app"
        });
      }
      setEmail("");
      setPassword("");
      setUserName("");

      toast.success(`user registered successfully`, {
        position : 'top-center'
      })

      navigate("/profile")
      
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "bottom-center"
      });
    }
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
      <p className={style.appDescription}><span className={style.appName}>Chatting App </span> : Login and Start Chatting</p>

        <div className={style.text}>Sign Up</div>
        <div className={style.underline}></div>
      </div>

      <form className={style.inputs} onSubmit={handleRegister}>
        <div className={style.input}>
          <img src={user_icon} alt="user icon" />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className={style.input}>
          <img src={email_icon} alt="user icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={style.input}>
          <img src={password_icon} alt="user icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={style.forgotPassword}>
          Already Have An Account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>

        <div className={style.submitContainer}>
          <button type="submit" className={style.submit}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

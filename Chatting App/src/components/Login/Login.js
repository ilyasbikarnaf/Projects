import style from "./Login.module.css";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";
import {  Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`user registered successfully`, {
        position: "top-center",
      });

      navigate('/profile')
      
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "bottom-center",
      });
    }
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
      <p className={style.appDescription}><span className={style.appName}>Chatting App </span> : Login and Start Chatting</p>
      <div className={style.text}>Log In</div>
        <div className={style.underline}></div>
      </div>

      <form className={style.inputs} onSubmit={handleSubmit}>
        <div className={style.input}>
          <img src={email_icon} alt="user icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.input}>
          <img src={password_icon} alt="user icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={style.forgotPassword}>
          Forgot Password? <span>Click Here</span>
        </div>

        <div className={style.submitContainer}>
          <button type="submit" className={style.submit}>
            Login
          </button>
        </div>
        <div className={style.createAccount}>
          Don't have an account?{" "}
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;

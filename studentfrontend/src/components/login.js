import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/admin");
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <form id="login-form" className="form-login" onSubmit={redirectToHome}>
          <div className="input-group-login">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <span className="msg">Valid email</span>
          </div>
          <div className="input-group-login">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <span className="msg">Incorrect password</span>
          </div>
          <button form="login-form" type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

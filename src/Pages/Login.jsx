import React, { useState, useContext } from "react";
import HooksContext from "../Context/HooksContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const context = useContext(HooksContext);
  const { mode, setToken } = context;
  const route = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleHide = () => {
    setHidePassword(!hidePassword);
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });

      if (!response.ok) {
        console.log("no user found");
        throw new Error("No user found");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(true);
      route("/home");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" container login">
        <div className="login-box ml-3">
          <h1 className="text-center">{loading ? "Loading...." : "Login"}</h1>
          <div className="mt-3 form-input ">
            <input
              className="form-control"
              type="text"
              name="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Username"
            />
          </div>

          <div className="mt-3 form-input d-flex">
            <input
              className="form-control"
              type={`${hidePassword ? "password" : "text"}`}
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <div className="eye-icon" onClick={handleHide}>
              {hidePassword ? (
                <i class="fa-solid fa-eye"></i>
              ) : (
                <i class="fa-solid fa-eye-slash"></i>
              )}
            </div>
          </div>
          <div className="login-btn mt-3">
            <button
              type="button"
              onClick={onLogin}
              className={`text-${mode ? "dark" : "light"}`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

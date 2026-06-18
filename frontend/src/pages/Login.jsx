import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUniversity, FaLock, FaUser } from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8085/auth/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem("username", username);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Login Failed");
      }

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "25px",
                padding: "30px"
              }}
            >

              <div className="text-center mb-4">

                <FaUniversity
                  size={60}
                  color="#0d6efd"
                />

                <h2 className="mt-3 fw-bold">
                  Finnova Bank
                </h2>

                <p className="text-muted">
                  Smart Banking Management System
                </p>

              </div>

              <div className="input-group mb-3">

                <span className="input-group-text">
                  <FaUser />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

              <div className="input-group mb-4">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

              <button
                className="btn btn-primary w-100"
                style={{
                  borderRadius: "12px",
                  fontWeight: "bold"
                }}
                onClick={handleLogin}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
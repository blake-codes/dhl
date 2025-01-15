import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar";
import SubNavBar from "../components/SubNav";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useAuth } from "../AuthContext";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 20px;
  padding: 0 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    text-align: center;
  }

  div {
    margin-bottom: 16px;
    text-align: center;

    label {
      display: block;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-align: center;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #eb131e;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://dhl-server.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data: { message?: string; token?: string; username?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("username", data.username || "");
      login(data.token || "", data.username || "");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SubNavBar />
      <FormContainer>
        <StyledForm onSubmit={handleLogin}>
          <h2>Login</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Box>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>

          <Box>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </StyledForm>
      </FormContainer>
      <Footer />
    </>
  );
};

export default Login;

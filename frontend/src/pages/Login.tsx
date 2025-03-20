import { UsernamePasswordForm } from "../auth//UsernamePasswordForm";
import { sendPostRequest } from "../auth/sendPostRequest";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const PORT = process.env.PORT || 3000;
const URL = process.env.APP_URL || `http://localhost:${PORT}/`;


interface LoginPageProps {
  setToken: (token: string) => void;
}

interface LoginResponse {
  token: string;
}

export default function Login({ setToken }: LoginPageProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogin({ username, password }: { username: string; password: string }) {
    console.log("Logging in user:", username, password);
    try {
      // Send request to backend
      const responseData = await sendPostRequest<LoginResponse>(`${URL}/auth/login`, { username, password });

      console.log(responseData.token); // token
      setToken(responseData.token);
      
      // Check onboarding status from localStorage or backend
      const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");

      if (hasCompletedOnboarding) {
        navigate("/");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  }

  return (
    <>
      <h1>Login</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <UsernamePasswordForm onSubmit={handleLogin} />
      <p>
        Don't have an account yet? <Link to="/signup">Register here</Link>
      </p>
    </>
  );
}

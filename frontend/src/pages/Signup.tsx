import { UsernamePasswordForm } from "../auth//UsernamePasswordForm";
import { sendPostRequest } from "../auth/sendPostRequest";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface SignupPageProps {
  setToken: (token: string) => void;
}

interface SignupResponse {
  token: string;
}



export default function Signup({ setToken }: SignupPageProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignup({ username, password }: { username: string; password: string }) {
    try {
      // Send request to backend
      const responseData = await sendPostRequest<SignupResponse>(`/auth/register`, { username, password });

      console.log(responseData.token); // token
      setToken(responseData.token);
      navigate("/onboarding")
      
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
      <h1>Register a New Account</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <UsernamePasswordForm onSubmit={handleSignup} />
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </>
  );
}

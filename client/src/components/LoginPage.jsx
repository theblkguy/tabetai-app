import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

//make a login page function

let clientId = undefined;
if (
  typeof process !== "undefined" &&
  process.env &&
  process.env.REACT_APP_GOOGLE_CLIENT_ID
) {
  clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
}

const LoginPage = ({ onLogin, error, setError }) => {
  const { register, handleSubmit } = useForm();

  // Handle username/password login
  const onSubmit = async (data) => {
    try {
      // TODO: Replace with real backend call
      console.log("Login data:", data);
      if (onLogin) onLogin({ username: data.username });
      if (setError) setError(null);
    } catch (err) {
      if (setError) setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Google Login button and error message */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // Save user info
          if (onLogin) onLogin(credentialResponse);
          if (setError) setError(null); // clear error on success
        }}
        onError={() => {
          // log error to console
          console.error("Google login failed");
          // set error message for user
          if (setError) setError("Google login failed. Please try again.");
        }}
      />
      {/* show error message if present */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ margin: "1em 0" }}>or</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" {...register("username")} />
        </div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register("password")} />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LoginPage;

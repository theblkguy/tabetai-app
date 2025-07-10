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
      // Call backend to check if user exists, if not, create user
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const user = await response.json();
      if (onLogin) onLogin(user);
      if (setError) setError(null);
      // Redirect to homepage after successful login
      window.location.href = "/";
    } catch {
      if (setError) setError("Login failed. Please try again.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    // Clear any user state (if you use localStorage or context, clear it here)
    if (onLogin) onLogin(null);
    // Clear tokens from localStorage/sessionStorage if used
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // Optionally, call backend logout endpoint
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch (e) {
      // Ignore errors from logout endpoint
    }
    window.location.href = "/login";
  };

  return (
    <>
      {/* Google Login button and error message */}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            // Decode JWT to get user info
            const decoded = jwtDecode(credentialResponse.credential);
            // Send to backend to create/check user
            const response = await fetch("/api/users/google-login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token: credentialResponse.credential,
                profile: decoded,
              }),
            });
            if (!response.ok) {
              throw new Error("Google login failed");
            }
            const user = await response.json();
            if (onLogin) onLogin(user);
            if (setError) setError(null);
            // Redirect to main page
            window.location.href = "/";
          } catch {
            if (setError) setError("Google login failed. Please try again.");
          }
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
      <button style={{ marginTop: '1em' }} onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default LoginPage;

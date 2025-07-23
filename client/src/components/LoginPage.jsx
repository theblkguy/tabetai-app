import React from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../UserContext";

// Get Google client ID
let clientId = undefined;
if (
  typeof process !== "undefined" &&
  process.env &&
  process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID
) {
  clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
}

const LoginPage = ({ onLogin, error, setError }) => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Login failed");
      const user = await response.json();
      setUser(user.user);
      localStorage.setItem("user", JSON.stringify(user.user));
      if (onLogin) onLogin(user.user);
      if (setError) setError(null);
      window.location.href = "/";
    } catch {
      if (setError) setError("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    if (onLogin) onLogin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch {
      // Ignore logout errors
    }
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-purple-200 pt-20 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-fridgeText text-center mb-4">
          Log in to Tabetai 🍱
        </h2>

        {/* Google Login */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const decoded = jwtDecode(credentialResponse.credential);
                const response = await fetch("/api/users/google-login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    token: credentialResponse.credential,
                    profile: decoded,
                  }),
                });
                if (!response.ok) throw new Error("Google login failed");
                const user = await response.json();
                setUser(user.user);
                localStorage.setItem("user", JSON.stringify(user.user));
                if (onLogin) onLogin(user.user);
                if (setError) setError(null);
                window.location.href = "/";
              } catch {
                if (setError) setError("Google login failed. Please try again.");
              }
            }}
            onError={() => {
              if (setError) setError("Google login failed. Please try again.");
            }}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <p className="text-sm text-center text-gray-500 mb-2">or use a username</p>

        {/* Username/Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              id="username"
              placeholder="Username"
              {...register("username")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-lavender/30 text-fridgeText placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-lavender/30 text-fridgeText placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-fridgeText font-semibold py-2 rounded-lg transition-all"
          >
            Log In
          </button>
        </form>

        {/* Logout Button */}
        <button
          style={{ marginTop: "1em" }}
          onClick={handleLogout}
          className="text-xs text-center text-gray-400 hover:text-fridgeText block w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth || {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fbeee6] via-[#f7f7f7] to-[#eaf7e6] relative">
      {/* Logo */}
      <div className="absolute top-24 left-0 right-0 flex justify-center">
        <h2 className="text-2xl font-bold">LOGO</h2>
      </div>
      {/* Login Card */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mt-32">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          By signing in, you understand and agree to{" "}
          <span className="text-[#2F3287] underline cursor-pointer">
            Xcelet Technology Terms
          </span>
          . You also consent to our{" "}
          <span className="text-[#2F3287] underline cursor-pointer">
            Privacy policies
          </span>
          .
        </p>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const result = await dispatch(login({ email, password }));
              if (result && result.type === "auth/login/fulfilled") {
                // redirect after successful login
                navigate("/");
              }
            } catch {
              // handled by slice
            }
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c7bbd] focus:border-[#7c7bbd]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c7bbd] focus:border-[#7c7bbd]"
          />
          <div className="flex justify-between text-xs text-[#7c7bbd] mb-2">
            <button type="button" className="hover:underline">
              Login with OTP
            </button>
            <button type="button" className="hover:underline">
              Forgot Password
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c7bbd] text-white py-3 rounded-lg font-medium text-base mt-2 hover:bg-[#5a599d] transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
          {error && (
            <div className="text-sm text-red-500 mt-2">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </div>
          )}
        </form>
        <div className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <span className="text-[#7c7bbd] underline cursor-pointer">
            Create new account
          </span>
        </div>
      </div>
      {/* Footer Version */}
      <div className="absolute left-8 bottom-4 text-xs text-gray-400">V 17</div>
    </div>
  );
};

export default Login;

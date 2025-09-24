import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          By signing in, you understand and agree to <span className="text-[#2F3287] underline cursor-pointer">Xcelet Technology Terms</span>. You also consent to our <span className="text-[#2F3287] underline cursor-pointer">Privacy policies</span>.
        </p>
        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c7bbd] focus:border-[#7c7bbd]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7c7bbd] focus:border-[#7c7bbd]"
          />
          <div className="flex justify-between text-xs text-[#7c7bbd] mb-2">
            <button type="button" className="hover:underline">Login with OTP</button>
            <button type="button" className="hover:underline">Forgot Password</button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#7c7bbd] text-white py-3 rounded-lg font-medium text-base mt-2 hover:bg-[#5a599d] transition"
          >
            Continue
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <span className="text-[#7c7bbd] underline cursor-pointer">Create new account</span>
        </div>
      </div>
      {/* Footer Version */}
      <div className="absolute left-8 bottom-4 text-xs text-gray-400">
        V 17
      </div>
    </div>
  );
};

export default Login;

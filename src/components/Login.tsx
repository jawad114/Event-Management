import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:9000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        toast.success("Login successful!");
        
        navigate("/events");
        setTimeout(() => {
            window.location.reload();
          }, 2000) // Redirect to the Events page
      } else {
        throw new Error("No token received");
      }
    } catch (error: any) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-3xl">
        <div className="bg-white p-6 rounded-l-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                disabled={loading} // Disable during loading
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                disabled={loading} // Disable during loading
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>.
          </p>
        </div>

        <div className="hidden items-center justify-center w-full lg:flex max-w-md pr-28">
          <img
            src={`${process.env.PUBLIC_URL}/assets/login.jpg`} // Update with your login image
            alt="Login"
            className="h-full object-cover rounded-r-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

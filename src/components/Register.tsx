import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { name, email, gender, password, confirmPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await axios.post("http://localhost:9000/api/auth/register", {
        name,
        email,
        gender,
        password,
      });
  
      const token = res.data.token;
  
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Registration successful!");
        navigate("/home");
        setTimeout(() => {
            window.location.reload();
          }, 2000);
      } else {
        throw new Error("Token not received"); 
      }
    } catch (error: any) {
      console.error("Error during registration:", error); 
      toast.error(error.response?.data?.message || "Registration failed. Try again."); 
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-3xl"> 
        <div className="bg-white p-6 rounded-l-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center">
            If you have an account, <Link to="/login" className="text-blue-500 hover:underline">click here to login</Link>.
          </p>
        </div>

        <div className="hidden items-center justify-center w-full lg:flex max-w-md">
          <img
            src={`${process.env.PUBLIC_URL}/assets/register.jpg`}
            alt="Registration"
            className="h-full object-cover rounded-r-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

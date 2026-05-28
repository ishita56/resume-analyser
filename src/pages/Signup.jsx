import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const handleSignup =
    async (e) => {

      e.preventDefault();

      try {

      const res = await axios.post(
  "https://resume-analyser-prld.onrender.com/api/auth/signup",
  {
    name,
    email,
    password,
  }
);

localStorage.setItem(
  "token",
  res.data.token
);

alert("Signup Successful");

navigate("/");
   

      } catch (error) {

        alert(
          error.response.data.message
        );
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-2xl shadow-lg w-[400px]"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-3 border rounded-xl mb-6"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Signup
        </button>

      </form>

    </div>
  );
}
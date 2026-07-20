import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import api from "../api";
function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const response = await api.post(

        "/auth/login",

        {

          username,

          password

        }

      );

      if (response.data) {

        localStorage.setItem(

          "user",

          JSON.stringify(response.data)

        );

        alert("Login Successful");

        navigate("/");

      }

      else {

        alert("Invalid Credentials");
      }

    }

    catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

<div
  className="
  min-h-screen
  flex
  items-center
  justify-center
  bg-[#F3F2F5]
  px-6
  "
>

  <div
    className="
    w-full
    max-w-[1100px]
    h-[650px]
    bg-white
    rounded-[40px]
    overflow-hidden
    shadow-2xl
    flex
    "
  >

    {/* LEFT PANEL */}

    <div
      className="
      w-1/2
      flex
      flex-col
      justify-center
      items-center
      text-white
      px-12
      rounded-r-[120px]
      "
      style={{
        background:
          "linear-gradient(135deg,#A0522D,#C86A4A,#D9A382)"
      }}
    >

      <h1 className="text-5xl font-bold mb-6">

        Welcome Back!

      </h1>

      <p className="text-center text-lg opacity-90">

        Manage procurement, sales,
        ledger, salaries and
        government transactions
        in one place.

      </p>

      <Link
        to="/signup"
        className="
        mt-10
        border-2
        border-white
        px-10
        py-3
        rounded-full
        hover:bg-white
        hover:text-[#A0522D]
        transition-all
        "
      >

        Create Account

      </Link>

    </div>

    {/* RIGHT PANEL */}

    <div
      className="
      w-1/2
      flex
      flex-col
      justify-center
      px-16
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        text-[#655C56]
        mb-2
        "
      >

        Sign In

      </h1>

      <p className="text-gray-500 mb-8">

        Rice Mill ERP System

      </p>

      <input

        type="text"

        placeholder="Username"

        value={username}

        onChange={(e)=>
          setUsername(e.target.value)
        }

        className="
        w-full
        p-4
        rounded-xl
        bg-[#F8F8F8]
        border
        mb-4
        "
      />

      <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={(e)=>
          setPassword(e.target.value)
        }

        className="
        w-full
        p-4
        rounded-xl
        bg-[#F8F8F8]
        border
        mb-6
        "
      />

      <button

        onClick={login}

        className="
        bg-[#A0522D]
        hover:bg-[#8B4513]
        text-white
        py-4
        rounded-xl
        font-semibold
        transition-all
        "

      >

        LOGIN

      </button>

      <p
        className="
        text-center
        mt-8
        text-gray-500
        "
      >

        New User?

        <Link
          to="/signup"
          className="
          ml-2
          text-[#A0522D]
          font-semibold
          "
        >

          Create Account

        </Link>

      </p>

    </div>

  </div>

</div>

);
}

export default Login;

import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import api from "../api";
function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      millName: "",

      username: "",

      password: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });
  };

  const signup = async () => {

    try {

      api.post(

        "/auth/signup",

        formData

      );

      alert("Signup Successful");

      navigate("/login");

    }

    catch (error) {

      console.log(error);
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
    h-[700px]
    bg-white
    rounded-[40px]
    overflow-hidden
    shadow-2xl
    flex
    "
  >

    {/* LEFT */}

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

        Create Account

      </h1>

      <p className="text-gray-500 mb-8">

        Register your Rice Mill

      </p>

      <input

        type="text"

        name="millName"

        placeholder="Mill Name"

        value={formData.millName}

        onChange={handleChange}

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

        type="text"

        name="username"

        placeholder="Username"

        value={formData.username}

        onChange={handleChange}

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

        name="password"

        placeholder="Password"

        value={formData.password}

        onChange={handleChange}

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

        onClick={signup}

        className="
        bg-[#A0522D]
        hover:bg-[#8B4513]
        text-white
        py-4
        rounded-xl
        font-semibold
        "

      >

        CREATE ACCOUNT

      </button>

    </div>

    {/* RIGHT */}

    <div
      className="
      w-1/2
      flex
      flex-col
      justify-center
      items-center
      text-white
      px-12
      rounded-l-[120px]
      "
      style={{
        background:
          "linear-gradient(135deg,#A0522D,#C86A4A,#D9A382)"
      }}
    >

      <h1 className="text-5xl font-bold mb-6">

        Hello Friend!

      </h1>

      <p className="text-center text-lg">

        Already have an account?

      </p>

      <Link

        to="/login"

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

        LOGIN

      </Link>

    </div>

  </div>

</div>

);
}

export default Signup;
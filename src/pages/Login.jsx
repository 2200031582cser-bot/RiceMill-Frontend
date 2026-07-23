const login = async () => {
  try {

    console.log("Button clicked");

    const response = await api.post("/auth/login", {
      username,
      password
    });

    console.log("Full Response", response);
    console.log("Response Data", response.data);

    if (response.data) {

      console.log("Inside IF");

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } else {

      console.log("Inside ELSE");

      alert("Invalid Credentials");

    }

  } catch (e) {

    console.error("Catch Block", e);

    alert("Login Failed");

  }
};

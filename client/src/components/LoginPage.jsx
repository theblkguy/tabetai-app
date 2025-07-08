import React from "react";
//useform is useful to make a register option
import { useForm } from "react-hook-form";

//make a login page function

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

//make a submit function to return login data, validation is triggered on submitevent

//the form data is received like an object
const onSubmit = (data) => {
  //idk maybe this will get info from the backend idk yet
  console.log("Login data:", data);
}

  return (
    <>
    <h2> Login </h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" {...register("username")} />
      </div>
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" {...register("password")} />

      <button type="submit">Log In</button>
    </form>
    </>
  );
};

export default LoginPage;
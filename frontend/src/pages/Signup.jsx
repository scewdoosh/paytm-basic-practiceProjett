// Signup.jsx
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading"; // Assuming you have a Heading component
import { Button } from "../components/Button"; // Assuming you have a Button component
import { BottomWarning } from "../components/BottomWarning"; // Assuming you have a BottomWarning component
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) =>{
            setFirstName(e.target.value)
          }} placeholder="Lewis" label={"First Name"} />
          <InputBox onChange={(e) =>{
            setLastName(e.target.value)
          }} placeholder="Hamilton" label={"Last Name"} />
          <InputBox onChange={(e) =>{
            setUserName(e.target.value)
          }} placeholder="abcxyz@gmail.com" label={"Email"} />
          <InputBox onChange={(e) =>{
            setPassword(e.target.value)
          }} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button onClick={async () => {
    await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      firstName,
      lastName,
      password,
    })
    .then((res) => {
      console.log("Signup success:", res.data);
      localStorage.setItem("token",res.data.token);
    })
    .catch((err) => {
      console.error("Signup failed:", err.response?.data || err.message);
    });
  
            }} label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
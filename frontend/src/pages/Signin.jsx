// Signin.jsx
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
  return (
    // Outer container with light background
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
        {/* Inner card for the sign-in form */}
        <div className="rounded-lg bg-white text-center p-2 h-max w-80 px-4 shadow-lg"> {/* Adjusted width and padding */}
          {/* Heading for the Sign-in form */}
          <Heading label={"Sign in"} />
          {/* Sub-heading for instructions */}
          <SubHeading label={"Enter your credentials to access your account"} />
          {/* Input field for Email */}
          <InputBox placeholder="abcxyz@gmail.com" label={"Email"} />
          {/* Input field for Password */}
          <InputBox placeholder="123456" label={"Password"} type="password" />
          <div className="pt-4">
            {/* Sign-in button */}
            <Button label={"Sign in"} />
          </div>
          {/* Bottom warning for users who don't have an account */}
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};
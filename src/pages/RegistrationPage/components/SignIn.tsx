import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">Sign Up</h1>
      <p>Enter Your Infromation</p>
      <form className="flex flex-col gap-5">
        <label>
          <p className="mb-2 mx-0.5">UserName</p>
          <input
            type="text"
            className="w-[470px] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Full Name</p>
          <input
            type="text"
            className="w-[470px] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Email</p>
          <input
            type="text"
            className="w-[470px] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Password</p>
          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              className="w-[470px] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
            />
            {showPassword ? (
              <FaEye
                className="cursor-pointer text-md absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            ) : (
              <FaEyeSlash
                className="cursor-pointer text-lg absolute right-3 top-1/2 transform  -translate-y-1/2"
                onClick={() => setShowPassword((current) => !current)}
              />
            )}
          </div>
        </label>
        <input
          className="w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow mt-5 outline-none cursor-pointer"
          value={"SIGN UP"}
          type="submit"
        />
      </form>
      <div className="flex gap-5 mt-14">
        <p>Privacy Policy</p>
        <p>FAQ</p>
        <p>Contact Us</p>
      </div>
    </div>
  );
}

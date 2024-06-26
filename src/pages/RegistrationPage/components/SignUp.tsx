import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API } from "../../../baseAPI";
import InputMessageComp from "../../../components/InputMessage";

export default function SignUp(props: { setIsLogging: Function }) {
  interface submitInfoInterface {
    messageColor: boolean | undefined;
    message: string;
  }
  const [submitInfo, setSubmitInfo] = useState<any>({
    messageColorBoolean: undefined,
    message: "",
  });
  const [formValue, setFormValue] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: 1,
  });
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleFormsubmit = (e: any) => {
    e.preventDefault();

    axios
      .post(`${API}/auth/register`, {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        name: formValue.name,
        avatar: 5,
      })
      .then((res: any) => {
        setSubmitInfo({
          messageColorBoolean: true,
          message: res.data,
        });
        setTimeout(() => {
          props.setIsLogging(true);
        }, 1500);
      })
      .catch((err) => {
        setSubmitInfo({
          messageColorBoolean: false,
          message: err.response.data,
        });
        console.log(err);
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full ">
      <h1 className="text-2xl">Sign Up</h1>
      <p>Enter Your Infromation</p>
      <form
        className="flex flex-col gap-5 lg:w-full"
        onSubmit={handleFormsubmit}
      >
        <label>
          <p className="mb-2 mx-0.5">UserName</p>
          <input
            name="username"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.username}
            required
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Full Name</p>
          <input
            name="name"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.name}
            required
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Email</p>
          <input
            name="email"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.email}
            required
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Password</p>
          <div className="relative ">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent"
              onChange={handleInput}
              value={formValue.password}
              required
              min={5}
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
        {submitInfo.messageColorBoolean !== undefined && (
          <InputMessageComp
            boolean={submitInfo.messageColorBoolean}
            message={
              submitInfo.messageColorBoolean
                ? "Account Created Succesfully"
                : submitInfo.message
            }
          />
        )}
        <input
          className="w-[470px] lg:w-[100%] py-5 bg-yellowButton rounded-md shadow-yellowShadow mt-5 outline-none cursor-pointer hover:bg-yellowButtonHover transition-all"
          value={"SIGN UP"}
          type="submit"
        />
      </form>
      <div className="flex gap-5 mt-14 lg:mb-14">
        <p>Privacy Policy</p>
        <p>FAQ</p>
        <p>Contact Us</p>
      </div>
    </div>
  );
}

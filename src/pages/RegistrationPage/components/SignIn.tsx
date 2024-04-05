import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VerificationPannel from "./VerificationPannel";
import ForgotPassword from "./ForgotPassword";

export default function SignUp() {
  const [userTOKEN, setUserTOKEN] = useState("");
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState<loginTypes>({
    isVerifyed: undefined,
    userEmail: "",
  });

  interface loginTypes {
    userEmail: string;
    isVerifyed: null | true | undefined;
  }
  useEffect(() => {
    loginInfo.isVerifyed === null &&
      axios.post(
        `https://dull-erin-marlin-cuff.cyclic.app/api/auth/register/verify`,
        {
          email: loginInfo.userEmail,
        }
      );
  }, [loginInfo.isVerifyed]);
  useEffect(() => {
    userTOKEN &&
      axios
        .get(`https://dull-erin-marlin-cuff.cyclic.app/api/auth/${userTOKEN}`)
        .then((res) =>
          setLoginInfo({
            isVerifyed: res.data.verifyed,
            userEmail: res.data.email,
          })
        );
  }, [userTOKEN]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`https://dull-erin-marlin-cuff.cyclic.app/api/auth/login`, {
        username: inputValues.username,
        password: inputValues.password,
      })
      .then((res) => setUserTOKEN(res.data));
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return false ? (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl">Sign In</h1>
      <p>Enter Your Infromation</p>
      <form className="flex flex-col gap-5" onSubmit={loginSubmit}>
        <label>
          <p className="mb-2 mx-0.5">UserName</p>
          <input
            onChange={handleInput}
            value={inputValues.username}
            type="text"
            name="username"
            className="w-[470px] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
          />
        </label>
        <label>
          <p className="mb-2 mx-0.5">Password</p>
          <div className="relative ">
            <input
              name="password"
              onChange={handleInput}
              value={inputValues.password}
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
        <p className="cursor-pointer">Forgot Password?</p>
        <button
          className="w-[470px] py-5 bg-yellowButton rounded-md shadow-yellowShadow mt-5 hover:bg-yellowButtonHover transition-all"
          //   onClick={signInRequest}
        >
          SIGN IN
        </button>
      </form>
      <div className="flex gap-5 mt-14">
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">FAQ</p>
        <p className="cursor-pointer">Contact Us</p>
      </div>

      <VerificationPannel isVerifyed={loginInfo.isVerifyed} />
    </div>
  ) : (
    <ForgotPassword />
  );
}

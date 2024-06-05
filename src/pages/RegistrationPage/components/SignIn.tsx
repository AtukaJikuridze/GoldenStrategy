import axios from "axios";
import { useEffect, useState } from "react";
import VerificationPannel from "./VerificationPannel";
import ForgotPassword from "./ForgotPassword";
import SignInForm from "./SignInForm";
import { MyContext } from "../../../Context/myContext";
import { useContext } from "react";
import { API } from "../../../baseAPI";
interface loginTypes {
  userEmail: string;
  isVerifyed: null | true | undefined;
}

export default function SignUp() {
  const context = useContext(MyContext);

  const [userTOKEN, setUserTOKEN] = useState("satestod mere washale"); // useris tokeni getidan modis

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: "",
    password: "",
  }); // aq rac iwereba inputebshi dinamiurad icvleba am stateshic
  const [loginInfo, setLoginInfo] = useState<loginTypes>({
    isVerifyed: undefined,
    userEmail: "",
  }); // login s ro achers eg info modis aq rac chaiwereba
  const [forgotPassword, setForgotPassword] = useState<boolean>(false); // tu true aris gamoitans parolis shecvlis fanjaras
  const [showPassword, setShowPassword] = useState<boolean>(false); // parolis chaweris velshi ro gamoachino pass tvalis gilakze dacherit

  useEffect(() => {
    loginInfo.isVerifyed === null &&
      axios.post(`${API}/auth/register/verify`, {
        email: loginInfo.userEmail,
      });
  }, [loginInfo.isVerifyed]);

  useEffect(() => {
    userTOKEN &&
      axios
        .get(
          `${API}/users/${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF2dG8iLCJpYXQiOjE3MTc1ODgxMDV9.fRvaPKtnOHsKG6l9CC8nzEZIcTJhyKLNaKsnUNNBq98"}`
        )
        .then((res) => {
          setLoginInfo({
            isVerifyed: res.data.verifyed,
            userEmail: res.data.email,
          });
          context?.setUserInfo(res);
        });
  }, [userTOKEN]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${API}/auth/login`, {
        usernameOrEmail: inputValues.usernameOrEmail,
        password: inputValues.password,
      })
      .then((res) => setUserTOKEN(res.data));
  }; // eshveba request login ze

  return !forgotPassword ? (
    <div className="flex flex-col justify-center items-center gap-5">
      {loginInfo.isVerifyed === null ? (
        <VerificationPannel setLoginInfo={setLoginInfo} />
      ) : (
        <>
          <h1 className="text-2xl">Sign In</h1>
          <p>Enter Your Infromation</p>
          <SignInForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setForgotPassword={setForgotPassword}
            loginSubmit={loginSubmit}
            handleInput={handleInput}
            inputValues={inputValues}
          />
          <div className="flex gap-5 mt-14">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">FAQ</p>
            <p className="cursor-pointer">Contact Us</p>
          </div>{" "}
        </>
      )}
    </div>
  ) : (
    <ForgotPassword setForgotPassword={setForgotPassword} />
  );
}

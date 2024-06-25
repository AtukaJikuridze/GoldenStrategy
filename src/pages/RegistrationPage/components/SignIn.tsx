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

  const [userTOKEN, setUserTOKEN] = useState("satestod mere washale");

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState<loginTypes>({
    isVerifyed: undefined,
    userEmail: "",
  });

  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (loginInfo.isVerifyed === null) {
      axios.post(`${API}/auth/register/verify`, {
        email: loginInfo.userEmail,
      });
    }
  }, [loginInfo.isVerifyed]);

  useEffect(() => {
    if (userTOKEN) {
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
    }
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
      .then((res) => {
        if (res.data === false) {
          setErrorMessage(
            "თქვენ არ გაქვთ რეგისტრაციის საფასური გადახდილი, მოგვწერეთ Facebook - ფეიჯზე"
          );
        } else {
          setUserTOKEN(res.data);
          context?.setIsLoggined(true);
          localStorage.setItem("Token", res?.data);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return !forgotPassword ? (
    <div className="flex flex-col justify-center items-center gap-5">
      {errorMessage && (
        <div className="bg-bgBlackTransparent w-full h-[100%] fixed  left-0 top-0 flex items-center justify-center z-[1000]">
          <div className="bg-cardBgBlack p-5 rounded-lg shadow-lg relative h-[300px] w-[500px] lg:w-[80%] lg:h-[40%]">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full"
            >
              &times;
            </button>
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center text-[17px] mb-3">{errorMessage}</p>
              <span>
                შესაძენად დააკლიკეთ{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=61561387173137"
                  target="blank"
                  className="text-blue-400"
                >
                  აქ
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      {loginInfo.isVerifyed === null ? (
        <VerificationPannel setLoginInfo={setLoginInfo} />
      ) : (
        <>
          <h1 className="text-2xl">Sign In</h1>
          <p>Enter Your Information</p>
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
          </div>
        </>
      )}
    </div>
  ) : (
    <ForgotPassword setForgotPassword={setForgotPassword} />
  );
}

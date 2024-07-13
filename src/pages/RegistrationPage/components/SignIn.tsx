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
}

export default function SignUp() {
  const context = useContext(MyContext);

  const [userTOKEN, setUserTOKEN] = useState("");
  const [isUserVerified, SetIsUserVerified] = useState<null | undefined | true>(
    undefined
  );

  const [inputValues, setInputValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState<loginTypes>({ userEmail: "" });
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    console.log(isUserVerified);

    if (isUserVerified === null) {
      console.log(loginInfo);
      axios.post(`${API}/auth/register/verify`, { email: loginInfo.userEmail });
    }
  }, [isUserVerified]);

  useEffect(() => {
    if (userTOKEN) {
      console.log(userTOKEN);
      axios
        .post(`${API}/users/${userTOKEN}`, { language: context?.language })
        .then((res) => {
          console.log(res);
          context?.setUserInfo(res.data);
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
        if (res.data.status === "you are not verified") {
          setLoginInfo({ userEmail: res.data.email });
          SetIsUserVerified(null);
        } else if (res.data.status === "payment status is not valid") {
          setErrorMessage(
            "You have not paid the registration fee, write to us on Facebook page"
          );
        } else {
          setUserTOKEN(res.data.token);
          context?.setIsLoggined(true);
          localStorage.setItem("Token", res.data.token);
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage("Username/email or password is incorrect");
      });
  };

  return !forgotPassword ? (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full ">
      {errorMessage && (
        <div className="bg-bgBlackTransparent w-full h-[100%] fixed left-0 top-0 flex items-center justify-center z-[1000]">
          <div className="bg-cardBgBlack p-5 rounded-lg shadow-lg relative h-[300px] w-[500px] lg:w-[80%] lg:h-[40%]">
            <button
              onClick={() => setErrorMessage("")}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full"
            >
              &times;
            </button>
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-center text-[17px] mb-3">{errorMessage}</p>
              {errorMessage !== "Username/email or password is incorrect" ? (
                <span>
                  Click to buy{" "}
                  <a
                    href="https://www.facebook.com/profile.php?id=61561387173137"
                    target="blank"
                    className="text-blue-400"
                  >
                    here
                  </a>
                </span>
              ) : (
                <h1>Please enter correct user details</h1>
              )}
            </div>
          </div>
        </div>
      )}

      {isUserVerified === null ? (
        <VerificationPannel SetIsUserVerified={SetIsUserVerified} />
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
          <div className="flex gap-5 mt-14 lg:mb-14">
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

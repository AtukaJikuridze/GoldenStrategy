import axios from "axios";
import { useEffect, useState } from "react";
import VerificationPannel from "./VerificationPannel";
import ForgotPassword from "./ForgotPassword";
import SignInForm from "./SignInForm";
import { MyContext } from "../../../Context/myContext";
import { useContext } from "react";
import { API } from "../../../baseAPI";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";

interface loginTypes {
  userEmail: string;
}

export default function SignUp() {
  const context = useContext(MyContext);
  let deflanguage: any = [];
  const gotLanguage = context?.defaultLanguage;
  if (gotLanguage == "EN") {
    deflanguage = languageData_en;
  } else {
    deflanguage = languageData_ge;
  }

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
      axios
        .post(`${API}/users`, { language: "EN", token: userTOKEN })
        .then((res) => {
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
        language: "EN",
      })
      .then((res) => {
        if (
          res.data.status === "you are not verified" ||
          res.data.status === "თქვენ გავლილი არ გაქვთ ვერიფიკაცია"
        ) {
          setLoginInfo({ userEmail: res.data.email });
          SetIsUserVerified(null);
        } else if (
          res.data.status ===
            "You have not paid the registration fee, write to us on Facebook page" ||
          res.data.status ===
            "თქვენ არ გაქვთ გადახდილი რეგისტრაციის საფასური მოგვწერეთ ფეისბუკ ფეიჯზე"
        ) {
          setErrorMessage(res.data.status);
        } else {
          setUserTOKEN(res.data.token);
          context?.setIsLoggined(true);
          localStorage.setItem("Token", res.data.token);
          window.location.reload();
        }
      })
      .catch(() => {
        setErrorMessage(deflanguage.loginPage.incorrect);
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
              {errorMessage !== deflanguage.loginPage.incorrect ? (
                <span>
                  {deflanguage.loginPage.click} {""}

                  <a
                    href="https://www.facebook.com/profile.php?id=61561387173137"
                    target="blank"
                    className="text-blue-400"
                  >
                    {deflanguage.loginPage.here}
                  </a>
                </span>
              ) : (
                <h1>{deflanguage.loginPage.enterCorrectDetails}</h1>
              )}
            </div>
          </div>
        </div>
      )}

      {isUserVerified === null ? (
        <VerificationPannel SetIsUserVerified={SetIsUserVerified} />
      ) : (
        <>
          <h1 className="text-2xl"></h1>
          <p>{deflanguage.loginPage.enterInfo}</p>
          <SignInForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            setForgotPassword={setForgotPassword}
            loginSubmit={loginSubmit}
            handleInput={handleInput}
            inputValues={inputValues}
          />
          <div className="flex gap-5 mt-14 lg:mb-14">
            <p className="cursor-pointer">{deflanguage.loginPage.privPol}</p>
            <p className="cursor-pointer">{deflanguage.loginPage.faq}</p>
            <p className="cursor-pointer">{deflanguage.loginPage.contact}</p>
          </div>
        </>
      )}
    </div>
  ) : (
    <ForgotPassword setForgotPassword={setForgotPassword} />
  );
}

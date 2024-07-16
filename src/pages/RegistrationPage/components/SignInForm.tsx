import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MyContext } from "../../../Context/myContext";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";

interface formTypes {
  showPassword: boolean;
  setShowPassword: Function;
  setForgotPassword: Function;
  loginSubmit: (e: any) => void;
  handleInput: (e: any) => void;
  inputValues: {
    usernameOrEmail: string;
    password: string;
  };
}

export default function SignInForm({
  loginSubmit,
  inputValues,
  handleInput,
  showPassword,
  setShowPassword,
  setForgotPassword,
}: formTypes) {
  const context = useContext(MyContext);
  let deflanguage: any = [];
  const gotLanguage = context?.defaultLanguage;
  if (gotLanguage == "EN") {
    deflanguage = languageData_en;
  } else {
    deflanguage = languageData_ge;
  }
  return (
    <form
      className="flex flex-col gap-5 xl:w-[50%] md:!w-full "
      onSubmit={loginSubmit}
    >
      <label>
        <p className="mb-2 mx-0.5">{deflanguage.loginPage.UserName}</p>
        <input
          onChange={handleInput}
          value={inputValues.usernameOrEmail}
          type="text"
          name="usernameOrEmail"
          className="w-[470px] xl:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
        />
      </label>
      <label>
        <p className="mb-2 mx-0.5">{deflanguage.loginPage.Password}</p>
        <div style={{ zIndex: 0, position: "relative" }}>
          <input
            name="password"
            onChange={handleInput}
            value={inputValues.password}
            type={showPassword ? "text" : "password"}
            className="w-[470px] xl:w-[100%] h-[50px] rounded-md border border-gray-600 pr-10 outline-none px-3 text-sm bg-transparent "
          />
          {showPassword ? (
            <FaEye
              className="cursor-pointer text-md absolute right-3 top-1/2 transform  -translate-y-1/2"
              onClick={() => setShowPassword((current: boolean) => !current)}
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer text-lg absolute right-3 top-1/2 transform  -translate-y-1/2"
              onClick={() => setShowPassword((current: boolean) => !current)}
            />
          )}
        </div>
      </label>
      <p className="cursor-pointer" onClick={() => setForgotPassword(true)}>
       {deflanguage.loginPage.forgot}
      </p>
      <input
        value={deflanguage.loginPage.signIn}
        type="submit"
        className="text-center cursor-pointer w-[470px] xl:w-[100%] py-5 bg-yellowButton rounded-md shadow-yellowShadow mt-5 hover:bg-yellowButtonHover transition-all"
      />
    </form>
  );
}

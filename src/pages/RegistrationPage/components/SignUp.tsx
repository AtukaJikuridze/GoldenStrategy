import axios from "axios";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API } from "../../../baseAPI";
import InputMessageComp from "../../../components/InputMessage";
import { MyContext } from "../../../Context/myContext";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";

export default function SignUp(props: { setIsLogging: Function }) {
  const context = useContext(MyContext);
  interface submitInfoInterface {
    messageColorBoolean: boolean | undefined;
    message: string;
  }
  const [submitInfo, setSubmitInfo] = useState<submitInfoInterface>({
    messageColorBoolean: undefined,
    message: "",
  });
  const [formValue, setFormValue] = useState({
    username: "",
    referralCode: "",
    email: "",
    password: "",
    avatar: "1",
  });
  console.log(formValue);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleFormsubmit = (e: any) => {
    e.preventDefault();

    console.log(formValue);
    console.log(formValue.referralCode ? formValue.referralCode : null);

    axios
      .post(`${API}/auth/register`, {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        avatar: formValue.avatar,
        referralCode: formValue.referralCode ? formValue.referralCode : null,
        language: context?.language,
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
 let deflanguage: any = [];
 const gotLanguage = context?.defaultLanguage;
 if (gotLanguage == "EN") {
   deflanguage = languageData_en;
 } else {
   deflanguage = languageData_ge;
 }
  return (
    <div className="flex flex-col justify-center items-center gap-5 xl:w-full ">
      <h1 className="text-2xl">{deflanguage.loginPage.signUp}</h1>
      <p>{deflanguage.loginPage.enterInfo}</p>
      <form
        className="flex flex-col gap-5 lg:w-full"
        onSubmit={handleFormsubmit}
      >
        <label>
          <p className="mb-2 mx-0.5">{deflanguage.loginPage.user}</p>
          <input
            name="username"
            type="text"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.username}
            required
          />
        </label>

        <label className="">
          <p className="mb-2 mx-0.5">{deflanguage.loginPage.gender}</p>

          <select
            name="avatar"
            required
            onChange={handleInput}
            className=" bg-transparent w-[470px] py-3 outline-none border-gray-600 border  rounded-md px-3 lg:w-[100%] "
          >
            <option value="1" className="bg-black  rounded-md px-3">
              {deflanguage.loginPage.male}
            </option>
            <option value="0" className="bg-black  rounded-md px-3">
              {deflanguage.loginPage.female}
            </option>
          </select>
        </label>

        <label>
          <p className="mb-2 mx-0.5">{deflanguage.loginPage.email}</p>
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
          <p className="mb-2 mx-0.5">{deflanguage.loginPage.Password}</p>
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
        <label>
          <p className="mb-2 mx-0.5">{deflanguage.loginPage.refCode}</p>
          <input
            name="referralCode"
            type="number"
            className="w-[470px] lg:w-[100%] h-[50px] rounded-md border border-gray-600 outline-none px-3 text-sm bg-transparent"
            onChange={handleInput}
            value={formValue.referralCode}
          />
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
          value={deflanguage.loginPage.signUp}
          type="submit"
        />
      </form>
      <div className="flex gap-5 mt-14 lg:mb-14">
        <p className="cursor-pointer">{deflanguage.loginPage.privPol}</p>
        <p className="cursor-pointer">{deflanguage.loginPage.faq}</p>
        <p className="cursor-pointer">{deflanguage.loginPage.contact}</p>
      </div>
    </div>
  );
}

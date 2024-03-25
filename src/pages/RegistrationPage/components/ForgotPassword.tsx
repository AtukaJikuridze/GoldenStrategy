import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [emailAdress, setEmailAdress] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const submitEmail = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `https://dull-erin-marlin-cuff.cyclic.app/api/auth/forgotpassword`,
        {
          email: emailAdress,
        }
      )
      .then((res) => console.log(res));
  };
  const submitNewPassword = (e: any) => {
    e.preventDefault();

    axios
      .put(`https://dull-erin-marlin-cuff.cyclic.app/api/auth/forgotpassword`, {
        verificationCode,
        newPassword,
      })
      .then((res) => console.log(res));
  };

  return (
    <div
      className={`w-full h-full absolute bg-bgBlackTransparent left-0 top-0 flex justify-center items-center transition-opacity duration-150 ${
        // context?.emailForVerification
        true ? "visible opacity-100" : "invisible opacity-0 "
      } `}
    >
      <div className="rounded-xl bg-white w-[60%] h-[60%] flex items-center pb-14 flex-col gap-10 text-black justify-center">
        <h1 className=" text-2xl"> Please Enter Your Email Adress..</h1>
        <div className="flex gap-5 items-center">
          <p className="text-2xl">Email :</p>
          <input
            type="text"
            className="border p-2 outline-none"
            onChange={(e) => setEmailAdress(e.target.value)}
            value={emailAdress}
          />
          <button className=" border p-2" onClick={submitEmail}>
            Submit
          </button>
        </div>
        <hr className="bg-black-400 w-full" />
        <input
          type="text"
          className="border p-2 outline-none"
          onChange={(e) => setVerificationCode(e.target.value)}
          value={verificationCode}
          placeholder="code"
        />
        <input
          type="text"
          className="border p-2 outline-none"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          placeholder="new pass"
        />
        <button className=" border p-2" onClick={submitNewPassword}>
          Submit
        </button>
        <h1 className="text-2xl">Check Your Email For Code</h1>
      </div>
    </div>
  );
}

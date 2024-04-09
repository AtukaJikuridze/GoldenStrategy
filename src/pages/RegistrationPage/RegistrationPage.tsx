import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useState } from "react";
import RegistrationLeftside from "./components/RegistrationLeftside";

export default function RegistrationPage() {
  const [isLogging, setIsLogging] = useState(true); // თუ isLoggging არის True რეგისტრაციის ფეიჯზე გამოიტანს Login პანელს თუარადა Sign Up ის

  return (
    <div className="relative p-16 h-full  ">
      {/* <SelectLanguage /> */}
      <main className="py-[80px] text-white flex justify-around items-center h-full  ">
        <RegistrationLeftside
          isLogging={isLogging}
          setIsLogging={setIsLogging}
        />
        {isLogging ? <SignUp /> : <SignIn />}
      </main>
    </div>
  );
}

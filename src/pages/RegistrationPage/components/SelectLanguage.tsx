import { useContext } from "react";
import { MyContext } from "../../../Context/myContext";

export default function SelectLanguage() {
  const context = useContext(MyContext);

  return (
    <div>
      <select
        onChange={(e) => context?.setDefaultLanguage(e.target.value)}
        value={context?.defaultLanguage}
        className="z-10 bg-cardBgBlack flex justify-between items-center text-white text-xl p-2 rounded-md outline-none font-interM absolute top-10 right-10 border border-yellow-500"
      >
        <option value="EN">EN</option>
        <option value="GE">GE</option>
      </select>
    </div>
  );
}

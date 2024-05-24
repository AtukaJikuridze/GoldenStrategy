import { useContext, useState } from "react";
import user from "../assets/user.svg";
import bell from "../assets/bell.svg";
import logout from "../assets/logout.svg";
import { MyContext } from "../Context/myContext";
export default function Navbar() {
  const context = useContext(MyContext);

  const links = [
    {
      title: "Dashboard",
      linkTo: "",
    },
    {
      title: "FAQ",
      linkTo: "",
    },
    {
      title: "Shop",
      linkTo: "",
    },
  ];

  const [activeLink, setActiveLink] = useState<number>(0);

  return (
    <nav className="myContainer flex justify-between items-center  h-24 my-8 ">
      <div className=" rounded-[30px]   border-yellowButton border p-4 px-8 cursor-pointer">
        <p className="text-sm">Golden Strategy</p>
      </div>

      <div className="bg-cardBgBlack py-5 px-8 rounded-xl flex items-center gap-5 ">
        <img src={user} alt="" />
        <p className="text-sm">{context?.userInfo?.username}</p>
      </div>

      <div className="flex justify-between  h-full bg-cardBgBlack px-14 rounded-xl w-[50%]">
        <div>
          <ul className="flex gap-10 h-full items-center ">
            {links.map((e, i) => (
              <li
                key={i}
                className={`cursor-pointer transition-all relative h-full flex justify-center items-center  ${
                  activeLink === i ? "text-white" : "text-gray-400"
                } `}
                onClick={() => setActiveLink(i)}
              >
                {e.title}

                <div
                  className={`${
                    activeLink === i ? "opacity-100" : "opacity-0"
                  } border-b w-full border-[2px] transition-all rounded-xl absolute bottom-0 left-0 border-yellowButton `}
                ></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-full items-center flex gap-5">
          <img src={bell} alt="notifications" className="cursor-pointer" />
          <img src={logout} alt="logout" className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}

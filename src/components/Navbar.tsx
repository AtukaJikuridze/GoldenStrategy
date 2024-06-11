import { useContext, useState } from "react";
import user from "../assets/user.svg";
import bell from "../assets/bell.svg";
import logout from "../assets/logout.svg";
import { MyContext } from "../Context/myContext";
export default function Navbar() {
  const context = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

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
    <nav
      className={`myContainer flex justify-between items-center transition-all duration-300  h-24 my-8 lg:z-10 lg:fixed lg:top-0 left-[50%] lg:-translate-x-1/2 lg:flex-col lg:gap-4 lg:justify-normal lg:bg-cardBgBlack lg:w-[100%] md:!w-[100%] lg:overflow-hidden  ${
        isOpen ? "h-[480px]" : ""
      } `}
    >
      <div className=" rounded-[30px]   border-yellowButton border p-4 px-8 cursor-pointer lg:order-3  sm:p-3 sm:px-12  ">
        <p className="text-sm sm:text-[12px]">Golden Strategy</p>
      </div>

      <div className="bg-cardBgBlack py-5 px-8 rounded-xl flex items-center gap-5  order-1 lg:gap-12">
        <div className="flex items-center gap-5">
          <img src={user} alt="" />
          <p className="text-sm">{context?.userInfo?.username}Hellokitty</p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none relative w-[40px] lg:block hidden"
        >
          <div className={`hamburger ${isOpen ? "open" : ""}`}>
            <span className="block w-8 h-1 bg-white mb-[6px]"></span>
            <span className="block w-8 h-1 bg-white mb-[6px]"></span>
            <span className="block w-8 h-1 bg-white"></span>
          </div>
        </button>
      </div>

      <div className="flex justify-between  h-full bg-cardBgBlack px-14 rounded-xl w-[50%] xl:px-5 order-2 lg:flex-col lg:items-center lg:gap-10 lg:w-full lg:p-5 lg:h-[260px]">
        <div>
          <ul className="flex gap-10 h-full items-center lg:flex-col ">
            {links.map((e, i) => (
              <li
                key={i}
                className={`cursor-pointer transition-all relative h-full flex justify-center items-center sm:text-sm  ${
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
          <img
            src={bell}
            alt="notifications"
            className="cursor-pointer sm:w-5"
          />
          <img src={logout} alt="logout" className="cursor-pointer sm:w-5" />
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import "./navbar.css";

type Props = {
  onToggleSidebar: () => void;
};

export const Navbar: React.FC<Props> = ({ onToggleSidebar }) => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={onToggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="#" className="flex ml-2 md:mr-24 items-center">
                <img
                  src="/src/assets/saketa-logo.svg"
                  className="h-6 lg:h-10 mr-3 md:h-8"
                  alt="Saketa Logo"
                />
                <div className="flex flex-col">
                  <span className=" text-xl font-semibold sm:text-2xl title-size whitespace-nowrap text-blue">
                    Employee Directory
                  </span>
                  <span className="text-black text-sm sm:text-md subtitle-size">
                    The Ultimate People Directory Experience
                  </span>
                </div>
              </a>
            </div>
            <div className="flex items-baseline text-base md:text-lg lg:text-xl ">
              <h2 className=" text-transparent  sm:text-blue">
                Welcome,{" "}
                <span className="text-transparent sm:text-black font-medium">
                  Andrew Philip
                </span>
              </h2>
              <img
                src="/src/assets/rohith huri.jfif"
                className="w-10 sm:w-14 rounded-full screen-img"
                alt="Profile Picture"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

//Custom Navbar Only for Later Use
{
  /* <header className="flex items-center justify-between p-5 bg-white border-b sm:px-16 sm:py-6">
      <div className="flex items-center">
        <img
          src="/src/assets/saketa-logo.svg"
          className="w-32 pr-5 sm:w-48"
          alt="Saketa Logo"
        />
        <div className="flex flex-col">
          <h1 className="text-blue text-3xl sm:text-4xl">Employee Directory</h1>
          <p className="text-black text-lg sm:text-xl">
            The Ultimate People Directory Experience
          </p>
        </div>
      </div>
      <div className="flex items-baseline">
        <h2 className="text-blue text-2xl sm:text-3xl">
          Welcome,{" "}
          <span className="text-black font-medium pr-2 sm:pr-5">
            Andrew Philips
          </span>
        </h2>
        <img
          src="/src/assets/rohith huri.jfif"
          className="w-12 sm:w-16 rounded-full"
          alt="Profile Picture"
          />
          </div>
        </header> */
}

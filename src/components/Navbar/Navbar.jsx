import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import { useContext, useEffect } from "react";
import { Tokencontext } from "../../Tokencontext/Tokencontext";

export default function Navbar() {
  const { Token, setToken } = useContext(Tokencontext);
  let navigate = useNavigate();
  function logout() {
    if (Token) {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("token")); //handle refresh
    console.log(Token);
  }, []);

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 sticky z-[99999] top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {Token ? (
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? `${style.active} block py-2 px-3 md:p-0  md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`
                        : ` py-2 px-3 md:p-0 md:bg-transparent md:dark:text-blue-500 hover:text-blue-700 dark:bg-blue-600 md:dark:bg-transparent`
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
              ) : null}

              {Token ? (
                <li>
                  <a
                    onClick={() => logout()}
                    className=" py-2 cursor-pointer px-3 md:p-0 rounded  md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className={({ isActive }) =>
                        isActive
                          ? `${style.active} block py-2 px-3 md:p-0 rounded  hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                          : ` py-2 px-3 md:p-0 rounded   hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="register"
                      className={({ isActive }) =>
                        isActive
                          ? `${style.active} block py-2 px-3 md:p-0 rounded hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                          : ` py-2 px-3 md:p-0 rounded   hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

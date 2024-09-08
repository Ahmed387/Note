import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Tokencontext } from "../../Tokencontext/Tokencontext";
export default function Login() {
  const [isVisible, setisVisible] = useState(false);
  let navigate = useNavigate();
  let { setToken } = useContext(Tokencontext);

  let Schema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z]\d{3,8}$/,
        "Password must start with a capital letter and contain 4 to 9 characters"
      )
      .required("Password is required"),
  });
  async function handleLogin(values) {
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      if (data.msg === "done") {
        navigate("/");
        console.log(data);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        console.log(data.msg);
      }
      console.log("dataMassage = " + data.msg);
      return data;
    } catch (error) {
      console.log(" error is " + error);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  function eyetoggle() {
    setisVisible(!isVisible);
  }

  return (
    <>
      <div className="container mx-auto p-12 w-full">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
            <div className="w-full  bg-gray-300 rounded-lg shadow-lg dark:border my-6 min-w-[20rem]  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className=" space-y-4 md:space-y-6 sm:p-8 p-[2rem]">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center  dark:text-white">
                  sign in
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>
                        <p className="text-red-500">{formik.errors.email}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {isVisible ? (
                      <div className=" absolute  top-9 right-5">
                        <FaEye onClick={() => eyetoggle()} size={"1.5rem"} />
                      </div>
                    ) : (
                      <div className=" absolute  top-9 right-5">
                        <IoIosEyeOff
                          onClick={() => eyetoggle()}
                          size={"1.5rem"}
                        />
                      </div>
                    )}

                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={!(formik.dirty && formik.isValid)}
                      className="text-blue-700 hover:text-white border border-blue-700 min-w-[15rem] mx-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => formik.handleReset()}
                      className="text-red-700 hover:text-white border border-red-700 min-w-[15rem] mx-auto hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                    >
                      clear inputs
                    </button>
                  </div>
                  <div className="flex justify-center items-center flex-col gap-3">
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                      Don't have any Account...
                      <Link
                        to={"/register"}
                        className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                      >
                        Register Now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

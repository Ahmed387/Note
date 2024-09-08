import { useContext } from "react";
import { Tokencontext } from "../../Tokencontext/Tokencontext";
import style from "./Modal.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Modal({
  setisModal,
  setNotes,
  Notes,
  Up,
  isupdate,
  setisupdate,
}) {
  console.log(Up);
  console.log(isupdate);

  const { Token } = useContext(Tokencontext);
  let Schema = Yup.object({
    title: Yup.string().required("title is required"),
    content: Yup.string().required("content is required"),
  });
  let formik = useFormik({
    initialValues: {
      title: isupdate ? Up.title : "",
      content: isupdate ? Up.content : "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      Addnote(values);
    },
  });
  function closeModal() {
    setisModal(false);
    setisupdate(false);
  }

  async function Addnote(values) {
    if (isupdate === false) {
      try {
        const { data } = await axios.post(
          "https://note-sigma-black.vercel.app/api/v1/notes",
          values,
          {
            headers: {
              token: `3b8ny__${Token}`,
            },
          }
        );
        console.log(data);
        const newArr = [...Notes];
        newArr.push(data.note);
        setNotes(newArr);
        setisModal(false);
        return data;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await axios.put(
          `https://note-sigma-black.vercel.app/api/v1/notes/${Up.id}`,
          values,
          {
            headers: {
              token: `3b8ny__${Token}`,
            },
          }
        );
        console.log(data);
        setNotes((prevstate) =>
          prevstate.map((note) => (note._id === values.id ? data.note : note))
        );
        setisModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setisupdate(false);
      }
    }
  }

  return (
    <>
      {/* Main modal */}
      <div className="bg-black overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen text-center mt-20 md:mt-5 ">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto ">
          {/* Modal content */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isupdate ? "Edit Note" : "AddNote"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => closeModal()}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div>
                      <p className="text-red-500">{formik.errors.title}</p>
                    </div>
                  ) : null}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Note content
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={5}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write a description..."
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <div>
                      <p className="text-red-500">{formik.errors.content}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className=" disabled:cursor-not-allowed  text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                >
                  {isupdate ? "Edit Note" : "AddNote"}
                </button>
                <button
                  onClick={() => closeModal()}
                  type="button"
                  className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

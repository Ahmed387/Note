import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Tokencontext } from "../../Tokencontext/Tokencontext";
import Modal from "../Modal/Modal";

export default function Home() {
  const { Token } = useContext(Tokencontext);
  const [Notes, setNotes] = useState([]);
  const [isModal, setisModal] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  async function getuserNotes() {
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes/allNotes",
        {
          headers: {
            token: `3b8ny__${Token}`,
          },
        }
      );
      console.log(data.notes);
      setNotes(data?.notes); // To get notes
      return data?.notes;
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteNote(id) {
    try {
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `3b8ny__${Token}`,
          },
        }
      );
      console.log(data);
      const FilterArray = Notes.filter((note) => note._id !== id);
      setNotes(FilterArray);
    } catch (error) {
      console.log(error);
    }
  }

  const [Up, setUp] = useState({});
  function UPDATEValues(id, title, content) {
    console.log(id, title, content);
    setUp({ id, title, content });
    setisupdate(true);
    setisModal(true);
  }

  useEffect(() => {
    getuserNotes();
  }, [Token]);
  // useEffect(() => {
  //   getuserNotes(); //Not Recommend  to reduce send request
  // }, [isModal]);

  return (
    <>
      {/* Main container */}
      <div className="container mx-auto overflow-x-hidden">
        <div className="flex flex-col items-center justify-center mt-10 shadow-md w-full gap-5">
          {/* Add Note Button */}
          <div className="relative  flex justify-center mb-10 w-full max-w-4xl">
            <button
              onClick={() => setisModal(true)}
              className={`{fixed bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg}`}
            >
              Add Note
            </button>
            {isModal && (
              <Modal
                setisModal={setisModal}
                setNotes={setNotes}
                Notes={Notes}
                Up={Up}
                setisupdate={setisupdate}
                isupdate={isupdate}
              />
            )}
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full px-4">
            {/* Mapping over the Notes */}
            {Notes.map((note) => (
              <div
                key={note._id}
                className="bg-white shadow-md rounded-lg p-4 mb-10 flex justify-center"
              >
                <div className="bg-white flex justify-between flex-col shadow-xl border-4 break-words border-red-600 rounded-lg p-6 w-full max-w-xs mx-auto">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{note.content}</p>
                  {/* Action Buttons */}
                  <div className="flex justify-between space-x-2   ">
                    <button
                      onClick={() =>
                        UPDATEValues(note._id, note.title, note.content)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteNote(note._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

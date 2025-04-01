import React, { useContext, useState } from "react";
import { __AUTH, __DB } from "./../../backend/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { AuthContextAPI } from "../../context/AuthContext";

const DeleteAccount = () => {
  let {authUser} = useContext(AuthContextAPI)
  let navigate = useNavigate();
  let [showDialog, setShowDialog] = useState(false);
  let [data, setData] = useState({ email: "", password: "" });
  let { email, password } = data;
  let [hidepassword, setHidepassword] = useState(true);
  let handleChange = (event) => {
    let element = event.target;
    let value = element.value;
    let key = element.name;
    setData({ ...data, [key]: value });
  };

  let handleDeleteAccount = async () => {
    const user = __AUTH.currentUser;
    if (!user) {
      toast.error("No user is logged in currently");
      return;
    }
    const credential = EmailAuthProvider.credential(email, password);
    try {
      let user_collection = doc(__DB, "user_profile",authUser?.uid)
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await deleteDoc(user_collection)
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setShowDialog(false);
    }
  };
  return (
    <section className="h-full w-full flex justify-center items-center">
      <article className="bg-gray-900 min-h-[300px] w-[40%] rounded-xl p-8 relative flex items-center flex-col gap-8">
        <h2 className="text-lg font-semibold mt-8">
          Are you sure you want to delete this account?
        </h2>
        <h3 className="text-red-600 text-md font-semibold">
          WARNING: This action cannot be undone.
        </h3>
        <div className="flex h-auto w-full justify-evenly">
          <button
            className="w-[30%] bg-amber-300 rounded-md text-black font-semibold hover:cursor-pointer p-1 hover:bg-amber-300"
            onClick={() => {
              navigate("/");
            }}
          >
            No
          </button>
          <button
            className="w-[30%] bg-amber-300 rounded-md text-black font-semibold hover:cursor-pointer p-1 hover:bg-amber-300"
            onClick={() => {
              setShowDialog(true);
            }}
          >
            Yes
          </button>
        </div>
      </article>
      {showDialog && (
        <>
          <div className="bg-black h-[45%] w-[33%] fixed flex justify-center items-center rounded-2xl flex-col gap-8 p-2">
            <div className="relative flex flex-col gap-3">
              <div
                className="absolute right-[-30px] top-[-25px]"
                onClick={() => {
                  setShowDialog(false);
                }}
              >
                <IoCloseSharp className="text-lg font-semibold  hover:cursor-pointer" />
              </div>
              <h2 className="font-semibold text-[20px]">
                Enter your credentials to delete your account
              </h2>
              <form
                action=""
                className="flex gap-8 flex-col"
                onSubmit={(e) => {
                  e.preventDefault();
                  // console.log(data);
                  setData({ email: "", password: "" });
                }}
              >
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 w-full p-2.5"
                  />
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="password"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password{" "}
                  </label>
                  <input
                    type={hidepassword ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500  w-full p-2.5"
                  />
                  {hidepassword ? (
                    <FaEyeSlash
                      className="absolute top-10 right-3 hover:cursor-pointer text-black"
                      onClick={() => {
                        setHidepassword(!hidepassword);
                      }}
                    />
                  ) : (
                    <FaEye
                      className="absolute top-10 right-3 hover:cursor-pointer text-black"
                      onClick={() => {
                        setHidepassword(!hidepassword);
                      }}
                    />
                  )}
                </div>
                <button
                  className="bg-red-600 hover:cursor-pointer rounded-md p-2 font-semibold hover:bg-red-700"
                  onClick={handleDeleteAccount}
                >
                  Delete my account
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DeleteAccount;

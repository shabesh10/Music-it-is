import React, { useState } from "react";
import Spinner from "./../helpers/Spinner";
import { NavLink, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConfig";

const ForgetPassword = () => {
    let navigate = useNavigate()
  let [email, setEmail] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  let [isLoading, setisLoading] = useState(false);
  return (
    <section className="h-[calc(100vh-70px)] w-full bg-gray-900 flex justify-center items-center">
      <div className="w-[30%] bg-gray-700 rounded-2xl p-4">
        <header>
          <h1 className="text-center text-2xl font-bold">Reset Password</h1>
        </header>
        <main className="p-4">
          <form
            action=""
            className="flex flex-col gap-2 font-semibold"
            onSubmit={async (event) => {
              // console.log(email);
              // console.log(password);
              setisLoading(true);
              event.preventDefault();
              // console.log(data);
              try {
                await sendPasswordResetEmail(__AUTH, email)
                toast.success("Reset link sent to mail")
                navigate("/auth/Login")
              }
              catch(e) {
                toast.error(e.message)
              }
              finally {
                setisLoading(false)
              }
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
              />
            </div>
            <div className="flex justify-end">
              <button className="hover:cursor-pointer text-black bg-amber-300 rounded-sm p-1 my-2 font-semibold w-full hover:bg-amber-300">
                Reset password
              </button>
            </div>
            <div className="flex justify-center mt-1">
              <NavLink to="/auth/Login" className="text-white w-[100%] block bg-red-600 text-center p-1 rounded-sm hover:bg-red-700">
                Cancel
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default ForgetPassword;

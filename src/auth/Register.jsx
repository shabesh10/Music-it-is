import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from './../helpers/Spinner';

const Register = () => {
  let [hidepassword, setHidepassword] = useState(true);
  // the above use state is for password field
  let [hidepassword2, setHidepassword2] = useState(true);
  // the above use state is for confirm password field
  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  let { username, email, password, confirmpassword } = data;
  let handleChange = (event) => {
    let element = event.target;
    let value = element.value;
    let key = element.name;
    setData({ ...data, [key]: value });
  };
  let navigate = useNavigate()
  let [isLoading, setisLoading] = useState(false)
  return (
      <section className="h-[calc(100vh-70px)] w-full bg-gray-900 flex justify-center items-center">
        <div className="w-[30%] bg-gray-700 rounded-2xl p-4">
          <header>
            <h1 className="text-center text-2xl font-bold">Register</h1>
          </header>
          <main className="p-4">
            <form
              action=""
              className="flex flex-col gap-2 font-semibold"
              onSubmit={async (event) => {
                setisLoading(true)
                event.preventDefault();
                // console.log(data);
                try {
                  if (password !== confirmpassword) {
                    toast.error("The passwords don't match!")
                    setData({...data, confirmpassword:""})
                  }
                  else {
                    let obj = await createUserWithEmailAndPassword(__AUTH,email,password)
                    // console.log(obj);
                    let {user} = obj
                    // console.log(user);
                    await updateProfile(user,{
                      displayName:username,
                      photoURL: "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                    })
                    sendEmailVerification(user)
                    toast("Verification link sent")
                    toast.success("User registered")
                    setData({username:"", email: "", password: "", confirmpassword:""})
                    navigate("/auth/Login")
                  }
                }
                catch(e) {
                  // console.log(e.message);
                  toast.error((e.message.slice(22,e.message.length-2)).replaceAll("-"," "))
                }
                finally {
                  setisLoading(false)
                }
                
              }}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                  onChange={handleChange}
                />
              </div>
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
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
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
              <div className="relative">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password{" "}
                </label>
                <input
                  type={hidepassword2 ? "password" : "text"}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Re-enter password"
                  value={confirmpassword}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                />
                {hidepassword2 ? (
                  <FaEyeSlash
                    className="absolute top-10 right-3 hover:cursor-pointer text-black"
                    onClick={() => {
                      setHidepassword2(!hidepassword2);
                    }}
                  />
                ) : (
                  <FaEye
                    className="absolute top-10 right-3 hover:cursor-pointer text-black"
                    onClick={() => {
                      setHidepassword2(!hidepassword2);
                    }}
                  />
                )}
              </div>
              <div className="flex justify-end">
                <button className="hover:cursor-pointer text-black bg-amber-300 rounded-sm p-1 my-1 font-semibold w-full hover:bg-green-500">
                  Register
                </button>
              </div>
              <div className="flex justify-center">
              <span>Already have an account?</span> &nbsp;<NavLink to="/auth/Login" className="text-gray-100"><u>Login</u></NavLink>
              </div>
            </form>
          </main>
        </div>
        {isLoading && <Spinner/>}
      </section>
  );
};

export default Register;

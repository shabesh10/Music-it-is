import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "./../helpers/Spinner";
import {sendEmailVerification, signInWithEmailAndPassword,} from "firebase/auth";
import { AuthContextAPI } from './../context/AuthContext';

const Login = () => {
  let [hidepassword, setHidepassword] = useState(true);
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;
  let [isLoading, setisLoading] = useState(false);
  let handleChange = (event) => {
    let element = event.target;
    let value = element.value;
    let key = element.name;
    setData({ ...data, [key]: value });
  };
  let navigate = useNavigate();
  let {setAuthUser} = useContext(AuthContextAPI);
  return (
    <section className="h-[calc(100vh-70px)] w-full bg-gray-900 flex justify-center items-center">
      <div className="w-[30%] bg-gray-700 rounded-2xl p-4">
        <header>
          <h1 className="text-center text-2xl font-bold">Login</h1>
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
              try {
                let obj = await signInWithEmailAndPassword(
                  __AUTH,
                  email,
                  password
                );
                // console.log(obj);
                let { user } = obj;
                if (user.emailVerified) {
                  toast.success("Login Successful");
                  setAuthUser(user)
                  navigate("/");
                } else {
                  toast.error("Verify your email");
                  sendEmailVerification(user);
                }
              } catch (e) {
                toast.error((e.message.slice(22,e.message.length-2)).replaceAll("-"," "))
                // TO DO- SLICE THE MSG
              } finally {
                setisLoading(false);
              }
              // console.log(data);
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
            <div className="flex justify-end">
              <button className="hover:cursor-pointer text-black bg-amber-300 rounded-sm p-1 my-1 font-semibold w-full hover:bg-green-500">
                Login
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <span>Don't have an account?</span> &nbsp;
              <NavLink to="/auth/Register" className="text-gray-100 underline">
                Register
              </NavLink>
            </div>
            <div className="text-center mt-1">
              <NavLink to="/auth/ForgetPassword"><u>Forget Password?</u></NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;

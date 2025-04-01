import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { __AUTH } from "../../backend/FirebaseConfig";
import Spinner from "../../helpers/Spinner";
import { UserContextAPI } from "../../context/UserContext";

const Menu = () => {
  let { authUser } = useContext(AuthContextAPI);
  let navigate = useNavigate();
  let [isLoading, setisLoading] = useState(false);
  let { userProfile,isLoading2 } = useContext(UserContextAPI);
  return (
    <aside>
      <ul className="flex gap-3 font-semibold items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return `py-2 px-4 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            Home
          </NavLink>
        </li>
        {userProfile?.role === "admin" && (
          <li>
            <NavLink
              to="/Admin"
              className={({ isActive }) => {
                return `py-2 px-4 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black ${
                  isActive && "bg-amber-300 text-black"
                }`;
              }}
            >
              Admin
            </NavLink>
          </li>
        )}
        {authUser ? (
          <>
            <li>
              <button
                className="py-2 px-4 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black"
                onClick={async () => {
                  setisLoading(true);
                  try {
                    await signOut(__AUTH);
                    toast.success("Logged out");
                    navigate("/auth/Login");
                  } catch (e) {
                    toast.error(e.message);
                  } finally {
                    setisLoading(false);
                  }
                }}
              >
                Logout
              </button>
            </li>
            <li>
              <NavLink to="UserProfile">
                <img
                  src={authUser.photoURL}
                  alt="Profile picture"
                  className="rounded-full h-9 w-9"
                />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="auth/Login"
                className={({ isActive }) => {
                  return `py-2 px-4 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black ${
                    isActive && "bg-amber-300 text-black"
                  }`;
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="auth/Register"
                className={({ isActive }) => {
                  return `py-2 px-4 rounded-md hover:cursor-pointer hover:bg-amber-300 hover:text-black ${
                    isActive && "bg-amber-300 text-black"
                  }`;
                }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {isLoading && <Spinner />}
      {isLoading2 && <Spinner/>}
    </aside>
  );
};

export default Menu;

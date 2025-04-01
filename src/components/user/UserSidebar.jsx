import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const UserSidebar = () => {
  return (
    <aside className="flex bg-gray-700 w-[18%] h-[calc(100vh-70px)] px-4 py-8 justify-center shadow-lg shrink-0">
      <ul className="flex flex-col justify-start gap-6 items-start font-semibold w-full mt-10">
        <li className="w-full">
          <NavLink
            to="/UserProfile"
            end
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <MdAccountCircle className="text-2xl" />
            <span className="text-md">My Account</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/UserProfile/UpdatePicture"
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <AiFillPicture className="text-2xl" />
            <span className="text-md">Update Picture</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/UserProfile/UpdateProfile"
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <FaPencil className="text-2xl" />
            <span className="text-md">Update Profile</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/UserProfile/UpdatePassword"
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <RiLockPasswordFill className="text-2xl" />
            <span className="text-md">Update Password</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="/UserProfile/DeleteAccount"
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <MdDelete className="text-2xl"/>
            <span className="text-md">Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const AdminSidebar = () => {
  return (
    <aside className="flex bg-gray-700 w-[18%] h-[calc(100vh-70px)] justify-center px-4 py-8 shadow-lg shrink-0">
      <ul className="w-full mt-10 flex flex-col gap-6 justify-start items-start font-semibold">
        <li className="w-full">
          <NavLink
            to="/Admin"
            end
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 text-md hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <MdSpaceDashboard className="text-xl"/>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            to="AddAlbum"
            className={({ isActive }) => {
              return `py-3 px-4 w-full rounded-md hover:cursor-pointer flex items-center gap-4 hover:bg-amber-300 text-md hover:text-black ${
                isActive && "bg-amber-300 text-black"
              }`;
            }}
          >
            <IoMdAdd className="text-xl"/>
            <span>Add Album</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;

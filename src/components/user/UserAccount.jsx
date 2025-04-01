import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { FaPencil } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContextAPI } from "../../context/UserContext";

const UserAccount = () => {
  let navigate = useNavigate();
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(UserContextAPI);
  // console.log(authUser);
  return (
    <section className="h-full w-full flex justify-center items-center">
      <article className="bg-gray-900 min-h-[300px] w-[40%] rounded-xl p-4 relative">
        <header className="h-[125px] w-[100%] bg-gray-700 rounded-t-xl flex flex-col items-center gap-1 font-semibold">
          <img
            src={authUser?.photoURL}
            alt="Profile picture"
            className="rounded-full h-32 w-32 -mt-16 hover:brightness-50 hover:cursor-pointer"
            onClick={() => {
              navigate("/UserProfile/UpdatePicture");
            }}
          />
          <h2>{authUser?.displayName}</h2>
          <p>{authUser?.email}</p>
          <div onClick={() => navigate("/UserProfile/UpdateProfile")}>
            <FaPencil className="text-[18px] absolute top-7 right-7 cursor-pointer" />
          </div>
        </header>
        {userProfile ? (
          <div className="mt-2">
            <h2 className="font-semibold text-lg">Personal Information</h2>
            <article className="flex gap-5 flex-wrap mt-2">
              <div className="w-[48%] rounded-md bg-gray-700 py-3 px-5">
                <h3 className="font-semibold">Phone Number</h3>
                <p className="text-sm">{userProfile?.phonenumber}</p>
              </div>
              <div className="w-[47%] rounded-md bg-gray-700 py-3 px-5">
                <h3 className="font-semibold">Date of Birth</h3>
                <p className="text-sm">{userProfile?.dateofbirth}</p>
              </div>
              <div className="w-[48%] rounded-md bg-gray-700 py-3 px-5">
                <h3 className="font-semibold">Languages</h3>
                <p className="text-sm">{userProfile?.languages}</p>
              </div>
              <div className="w-[47%] rounded-md bg-gray-700 py-3 px-5">
                <h3 className="font-semibold">Gender</h3>
                <p className="text-sm">{userProfile?.gender}</p>
              </div>
              <div className="w-[99%] rounded-md bg-gray-700 py-3 px-5">
                <h3 className="font-semibold">Address</h3>
                <p className="text-sm">{userProfile?.address}</p>
              </div>
            </article>
          </div>
        ) : (
          <>
            <div className="flex justify-center w-[100%] h-[150px] items-center flex-col gap-3">
              <h2 className="text-lg">Profile is not updated</h2>
              <NavLink
                to="/UserProfile/UpdateProfile"
                className="bg-amber-300 rounded-lg p-2 text-black font-semibold hover:bg-amber-300"
              >
                Update profile
              </NavLink>
            </div>
          </>
        )}
      </article>
    </section>
  );
};

export default UserAccount;

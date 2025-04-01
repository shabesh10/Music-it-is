import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

const UpdatePicture = () => {
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let { authUser } = useContext(AuthContextAPI);
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  return (
    <section className="h-full w-full flex justify-center items-center">
      <article className="bg-gray-900 min-h-[300px] w-[40%] rounded-xl p-4 relative">
        <h2 className="text-center text-xl font-semibold">
          Upload profile picture
        </h2>
        <div className="mt-2 w-32 h-32 m-auto bg-gray-500 rounded-full">
          {preview ? (
            <img src={preview} alt="preview" className="h-[100%] w-[100%] rounded-full"/>
          ) : (
            <div className="h-[100%] w-[100%] flex items-center justify-center">No file selected</div>
          )}
        </div>
        <form
          action=""
          className="flex flex-col gap-5 mt-2"
          onSubmit={async (event) => {
            setIsLoading(true)
            event.preventDefault();
            try {
              if (!picture) {
                toast.error("Select a photo")
                return;
              }
              else {
                const data = new FormData()
                data.append("file",picture)
                data.append("upload_preset", "music it is")
                let respose = await fetch("https://api.cloudinary.com/v1_1/dhytdvmsm/image/upload",{
                  method:"POST",
                  body: data
                })
                let result = await respose.json()
                // console.log(result.url);
                let key = "photoURL"
                // setAuthUser({...authUser, [key]: result.url})
                await updateProfile(authUser, {photoURL:result.url})
                toast.success("Profile icon updated successfully")
                navigate("/UserProfile")
              }
            }
            catch(e) {
              toast.error(e.message)
            }
            finally{
              setIsLoading(true)
            }
          }}
        >
          <label
            htmlFor="photo"
            className="hover:cursor-pointer block py-2 w-[100%] text-center rounded-xl border-dotted border-1 mt-3"
            accept="image/*"
          >
            Select a photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              // console.dir(event.target.files[0]);
              let file = event.target.files[0];
              setPicture(file);

              if (file) {
                let url = URL.createObjectURL(file);
                // console.log(url);
                setPreview(url);
              }
            }}
          />
          <button className="text-black font-semibold bg-amber-300 rounded-xl p-2 hover:cursor-pointer hover:bg-amber-300">
            Upload photo
          </button>
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UpdatePicture;

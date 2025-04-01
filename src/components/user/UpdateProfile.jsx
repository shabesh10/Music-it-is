import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { __DB } from "../../backend/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";
import { UserContextAPI } from "../../context/UserContext";

const UpdateProfile = () => {
  let {userProfile} = useContext(UserContextAPI)
  let [isLoading, setIsLoading] = useState(false)
  let { authUser, setAuthUser } = useContext(AuthContextAPI);
  let [data, setData] = useState({
    phonenumber: userProfile?.phonenumber,
    dateofbirth: userProfile?.dateofbirth,
    languages: userProfile?.languages,
    gender: userProfile?.gender,
    address: userProfile?.address,
  });
  let { phonenumber, dateofbirth, languages, gender, address } = data;
  let handleData = (event) => {
    let element = event.target;
    let key = element.name;
    let value = element.value;
    setData({ ...data, [key]: value });
  };
  let navigate = useNavigate()
  return (
    <section className="h-full w-full flex justify-center items-center">
      <article className="bg-gray-900 min-h-[400px] w-[60%] rounded-xl p-4 relative">
        <h2 className="text-center text-xl font-semibold">Profile data</h2>
        <form
          action=""
          className="mt-8 flex flex-col gap-4"
          onSubmit={async(event) => {
            setIsLoading(true)
            event.preventDefault();
            let { displayName, email, photoURL, uid } = authUser;
            // console.log(data);
            let payload = {
              name: displayName,
              email: email,
              photo: photoURL,
              id: uid,
              phonenumber: phonenumber,
              dateofbirth: dateofbirth,
              languages: languages,
              gender: gender,
              address: address,
              role: "user",
            };
            // console.log(payload);
            try {
              //step 1: create the collection using doc()
              let user_collection = doc(__DB, "user_profile",uid)
              //step 2: set the data in the document
              await setDoc(user_collection, payload)
              toast.success("Data updated")
              navigate("/UserProfile")
              setData({
                phonenumber: "",
                dateofbirth: "",
                languages: "",
                gender: "",
                address: "",
              });
            }
            catch(e) {
              toast.error(e.message)
            }
            finally{
              setIsLoading(false)
            }
          }}
        >
          <article className="flex gap-10">
            <div className="flex flex-col gap-2 w-[50%]">
              <label htmlFor="phonenumber" className="block text-[18px]">
                Phone Number
              </label>
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                value={phonenumber}
                placeholder="Enter your phone number"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                onChange={handleData}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <label htmlFor="dateofbirth" className="block text-[18px]">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateofbirth"
                id="dateofbirth"
                value={dateofbirth}
                placeholder="Enter your Date of birth"
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                onChange={handleData}
                required
              />
            </div>
          </article>
          <article className="flex gap-10">
            <div className="flex flex-col gap-2 w-[50%]">
              <label htmlFor="languages" className="block text-[18px]">
                Languages
              </label>
              <input
                type="text"
                name="languages"
                id="languages"
                placeholder="Enter your Languages"
                value={languages}
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                onChange={handleData}
                required
              />
            </div>
            <div className="w-[50%] flex flex-col">
              <label className="text-[18px]">Gender</label>
              <div className="flex gap-3 mt-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleData} required
                  checked={gender === "Male"}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleData} required
                  checked={gender === "Female"}
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  onChange={handleData} required
                  checked={gender === "Others"}
                />
                Others
              </div>
            </div>
          </article>
          <article>
            <div className="w-[100%] flex flex-col gap-2">
              <label htmlFor="address" className="block text-[18px]">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                placeholder="Enter your address"
                value={address}
                className="text-black outline-none bg-white rounded-md py-2 px-4"
                onChange={handleData}
                required
              ></textarea>
            </div>
          </article>
          <article className="flex gap-10">
            <div className="w-[50%]">
              <button
              className="w-full text-black bg-amber-300 font-semibold p-1 rounded-md text-center hover:cursor-pointer hover:bg-amber-300"
              type="button"
                onClick={() => {
                  setData({
                    phonenumber: "",
                    dateofbirth: "",
                    languages: "",
                    gender: "",
                    address: "",
                  });
                }}
              >
                Reset
              </button>
            </div>
            <div className="w-[50%]">
              <button className="w-full text-black bg-amber-300 font-semibold p-1 rounded-md text-center hover:cursor-pointer hover:bg-amber-300">Submit</button>
            </div>
          </article>
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UpdateProfile;

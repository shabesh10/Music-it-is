import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextAPI } from "./AuthContext";
import { __DB } from "../backend/FirebaseConfig";

export let UserContextAPI = createContext();
let UserProvider = (props) => {
  let { authUser } = useContext(AuthContextAPI);
  let [userProfile, setUserProfile] = useState(null);
  let [isLoading2, setIsLoading2] = useState(true)
  // having it false initially means when we click something it will load, we want to load it automatically
  useEffect(() => {
    let fetchProfile = () => {
    let user_collection = doc(__DB, "user_profile",authUser?.uid);
    //   optional chaining above..
    onSnapshot(user_collection,(data)=>{
        // console.log(data.data());
        setUserProfile(data.data())
    })
    };
    if (authUser) {
        fetchProfile()
    }
    setIsLoading2(false)
  }, [authUser]);
  return <UserContextAPI.Provider value={{userProfile,isLoading2}}>{props.children}</UserContextAPI.Provider>;
};

export default UserProvider;

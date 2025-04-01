import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { __AUTH } from '../backend/FirebaseConfig'

export const AuthContextAPI = createContext()

const AuthProvider = (props) => {
    let [authUser, setAuthUser] = useState(null)
    // to track if user is chnaging their details in profile
    // userInfo is updated object
    useEffect(()=>{
        onAuthStateChanged(__AUTH, (userInfo)=>{
            // console.log(userInfo);
            // ?. its a option chain, since data is initially null
            // it works like if data is present, it will check further or it will go to else block
            if (userInfo?.emailVerified) {
                setAuthUser(userInfo)
                window.localStorage.setItem("TOKEN",userInfo.accessToken)
                // once logged in, save the token so user don't need to log in everytime he/she opens the site
            }
            else {
                setAuthUser(null)
                window.localStorage.removeItem("TOKEN")
                //if logged out, token is removed too..
            }
        })
    },[__AUTH])

    return (
        <AuthContextAPI.Provider value={{authUser, setAuthUser}}>
            {props.children}
        </AuthContextAPI.Provider>
    )
}

export default AuthProvider
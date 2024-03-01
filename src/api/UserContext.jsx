import { onAuthStateChanged } from "firebase/auth";
import React,{createContext,useState,useEffect, useContext,useMemo} from "react";
import { auth } from "./firebase";
import { getActiveUser } from ".";

export const UserContext = createContext(null);

const UserProvider = ({children}) =>{
  const [ activeUser,setActiveUser] = useState({});
  useMemo(()=>{
    const unsub = onAuthStateChanged(auth,(res)=>{
      getActiveUser(res.uid,setActiveUser);
    });
    return ()=>{
      unsub()
    }
  },[])

return (
  <UserContext.Provider value={{activeUser,setActiveUser}}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider ;

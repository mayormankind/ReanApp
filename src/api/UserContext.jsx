import { onAuthStateChanged } from "firebase/auth";
import React,{createContext,useState,useEffect, useContext,useMemo} from "react";
import { onSnapshot } from 'firebase/firestore';
import { auth } from "./firebase";
import { getActiveUser, userRef } from ".";

export const UserContext = createContext(null);

const UserProvider = ({children}) =>{
  const [ activeUser,setActiveUser] = useState({});

  useMemo(()=>{
    const unsub = onAuthStateChanged(auth,(res)=>{
      res.uid && getActiveUser(res.uid,setActiveUser);
    });
    return ()=>{
      unsub()
    }
  },[])

  console.log(activeUser);

return (
  <UserContext.Provider value={{activeUser,setActiveUser}}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider ;

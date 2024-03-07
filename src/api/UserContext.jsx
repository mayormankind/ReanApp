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
  
  // useMemo(()=>{
  //   onAuthStateChanged(auth,(res)=>{
  //     onSnapshot(userRef, (response)=>{
  //       setActiveUser(response.docs.map((docs)=>{
  //           return { ...docs.data() }
  //         }).filter((item)=>{
  //           return (item.uid) === res.uid
  //         })[0])
  //       });
  //   });
  // },[])

  console.log(activeUser);

return (
  <UserContext.Provider value={{activeUser,setActiveUser}}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider ;

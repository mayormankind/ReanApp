import { updateProfile } from "firebase/auth";
import { collection, addDoc,  onSnapshot, query, where, doc, setDoc, deleteDoc, orderBy, updateDoc } from 'firebase/firestore';
import { db, store, auth } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { v4 as uuid } from "uuid";


export const userRef = collection(db,'users');
export const commentRef = collection(db,'comments');
export const notificationRef = collection(db,'notifications');
export const likeRef = collection(db,'likes');

export const SignOut = () => {
  signOut(auth)
    .then(() => {
      toast.success(`user is successfully logged out`);
    })
    .catch((error) => {
      alert(error);
    });
};

export const SaveUserData = (props) =>{
  addDoc(userRef, props)
  .then(()=>{})
  .catch((err)=>{
    console.log(err);
  })
}

export const profileUpdate = async(user,id,info) =>{
  let toUpdate = doc(userRef,id);
  await updateDoc(toUpdate,info)
  .then(()=>{
    toast.success('your profile update was successfully');
  })
  .catch((err)=>{
    toast.error('could not update your profile');
    console.log(err)
  })
  await updateProfile(user, {info});
}

export const getActiveUser = (cuser,setUser) =>{
    onSnapshot(userRef, (res)=>{
    const user = res.docs.map((docs)=>{
        return { ...docs.data() }
      }).filter((item)=>{
        return (item.uid) === cuser
      })[0]
      setUser(user);
    });
  }
  
  export const postImageUpload = (file,setStatus,setProgress) =>{
    const imagesRef = ref(store,`postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(imagesRef,file)
    uploadTask.on("state_changed", (snapshot) =>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (err) => {},
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
        setStatus(res);
      });
    })
  }

export const postLike = (userId,postId,heart) =>{
  const postLiked = doc(likeRef, `${userId}_${postId}`)
  if(heart){
    deleteDoc(postLiked);
  }else{
    setDoc(postLiked,{userId,postId})
  }
}

export const fetchLikes = (userId,postId,setHearts,setHeart) =>{
  let data = query(likeRef, where("postId", "==", postId)) 
  onSnapshot(data,(res)=>{
    let likes = res.docs.map((doc)=>doc.data());
    let counts = likes.length;
    const liked = likes.some((like)=> like?.userId === userId)
    setHearts(counts);
    setHeart(liked);
  })
}

export const postComment = (props) =>{
  addDoc(commentRef, props)
  .then(()=>{})
  .catch((err)=>{
    console.log(err);
  })
}

export const fetchComment = (postId,setComments) =>{
  let data = query(commentRef, where("postId", "==", postId)) 
  onSnapshot(data,(res)=>{
    const comments = res.docs.map((doc)=>{
      return{id:doc.id, ...doc.data()};
    });
    setComments(comments);
  })
}

export const sendNotification = (data) =>{
  addDoc(notificationRef, data)
  .then(()=>{})
  .catch((err)=>{
    console.log(err);
  })
}

export const fetchNotifications = (setNotifications) =>{
  let data = query(notificationRef, orderBy('time')); 
  onSnapshot(data,(res)=>{
    const notifications = res.docs.map((doc)=>{
      return{id:doc.id, ...doc.data()};
    });
    setNotifications(notifications);
  })
}

export const fetchProfile = (id,setProfileInfo) =>{
  let profileQuery = query(userRef, where("userID" == id));
  onSnapshot(profileQuery, (res)=>{
    setProfileInfo(
      res.docs.map(doc=>{
        return { ...doc.data(), id: doc.id}
      })[0]
    )
  })
}

export const getAllUsers = (setUsers) =>{
  onSnapshot(userRef, (res)=>{
    const usersProfile = res.docs.map(doc=>{
      return { ...doc.data(), id:doc.id }
    })
    setUsers(usersProfile);
    });
}

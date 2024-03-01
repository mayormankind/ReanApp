import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { collection, addDoc,  onSnapshot, query, where, doc, setDoc, deleteDoc, orderBy, updateDoc, serverTimestamp } from 'firebase/firestore';
import {auth,provider,db, store} from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Context } from "./Context";
// import { v4 } from "uuid";

export const userRef = collection(db,'users');
export const postRef = collection(db,'posts');
export const storyRef = collection(db,'stories');
export const bookRef = collection(db,'books');
export const audioRef = collection(db,'audios');
export const episodeRef = collection(db,'episodes');
export const commentRef = collection(db,'comments');
export const notificationRef = collection(db,'notifications');
export const likeRef = collection(db,'likes');

export const SignIn = (email,password) => {
    let response= signInWithEmailAndPassword(auth, email,password)
    return response;
  };
  
export const SignUpWithEmail = (email, password) =>{
    let response = createUserWithEmailAndPassword(auth, email, password)
    return response;
  }
  
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

  export const getData = (ref,setData,setLoading) =>{
    onSnapshot(ref,(snapshot)=>{
      setData(
        snapshot.docs.map((docs) =>{
          return { ...docs.data(), id: docs.id };
        })
      );
      setLoading(true)
      });
  }
  
  export const uploadPost = (onCancel,post,notifData) =>{
    addDoc(postRef, post)
        .then(()=>{
            toast.success('your post has been added successfully');
            onCancel();
            sendNotification(notifData)
        })
        .catch((err)=>{
          console.log(err);
        })
  }

  export const updatePost = (id,postBody,image,video) =>{
    let toUpdate = doc(postRef,id);
    updateDoc(toUpdate,{postBody,image,video})
    .then(()=>{
      toast.success('your post has been updated successfully');
    })
    .catch((err)=>{
      toast.error("couldn't make changes to this post");
    })
  }
  
  export const deletePost = (id) =>{
    let toDelete = doc(postRef,id);
    deleteDoc(toDelete)
    .then(()=>{
      toast.success('your post has been deleted successfully');
    })
    .catch((err)=>{
      toast.error("couldn't make changes to this post");
    })
  }
  
  export const postImageUpload = (file,setStatus,setProgress) =>{
    const imagesRef = ref(store,`postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(imagesRef,file)
    uploadTask.on("state_changed", (snapshot) =>{
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (err) => {
      console.log(err);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
        setStatus(res);
      });
    })
  }
  
export const filesUpload = (file,setStatus,setProgress) =>{
  const filesRef = ref(store,`files/${file.name}`);
  const uploadTask = uploadBytesResumable(filesRef,file)
  uploadTask.on("state_changed", (snapshot) =>{
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);
    },
    (err) => {
      console.log(err);
    },
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

export const AddNewStoryEpisode = (episodeData) =>{
  addDoc(episodeRef, episodeData)
  .then(()=>{
      toast.success('a new episode has been added successfully');
  })
  .catch((err)=>{
    console.log(err);
  })
}

export const fetchEpisodes = (storyId,setEpisodes) =>{
  let data = query(episodeRef, where("storyId", "==", storyId)) 
  onSnapshot(data,(res)=>{
    const episodes = res.docs.map((doc)=>{
      return{id:doc.id, ...doc.data()};
    });
    setEpisodes(episodes);
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

export const fetchProfilePost = (email,setPosts) =>{
  let postQuery = query(postRef, where("userMail" == email));
  onSnapshot(postQuery, (res)=>{
    setPosts(
      res.docs.map(doc=>{
        return { ...doc.data(), id: doc.id}
      })
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

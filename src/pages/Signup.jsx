import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text, useMediaQuery, VStack, InputLeftElement} from '@chakra-ui/react';
import React,{useState,useContext} from 'react';
import { LockOutlined, MailOutlined, PhotoLibrary, VerifiedUserOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Context } from '../api/Context';
import { auth, db, store } from '../api/firebase';
import { Logbox } from '../chakra/Styles';

function SignUp() {  
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [Userinfo,setUserInfo] = useState({});
  const [ error, setError ] = useState({});
  const { user } = useContext(Context);

  const handleClick = () =>{
    setShow(!show);
  }

  const validate = ()=>{
    let errors = {}
    if(!Userinfo.username) errors.username = 'Username field is empty'
    if(!Userinfo.email) errors.email = 'Email field is empty'
    if(!Userinfo.password) errors.password = 'Password field is empty'
    
    setError(errors)
    return Object.keys(errors).length === 0;
  }
  
  const createAccount = async(e) =>{
    e.preventDefault();
    if(validate()){
      try{
        const res = await createUserWithEmailAndPassword(auth, Userinfo.email, Userinfo.password)
        let user = res.user;
        const imagesRef = ref(store,Userinfo.username);
        const uploadTask = uploadBytesResumable(imagesRef,Userinfo.image)
        uploadTask.on(
          (err) => {
              console.log(err);
          },
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then(async(imageURL)=>{
                  await updateProfile(user, {
                    displayName: Userinfo.username,
                    photoURL: imageURL});
                  await setDoc(doc(db, "users", user.uid), {
                    uid:user.uid,
                    displayName: Userinfo.username,
                    email: Userinfo.email,
                    photoURL: imageURL});
                  await setDoc(doc(db, "userChats", user.uid), {});
                  navigate('/');
                  toast.success('Account created successfully')
              });
          })
      }catch(err){
        console.log(err)
        toast.error('account could not be created');
      }
    }
}

  return (
    <Logbox>
        <Flex bg='containerbg' p={{sm:'70px 50px',xs:'70px 40px',base:'70px 30px'}} borderLeftRadius='10px' flexDir='column' justify='center' w={{sm:'50%',base:'100%'}} boxShadow='1px 1px 4px rgba(0,0,0,0.7)'>
          <Flex flexDir='column'>
            <Flex flexDir='column' as='form' onSubmit={createAccount}p='10px 0' gap='15px'>
              <InputGroup bg='white' size='lg' borderRadius='30px'>
                <InputLeftElement color='greentext' pointerEvents={'none'}><VerifiedUserOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                <Input type='text' fontSize='small' borderRadius='30px' placeholder='Username' color='black' onChange={(e)=>setUserInfo({...Userinfo,username:e.target.value})} value={Userinfo.username}/>
              </InputGroup>
              {error.username ? <Text color='red'>{error.username}</Text> : null}
              <InputGroup bg='white' size='lg' borderRadius='30px'>
                <InputLeftElement color='greentext' pointerEvents={'none'}><MailOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                <Input type='email' fontSize='small' borderRadius='30px' placeholder="Email" color='black'onChange={(e)=>setUserInfo({...Userinfo,email:e.target.value})} value={Userinfo.email}/>
              </InputGroup>
              {error.email ? <Text color='red'>{error.email}</Text> : null}
              <Flex align={'center'} w='100%' bg={'white'} borderRadius='30px'>
                <InputGroup size='lg'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><LockOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input borderRadius='30px' fontSize='small' color='black' pr='4rem' type={show ? 'text' : "password"} placeholder="Password" className="password" onChange={(e)=>setUserInfo({...Userinfo, password:e.target.value})}
                  />
                  <InputRightElement color='greentext'>
                    {!show ? <VisibilityOff style={{fontSize:'20px'}} onClick={handleClick}/> : <Visibility style={{fontSize:'20px'}} onClick={handleClick}/> }
                  </InputRightElement>
                </InputGroup>
                {error.password ? <Text color='red'>{error.password}</Text> : null}
              </Flex>
              <input type="file" name="" id="profile" style={{display:'none'}} accept='image/gif, image/jpeg, image/png, images/JFIF, images/jfif' onChange={(e)=>setUserInfo({...Userinfo,image:e.target.files[0]})}/>
              <Button as='label' htmlFor='profile' variant='customOutlined' borderRadius='30px' leftIcon={<PhotoLibrary style={{fontSize:'20px'}}/>}>Select an avatar</Button>
              <Button onClick={createAccount} borderRadius={'30px'} h='50px' fontSize='small' variant='customSolid' fontWeight='bold'>Sign up</Button>
              <Text textAlign='center' color='white'>Have an account? <Button as='span' variant='link' color='rgb(18, 128, 128)'><Link to='/login'>Signin</Link></Button></Text>
              {error && <Box color='red' textAlign='center'>Ensure that all fields are filled correctly</Box>}
            </Flex>
          </Flex>
        </Flex>
        <Box w='50%' h='100%' boxShadow= '1px 1px 7px rgba(0, 0, 0, 0.7)' bg = 'url(images/bg.png)' bgRepeat='no-repeat' bgSize='cover' borderTopRightRadius='10px' display={{sm:'flex',base:'none'}} position={'relative'} borderBottomRightRadius='10px' bgPosition='center'>
          <Box display={{ sm:'flex', base:'none'}} textAlign='center' flexDir='column' h='100%' color='white' background='rgba(0, 0, 0, 0.7)'>
            <Heading fontSize={'25px'} p='10px 20px' textAlign={'left'}>Lightgram</Heading>
            <Flex justify={'center'} flexDir='column' h='100%'>
              <Heading fontSize={'25px'} mb='20px' fontWeight='bold'>Hello There! Guess you are new here?</Heading>
              <Link to="/login">
                <Text color='lightgray' textDecorationThickness='2px' textDecorationLine='underline' fontWeight={'bold'} textDecorationColor='rgb(18, 128, 128)'>Sign in to continue to account</Text>
              </Link>
            </Flex>
          </Box>          
        </Box>
    </Logbox>
  )
}

export default SignUp;
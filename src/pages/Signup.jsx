import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text, InputLeftElement, Select} from '@chakra-ui/react';
import React,{useState,useContext} from 'react';
import { LockOutlined, MailOutlined, PhotoLibrary, VerifiedUserOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Context } from '../api/Context';
import { auth, db, store } from '../api/firebase';
import { HeadLogo, Logbox, Loading } from '../chakra/Styles';
import { ArrowBackIcon, PhoneIcon } from '@chakra-ui/icons';
import { v4 as uuid } from 'uuid';

function SignUp() {  

  const navigate = useNavigate();
  const auth = getAuth();
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [Userinfo,setUserInfo] = useState({});
  const [ error, setError ] = useState({});
  const [ form, setForm ] = useState('Form1')
  const { user } = useContext(Context);

  const handleClick = () =>{
    setShow(!show);
  }

  const validate = ()=>{
    let errors = {}
    if(!Userinfo.username) errors.username = 'Username field is empty'
    if(!Userinfo.poc) errors.poc = 'Person of contact field is empty';
    if(!Userinfo.role) errors.role = 'Role field is empty';
    if(!Userinfo.email) errors.email = 'Email field is empty'
    if(!Userinfo.password) errors.password = 'Password field is empty'
    if(!Userinfo.liscence) errors.liscence = 'Liscence field is empty'
    if(!Userinfo.image) errors.image = 'Select a profile image'
    if(!Userinfo.years) errors.years = 'Years in Business field is empty'
    
    setError(errors)
    return Object.keys(errors).length === 0;
  }
  
  const createAccount = async() =>{
    if(validate()){
      setLoading(true);
      console.log(Userinfo)
      try{
        const res = await createUserWithEmailAndPassword(auth, Userinfo.email, Userinfo.password)
        let user = res.user;
        const imagesRef = ref(store,uuid());
        const uploadTask = uploadBytesResumable(imagesRef,Userinfo.image)
        uploadTask.on(
          (err) => {
            console.log(err)
          },
          ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then(async(imageURL)=>{
                  console.log('testing 111')
                  await updateProfile(user, {
                    displayName: Userinfo.username,
                    photoURL: imageURL});
                  await setDoc(doc(db, "users", user.uid), {
                    uid:user.uid,
                    displayName: Userinfo.username,
                    email: Userinfo.email,
                    role: Userinfo.role,
                    years: Userinfo.years,
                    poc: Userinfo.poc,
                    liscence: Userinfo.liscence,
                    photoURL: imageURL});
                  await setDoc(doc(db, "userChats", user.uid), {});
                  sendEmailVerification(auth.currentUser)
                  toast.success('Account created successfully');
                  setLoading(false);
                  navigate('/');
              });
          })
      }catch(err){
        console.log(err)
        toast.error('Your account could not be created');
        setLoading(false)
      }
    }
}

  return (
    <Logbox>
      { loading && <Flex w='100%' h='100vh' bg='rgba(155,155,155,0.6)' pos='fixed' top='0' left='0' bottom='0' right='0' zIndex='700'><Loading/></Flex>} 
        <Flex bg='containerbg' p={{sm:'70px 50px',xs:'70px 40px',base:'70px 30px'}} borderLeftRadius='10px' flexDir='column' justify='center' w={{sm:'50%',base:'100%'}} boxShadow='xl' pos='relative'>
            {form === 'Form2' && <Button variant='link' pos='absolute' top='20px' left='20px' onClick={()=>setForm('Form1')} color='black' leftIcon={<ArrowBackIcon/>}>Back</Button>}
          <Flex flexDir='column' gap='20px'>
            <Box mx='auto'><HeadLogo/></Box>
            {form==='Form1' ? <Flex flexDir='column' p='10px 0' gap='15px'>
                <InputGroup bg='white' size='lg' borderRadius='30px'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><VerifiedUserOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input variant={error.username ? 'error' : 'customFilled'} type='text' fontSize='small' borderRadius='30px' placeholder='Username' onChange={(e)=>setUserInfo({...Userinfo,username:e.target.value})} value={Userinfo.username}/>
                </InputGroup>
                {error.username ? <Text color='red'>{error.username}</Text> : null}
                <Select placeholder='Choose role' bg='white' borderRadius='30px' variant='filled' onChange={(e)=>setUserInfo({...Userinfo,role:e.target.value})} value={Userinfo.role}>
                  <option value="Trucker">Trucker</option>
                  <option value="Manufacturer">Manufacturer</option>
                </Select>
                {error.role ? <Text color='red'>{error.role}</Text> : null}
                <InputGroup bg='white' size='lg' borderRadius='30px'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><PhoneIcon style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input variant={error.poc ? 'error' : 'customFilled'} type='number' fontSize='small' borderRadius='30px' placeholder='Person of Contact' onChange={(e)=>setUserInfo({...Userinfo,poc:e.target.value})} value={Userinfo.poc}/>
                </InputGroup>
                {error.poc ? <Text color='red'>{error.poc}</Text> : null}
                <InputGroup bg='white' size='lg' borderRadius='30px'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><PhoneIcon style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input variant={error.liscence ? 'error' : 'customFilled'} type='text' fontSize='small' borderRadius='30px' placeholder='Liscence' onChange={(e)=>setUserInfo({...Userinfo,liscence:e.target.value})} value={Userinfo.liscence}/>
                </InputGroup>
                {error.liscence ? <Text color='red'>{error.liscence}</Text> : null}
                <Button onClick={()=>setForm('Form2')} borderRadius={'30px'} h='50px' fontSize='small' variant='customSolid' fontWeight='bold'>Continue</Button>
            </Flex> :
            <Flex flexDir='column' p='10px 0' gap='15px' transition={'5s'}>
              <InputGroup bg='white' size='lg' borderRadius='30px'>
                <InputLeftElement color='greentext' pointerEvents={'none'}><PhoneIcon style={{fontSize:'20px'}}/></InputLeftElement>
                <Input variant={error.years ? 'error' : 'customFilled'} type='number' fontSize='small' borderRadius='30px' placeholder='Years in Business' color='black' onChange={(e)=>setUserInfo({...Userinfo,years:e.target.value})} value={Userinfo.years}/>
              </InputGroup>
              {error.years ? <Text color='red'>{error.years}</Text> : null}
              <InputGroup bg='white' size='lg' borderRadius='30px'>
                <InputLeftElement color='greentext' pointerEvents={'none'}><MailOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                <Input variant={error.email ? 'error' : 'customFilled'} type='email' fontSize='small' borderRadius='30px' placeholder="Email" color='black' onChange={(e)=>setUserInfo({...Userinfo,email:e.target.value})} value={Userinfo.email}/>
              </InputGroup>
              {error.email ? <Text color='red'>{error.email}</Text> : null}
              <Flex align={'center'} w='100%' bg={'white'} borderRadius='30px'>
                <InputGroup size='lg'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><LockOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input variant={error.password ? 'error' : 'customFilled'} borderRadius='30px' fontSize='small' color='black' pr='4rem' type={show ? 'text' : "password"} placeholder="Password" className="password"  onChange={(e)=>setUserInfo({...Userinfo, password:e.target.value})} value={Userinfo.password}
                  />
                  <InputRightElement color='greentext'>
                    {!show ? <VisibilityOff style={{fontSize:'20px'}} onClick={handleClick}/> : <Visibility style={{fontSize:'20px'}} onClick={handleClick}/> }
                  </InputRightElement>
                </InputGroup>
              </Flex>
              {error.password ? <Text color='red'>{error.password}</Text> : null}
              <input type="file" name="" id="profile" style={{display:'none'}} accept='image/gif, image/jpeg, image/png, images/JFIF, images/jfif' onChange={(e)=>setUserInfo({...Userinfo,image:e.target.files[0]})}/>
              <Button as='label' htmlFor='profile' variant='customOutlined' color='textGreen' borderRadius='30px' leftIcon={<PhotoLibrary style={{fontSize:'20px'}}/>}>Select an avatar</Button>
              {error.image ? <Text color='red'>{error.image}</Text> : null}
              <Button onClick={createAccount} borderRadius={'30px'} h='50px' fontSize='small' variant='customSolid' fontWeight='bold'>Sign up</Button>
            </Flex>}
            <Text textAlign='center' color='gray'>Have an account? <Button as='span' variant='link' color='greentext'><Link to='/login'>Signin</Link></Button></Text>
          </Flex>
        </Flex>
        <Box w='50%' h='100%' bg='url(images/bg.png)' bgRepeat='no-repeat' bgSize='cover' borderTopRightRadius='10px' display={{sm:'flex',base:'none'}} position={'relative'} borderBottomRightRadius='10px' bgPosition='center'>
          <Box display={{ sm:'flex', base:'none'}} textAlign='center' flexDir='column' h='100%' color='white' background='rgba(0, 0, 0, 0.5)' boxShadow='xl' p='20px'>
            <HeadLogo/>
            <Flex justify={'center'} flexDir='column' h='100%'>
              <Heading fontSize={'25px'} mb='20px' fontWeight='bold'>Hello There! Guess you are new here?</Heading>
              <Link to="/login">
                <Text color='lightgray' textDecorationThickness='2px' textDecorationLine='underline' fontWeight={'bold'} textDecorationColor='greentext'>Sign in to continue to account</Text>
              </Link>
            </Flex>
          </Box>          
        </Box>
    </Logbox>
  )
}

export default SignUp;
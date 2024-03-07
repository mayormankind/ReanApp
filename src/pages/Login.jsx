import { Box, Button, Flex, Grid, Heading, Input, Text, useColorMode,VStack, InputRightElement, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React,{useState, useEffect,useContext, useMemo } from 'react';
import {LockOpenOutlined,LockOutlined,Mail,
  MailOutlined,
  Visibility,
  VisibilityOff} from "@mui/icons-material";
import { Link,useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { toast } from 'react-toastify';
import { HeadLogo, Logbox } from '../chakra/Styles';
import { auth, db, store } from '../api/firebase';

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [Userinfo,setUserInfo] = useState({});
  const [ error, setError ] = useState({});

  const handleClick = () =>{
    setShow(!show);
  }

  const validate = ()=>{
    let errors = {}
    if(!Userinfo.email) errors.email = 'Email field is empty'
    if(!Userinfo.password) errors.password = 'Password field is empty'
    
    setError(errors)
    return Object.keys(errors).length === 0;
  }
  
  const CheckSignIn = (e) => {
    e.preventDefault();
    if(validate()){
      signInWithEmailAndPassword(auth, Userinfo.email,Userinfo.password)
        .then((res) => {
          const user = res.user;
          toast.success(`Login successfully`);
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          toast.error('Login credentials incorrect!');
        });
    }
  };

  const {colorMode} =useColorMode();
  return (
    <Logbox>
        <Box w='50%' h='100%' boxShadow= 'xl' bg = 'url(images/bg.png)' bgRepeat='no-repeat' bgSize='cover' position={'relative'} borderLeftRadius={{sm:'10px',base:'0'}} bgPosition='center' display={{sm:'flex',base:'none'}}>
          <Box display={{sm:'flex',base:'none'}} textAlign='center' flexDir='column' h='100%' w='100%' color='white' p='20px' background='rgba(0, 0, 0, 0.7)'>
            <HeadLogo/>
            <Flex justify={'center'} flexDir='column' h='100%'>
              <Heading fontSize={'25px'} mb='20px' fontWeight='bold'>Welcome back to REAN</Heading>
              <Link to="/signup">
                <Text color='lightgray' textDecorationThickness='2px' textDecorationLine='underline' textDecorationColor='greentext' fontWeight={'bold'}>Sign in to continue to account</Text>
              </Link>
            </Flex>
          </Box>          
        </Box>
        <Flex p={{sm:'70px 50px',xs:'70px 40px',base:'70px 30px'}} borderRightRadius={{sm:'10px',base:'0'}} flexDir='column' justify='center' w={{sm:'50%', base:'100%'}} boxShadow='xl' bg='containerbg'>
            <Box mx='auto'><HeadLogo/></Box>
            <Flex flexDir='column' as='form' onSubmit={CheckSignIn} p='10px 0' gap='15px'>
              <InputGroup bg='white' size='lg' borderRadius='30px'>
                <InputLeftElement color='greentext' pointerEvents={'none'}><MailOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                <Input variant='customFilled' type='text' fontSize='small' borderRadius='30px' placeholder='Your email'  onChange={(e)=>setUserInfo({...Userinfo,email:e.target.value})} value={Userinfo.email} color='black'/>
              </InputGroup>
              {error.email ? <Text color='red'>{error.email}</Text> : null}
              <Flex align={'center'} w='100%' bg={'white'} borderRadius='30px'>
                <InputGroup size='lg'>
                  <InputLeftElement color='greentext' pointerEvents={'none'}><LockOutlined style={{fontSize:'20px'}}/></InputLeftElement>
                  <Input variant='customFilled' borderRadius='30px' fontSize='small' pr='4rem' color='black' type={show ? 'text' : "password"} placeholder="Password" className="password" onChange={(e)=>setUserInfo({...Userinfo, password:e.target.value})}
                  />
                  <InputRightElement color='greentext'>
                    {!show ? <VisibilityOff style={{fontSize:'20px'}} onClick={handleClick}/> : <Visibility style={{fontSize:'20px'}} onClick={handleClick}/> }
                    </InputRightElement>
                </InputGroup>
              </Flex>
              {error.password ? <Text color='red'>{error.password}</Text> : null}
              <Text textAlign='right'><Button as='span' variant='link' color='greentext'><Link to='/passwordReset'>Forgotten password? </Link></Button></Text>
              <Button onClick={CheckSignIn} borderRadius={'30px'} h='50px' fontSize='small' variant='customSolid' fontWeight='bold'>Sign In</Button>
              <Text textAlign='center' color='gray'>No account yet? <Button as='span' variant='link' color='greentext'><Link to='/signup'> Create account</Link></Button></Text>
            </Flex>
          </Flex>
    </Logbox>
  )
}

export default Login;
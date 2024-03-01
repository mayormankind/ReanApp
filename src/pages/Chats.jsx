import { useMediaQuery,useColorMode, Grid } from '@chakra-ui/react'
import React,{useState} from 'react';
import { PageWrapper } from '../../chakra/Styles'
import { ChatBox, CurrentMessageContainer } from '../subs/Chat';

function Chats() {
  const [ message, setMessage ] = useState({});
  const [ isSelect,setSelect ] = useState();
  const {colorMode} =useColorMode();
  const isDark = colorMode == 'dark';
  const [profileModal, setProfileModal] = useState(false);
  const [ loading,setLoading ] = useState(true);
  const navigate = useNavigate();
    // const { user, setUser } = useContext(Context);

    useEffect(()=>{
      onAuthStateChanged(auth,(res)=>{
        if(!res?.accessToken){
          navigate('/')
        }else{
          setLoading(false);
        }
      })
      // getActiveUser(setUser);
    },[])

  return (
    <PageWrapper overflow={'hidden'} activeLink={'Chats'}>
      <Grid h='100vh' w='100%' bg='green' gridTemplateColumns={{sm:'30% 70%',base:'none'}} boxShadow={'-10px 10px 10px 0px rgba(155,155,155,0.7)'} >    
        <ChatBox/>
        <CurrentMessageContainer/>      
      </Grid> 
    </PageWrapper>
  )
}

export default Chats;
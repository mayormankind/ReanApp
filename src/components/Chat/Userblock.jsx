import react, { useState, useContext } from 'react';
import { Box, Flex, Text, Button, Avatar, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { Context } from '../../api/Context';
import { TruncateText } from '../../chakra/Styles';


export default function UserBlock(props){
    const { user } = useContext(Context);
    const findUser = async(per)=>{
        const q = query(collection(db,'users'),where('displayName','==',per));
        try{
            const queryData = await getDocs(q);
            queryData.forEach((doc)=>{
                props.setUserS(doc.data())
            });
        }catch(err){
            console.log(err)
        }
    }


    const addUser = async () =>{
        const mateUid = user.uid > props.userS?.uid ? user.uid + props.userS?.uid : props.userS?.uid + user.uid;
        try{
            const res = await getDoc(doc(db,'chats',mateUid));
            if(!res.exists()){
                await setDoc(doc(db,'chats',mateUid),{ messages:[]});
                await updateDoc(doc(db,'userChats',user.uid),{
                    [mateUid+".Info"]:{
                        uid:props.userS?.uid,
                        displayName: props.userS.displayName,
                        photoURL: props.userS.photoURL
                    },
                    [mateUid+".date"]: serverTimestamp(),
                })
                await updateDoc(doc(db,'userChats',props.userS?.uid),{
                    [mateUid+".Info"]:{
                        uid:user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [mateUid+".date"]: serverTimestamp(),
                })
            }
        }catch (err) {
            console.log(err)
        }
        props.setUserS(null);
        props.setSearch(false);
    }
    {props.userS && addUser()}

   
    const view_Image = (image) =>{
        props.setViewImage(true);
        props.setImage(image)
    }

    return(
        <Flex align='center' justify='space-between' p='5px 20px' gap='30px' borderBottom='1px solid gray'>
            <Avatar src={props.image} boxSize={{sm:'70px',base:'40px'}} onClick={()=>view_Image(props.image)}/>
            <Box color='black' w='100%' onClick={()=>findUser(props.displayName)} cursor='pointer' _focus={{opacity:'0.7'}} _active={{opacity:'0.8'}}>
                <Text fontWeight='semibold' color='textGreen'>{props.displayName}</Text>
                <TruncateText text={props.email} maxLength={'40'} color='gray'/>
                <Text color='gray'>Role: {props.role}</Text>
            </Box>
        </Flex>
    )
}
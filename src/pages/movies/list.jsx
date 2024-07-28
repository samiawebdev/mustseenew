import { searchVideos } from "../../_lib/appwrite/api";
import React, { useState } from 'react';
import { account } from "../../_lib/appwrite/config";
const List = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function login(email, password) {
        //  await account.createEmailPasswordSession(email, password);
        // let t = await account.client.setSession('666735610037ccf447a7', import.meta.env.VITE_APPWRITE_APP_EMAIL);
         
        // let et = await account.createEmailToken('666735610037ccf447a7', 'mustseevite@mustsee.blog');
        // console.log(et);

        // let s = await account.createEmailPasswordSession('mustseevite@mustsee.blog', import.meta.env.VITE_APPWRITE_APP_KEY);
        // console.log(s);
        // let s = await account.listSessions();
        // console.log(s);
        //  console.log(await account.get());
        //   setLoggedInUser(await account.getSession('current'));

        //  let cs =   await account.getSession();

        //  console.log(cs);
      }

  const listVideos = async() => {
    try {
        // let x =  await login('mustseevite@mustsee.blog', import.meta.env.VITE_APPWRITE_APP_KEY );
        // let x =  await login(import.meta.env.VITE_APPWRITE_APP_EMAIL, import.meta.env.VITE_APPWRITE_APP_KEY );
        // console.log(x);
        // let t = await account.createEmailPasswordSession('mustseevite@mustsee.blog', import.meta.env.VITE_APPWRITE_APP_KEY);
        // setLoggedInUser(await account.getSession('current'));
        await account.getSession('current');
        let result = await searchVideos("Heat");
        console.log(result);
        return result;
        
    } catch (error) {
        console.log(error);
        return error;
    }
  }
const vidz = listVideos();

  return (

    <div>
      
     (`${vidz?.result?.map((item) => <p>item.name</p>)
        
     }`)

    </div>
  )
}

export default List

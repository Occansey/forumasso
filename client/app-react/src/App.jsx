import { useState } from 'react'
import Center from './Center'
import './index.css'
import Nav from './Navbar.jsx'
import Tsect from './TopSection.jsx'
import Login from './Login.jsx'
import FriendsList from './Sidebar'
import { React, useEffect } from 'react';
import Register from './Register.jsx'

function App(){


const [connected,isConnected]=useState(false);
const [auth,setauth]=useState(false)

const changeAuth=()=>setauth(!auth);

  return (
    <>
    {connected?(<><Nav/><Tsect/></>):
    (<>{auth? (<Login connected={connected} setConnected={isConnected}/>):(<Register/>)}
    <a onClick={changeAuth}>{auth? 'Not yet registered ? Sign up':'Already have an account ?! '} </a></>)}
    </>)
}
export default App

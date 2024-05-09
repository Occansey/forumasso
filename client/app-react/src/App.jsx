import { useState } from 'react'
import './index.css'
import Nav from './Navbar.jsx'
import Tsect from './TopSection.jsx'
import Login from './Login.jsx'
import React from 'react';
import Register from './Register.jsx'
import Cookies from 'js-cookie';



function App(){

const userCookieId=Cookies.get('userId')
const [connected,isConnected]=useState(userCookieId? true :false);
const [auth,setauth]=useState(false)

const changeAuth=()=>setauth(!auth);

  return (
    <> 
    {connected?(<><Nav setConnected={isConnected} /><Tsect/></>):
    (<>{auth? (<Login connected={connected} setConnected={isConnected}/>):(<Register/>)}
    <a onClick={changeAuth}>{auth? 'Not yet registered ? Sign up':'Already have an account ?! '} </a></>)}
    </>)
}
export default App

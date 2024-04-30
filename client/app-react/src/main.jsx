import React from 'react'
import ReactDOM from 'react-dom/client'
import Center from './Center'
import './index.css'
import Nav from './Navbar.jsx'
import Tsect from './TopSection.jsx'
import Login from './Login.jsx'
import Mainq from './Mainq.jsx'
import FriendsList from './Sidebar'

const friends = [
  {
    id: 1,
    name: 'John Doe',
    profilePicture: 'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp',
    status: 'Online'
  },
  {
    id: 2,
    name: 'Jane Doe',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s',
    status: 'Offline'
  },
  {
    id: 3,
    name: 'Bob Smith',
    profilePicture: 'https://play-lh.googleusercontent.com/LqgSQHWNv9Dc7DS_J3BgYfZviCti_RBgQNDUHqFWqMLkdhbBxXOQy7cacNXCz5mSMqQ',
    status: 'Online'
  },
  {
    id: 4,
    name: 'Bob Smith',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2IWa9z8ms-DGVUIIeiYzRVEparysX8DnPveegmx4qvNH-yjvqcasw6uLUgXVhixXMb00&usqp=CAU',
    status: 'Online'
  },
  {
    id: 5,
    name: 'Will Smith',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76_4kJOYOqs6sXK5KxwQ3eGql_7Bux_TS4g&s',
    status: 'Online'
  },  {
    id: 6,
    name: 'Bob Will',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76_4kJOYOqs6sXK5KxwQ3eGql_7Bux_TS4g&s',
    status: 'Online'
  },  {
    id: 7,
    name: 'Jon Smith',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT76_4kJOYOqs6sXK5KxwQ3eGql_7Bux_TS4g&s',
    status: 'Online'
  },
];

const posts = [
  {
    id: 1,
    title: 'John Doe',
    profilePicture: 'https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp',
    content: 'Online'
  },
  {
    id: 2,
    title: 'Jane Doe',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s',
    content: 'Offline'
  },
  {
    id: 3,
    title: 'Bob Smith',
    profilePicture: 'https://play-lh.googleusercontent.com/LqgSQHWNv9Dc7DS_J3BgYfZviCti_RBgQNDUHqFWqMLkdhbBxXOQy7cacNXCz5mSMqQ',
    content: 'Online'
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav connected={true} admin={false}/>
    <Center/>
    {/* <Login />   */}
    {/* <Mainq/> */}
    <FriendsList friends={friends} posts={posts} />
    <Tsect/>
  </React.StrictMode>,
)



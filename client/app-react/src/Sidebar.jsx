    import {React,useState} from 'react';
    import './FriendsList.css';
    import { Form, Button, Container, Row, Col } from 'react-bootstrap';
    import axios from 'axios';
    import Cookies from 'js-cookie';


function FriendsList (prop){
  const [message,setMessage]=useState()
  const userCookieId=Cookies.get('userId')
  const [admin,setAdmin]=useState(false)
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/profile?userId=${userCookieId}`);
      setAdmin(response.data.profile.admin);
    } catch (error) {console.error('Error fetching data: ', error);}};
  fetchData();
  const makeAdmin=async (userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/makeadmin?adminId=${userCookieId}&memberId=${userId}`,{})
    setMessage(response.data.message);
    }catch (error) {
    setMessage(error.response);
  }
  }
  const makeMember=async(userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/acceptmember?adminId=${userCookieId}&userId=${userId}`,{})
    setMessage(response.data.message);
    }catch (error) {
    setMessage(error);
  }
  }

  const imageArray=[
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjUcuC1YNpy_Y7L1HTTEHmU2ngJbUTE6Ljzw&s",
    "https://cdn.pixabay.com/photo/2023/01/21/15/16/ai-generated-7734340_1280.jpg",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/83381604-853d-4051-8851-29ae131d641c/dghevpf-c170fad6-70e2-4f63-bf38-6ba80fac0ad9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgzMzgxNjA0LTg1M2QtNDA1MS04ODUxLTI5YWUxMzFkNjQxY1wvZGdoZXZwZi1jMTcwZmFkNi03MGUyLTRmNjMtYmYzOC02YmE4MGZhYzBhZDkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.opcqH0ZwNMNZvrUqQNmXwKYKXd2Aeozu6dkZf79o9a0",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/83381604-853d-4051-8851-29ae131d641c/dghevpf-c170fad6-70e2-4f63-bf38-6ba80fac0ad9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzgzMzgxNjA0LTg1M2QtNDA1MS04ODUxLTI5YWUxMzFkNjQxY1wvZGdoZXZwZi1jMTcwZmFkNi03MGUyLTRmNjMtYmYzOC02YmE4MGZhYzBhZDkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.opcqH0ZwNMNZvrUqQNmXwKYKXd2Aeozu6dkZf79o9a0",
    "https://images.nightcafe.studio/jobs/uI4qBA2CHYVvOPdkTFHL/uI4qBA2CHYVvOPdkTFHL--3--msjff_2x.jpg?tr=w-1600,c-at_max",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRViauXKtHVH2i313MReadMxm7lK4YLOzuy7h9dqkUmcQ&s",
    "https://static.fnac-static.com/multimedia/Images/FR/NR/7a/ed/a8/11070842/1540-1/tsp20190423123135/Antidote.jpg",
    "https://static.fnac-static.com/multimedia/Images/FR/NR/7a/ed/a8/11070842/1540-1/tsp20190423123135/Antidote.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkY5hIAAt9OQP-tX04vg2Liiji72eNQwIUGjCRqN7ug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGi__kOmS1I1MA1DAzwhwl5Cv16U9ezoP4TiHtpZ8ojQ&s",
    "https://lalals.com/wp-content/uploads/2023/12/PhotoReal_A_portrait_of_Saweetie.jpg",
    "https://pbs.twimg.com/media/Fp9HQFuWAAIGvHk.jpg",
    "https://d1v5shjtg4sf9z.cloudfront.net/sza.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTI4Wtc6KS7Zi7PjUzxUpC7mOrCxjwNvniwT-ykowYQ&s",
    "https://thumbs.dreamstime.com/b/field-big-tree-night-sky-stars-ai-generated-292936649.jpg",
    "https://static.vecteezy.com/ti/photos-gratuite/p2/29502140-magnifique-hibou-dans-vol-tendu-ailes-un-enchanteur-proche-rencontre-ai-genere-photo.jpg",
    "https://as2.ftcdn.net/v2/jpg/05/58/25/99/1000_F_558259999_UnYCFWyiGpsYcY0W2t1urABHf1QEkpTG.jpg",
    "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
    "https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp",
    "https://c.ndtvimg.com/2023-03/pk5ecpuo_got-ai-pics_625x300_31_March_23.jpg",
    "https://img5.arthub.ai/user-uploads/f471a1253297dabc755da101a4ede9c30a933c96/5253d761-55f5-4f83-8ffb-4eb88e044e9f/ah3-7068641f053a.jpeg",
    "https://c.ndtvimg.com/2023-06/esufusm_ai-pics_625x300_02_June_23.jpg",
    "https://static.cnews.fr/sites/default/files/styles/image_750_422/public/the_wire.jpg?itok=SXqg52qQ",
    "https://static.wikia.nocookie.net/lemondededisney/images/d/d0/Aladdin_%281%29.png/revision/latest?cb=20240321172521&path-prefix=fr",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5skjHHLsFszFkfw24sfnJv4GZP4q0NN06ev7BeZ_JI9KpA-RpPhzgLWU-6xNR-5NRYE&usqp=CAU",
    "https://sf1.cnetfrance.fr/wp-content/uploads/cnet/2023/05/peakyblinders-s06-une.jpg",
    "https://wallpapers-clan.com/wp-content/uploads/2023/04/one-piece-monkey-d-luffy-aesthetic-wallpaper.jpg"

  ]

  return (
    
    <div className="friends-list">
      {prop.friends.map((friend, index) => (
        <div key={friend._id} className="friend-block">
          <img src={imageArray[Math.floor(Math.random()*imageArray.length)]} alt={friend.name} />
          <div className="friend-info">
            <p>{friend.username}</p>
            <p>{friend.email}</p>
            <p>{friend.member ? 'member': 'outsider'}</p>
            <p>{friend.admin ? 'admin': 'user'}</p>
            {friend._id===userCookieId && (<Button>MY ACCOUNT</Button>)}
            {!friend.member && admin && (<Button onClick={()=>makeMember(friend._id)} >ACCEPT</Button>)}
            {friend.member && !friend.admin && admin &&(<Button onClick={()=>makeAdmin(friend._id)} >MAKE ADMIN</Button>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
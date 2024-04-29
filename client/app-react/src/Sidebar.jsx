    import React from 'react';
    import './FriendsList.css';

function FriendsList (prop){
  return (
    <div className="friends-list">
      {prop.friends.map((friend, index) => (
        <div key={index} className="friend-block">
          <img src={friend.profilePicture} alt={friend.name} />
          <div className="friend-info">
            <p>{friend.name}</p>
            <p>{friend.status}</p>
          </div>
        </div>
      ))}
       {/* {prop.posts.map((post, index) => (
        <div key={index} className="friend-block">
          <div className="friend-info">
            <p>{post.title}</p>
            <p>{post.content}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default FriendsList;
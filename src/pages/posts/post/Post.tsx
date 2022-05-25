import React from 'react'

interface Post {
  avatar? : string;
  name : string;
  postText : string;
}

const Post:React.FC<Post> = ({avatar,name,postText}) => {

  return (
    <div className='post'>
      <div className="post_profile_data">
        <img  src={avatar} alt="" className="post_avatar" />
        <h3 className="post_autor">{name}</h3>
    
      </div>
      <p className="post_text">
         {postText}
        </p>
        <div className="post_photos"></div>
    </div>
  )
}

export default Post
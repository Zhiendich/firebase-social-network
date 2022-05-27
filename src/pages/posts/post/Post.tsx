import React from 'react'

interface Post {
  avatar?: string;
  name: string;
  postText: string;
  time: string
}

const Post: React.FC<Post> = ({ avatar, name, postText, time }) => {

  return (
    <div className='post'>
      <div className="post_profile_data">
        <img src={avatar} alt="" className="post_avatar" />
        <div className="post_text_info">
          <h3 className="post_autor">{name}</h3>
          <h5 className="post_time">{time}</h5>
        </div>


      </div>
      <p className="post_text">
        {postText}
      </p>
      <div className="post_photos"></div>
    </div>
  )
}

export default Post
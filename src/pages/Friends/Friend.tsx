import React from 'react'
import { IUser } from '../../types'



const Friend: React.FC<IUser> = ({ avatar, name, id }) => {

    return (
        <div className='friends_block'>
            <div className="avatar">
                <img className='logout_avatar' src={avatar} alt='' />
                <div className="online_block"></div>
            </div>
            <div className="friends_actions">
                <div className="friend_name">{name}</div>
                <div className="write_message"><a href="">Write Message</a></div>
                <div className="add_to_friend">Add to Friend</div>
            </div>
        </div>

    )
}

export default Friend
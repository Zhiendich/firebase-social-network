
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../types'



const Friend: React.FC<IUser> = ({ avatar, name, id }) => {

    const navigate = useNavigate()

    return (
        <div className='friends_block'>
            <Link to={`../profile/${id}`} className="avatar">
                <img className='logout_avatar' src={avatar} alt='' />
                <div className="online_block"></div>
            </Link>
            <div className="friends_actions">
                <div className="friend_name">{name}</div>
                <div className="write_message"><a href="">Write Message</a></div>
                <div className="add_to_friend">Add to Friend</div>
            </div>
        </div>

    )
}

export default Friend
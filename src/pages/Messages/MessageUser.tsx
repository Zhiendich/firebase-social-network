import React from 'react'
interface IMessageUser {
    name: string;
    avatar: string;
}

const MessageUser: React.FC<IMessageUser> = ({ name, avatar }) => {
    return (
        <div className='MessageUser' >
            <img className='messageAvatar' src={avatar} alt="" />
            <h4>{name}</h4>

        </div>
    )
}

export default MessageUser
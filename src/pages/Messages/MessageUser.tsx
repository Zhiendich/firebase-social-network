import { DocumentData, } from 'firebase/firestore';
import React from 'react'
import { useAuth } from '../../components/providers/UseAuth';
interface IMessageUser {
    name: DocumentData;
    onClick: () => void
    avatar: string
}

const MessageUser: React.FC<IMessageUser> = ({ name, onClick, avatar }) => {
    const { user, db } = useAuth()

    const chatUser = name.users.find((findName: any) => findName.name !== user?.name)

    return (
        <div onClick={onClick} className='MessageUser' >
            <img src={avatar} alt="" />
            <h4>{chatUser.name}</h4>
        </div>
    )
}

export default MessageUser
import { DocumentData, } from 'firebase/firestore';
import React from 'react'
import { useAuth } from '../../components/providers/UseAuth';
interface IMessageUser {
    name: DocumentData;
    onClick: () => void
}

const MessageUser: React.FC<IMessageUser> = ({ name, onClick }) => {
    const { user, db } = useAuth()
    const chatName = name?.users.filter((chat: any) => chat !== user?.name)


    return (
        <div onClick={onClick} className='MessageUser' >

            <h4>

                {chatName}

            </h4>

        </div>
    )
}

export default MessageUser
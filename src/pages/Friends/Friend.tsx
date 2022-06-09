
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../types'
import { addDoc, collection, Firestore } from 'firebase/firestore'
import { useAuth } from '../../components/providers/UseAuth'
import { useCollection } from 'react-firebase-hooks/firestore'



const Friend: React.FC<IUser> = ({ avatar, name, id }) => {
    const { user, db } = useAuth()
    const navigate = useNavigate()
    const [snapshot] = useCollection(collection(db as Firestore, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, users: doc.data() }))
    const chatExist = (name: string | null) => chats?.find(chat => (chat.users.users.includes(user?.name) && chat.users.users.includes(name)))
    const [snapshot2] = useCollection(collection(db as Firestore, 'users'))
    console.log(chats)
    const NewChat = async () => {

        const users = snapshot2?.docs.map(doc => ({ id: doc.id, userData: doc.data() }))
        const findUser = users?.find(searcUser => searcUser?.userData.id == id)

        if (!chatExist(findUser?.userData.name) && findUser?.userData.name !== user?.name) {
            // const chatId = await addDoc(collection(db as Firestore, "chats"), { users: [user?.name, findUser?.userData.name] })
            const chatId = await addDoc(collection(db as Firestore, "chats"), { users: [user, findUser?.userData] })
            navigate(`../chats/${chatId.id}`)
        }


    }

    return (
        <div className='friends_block'>
            <Link to={`../profile/${id}`} className="avatar">
                <img className='logout_avatar' src={avatar} alt='' />
                <div className="online_block"></div>
            </Link>
            <div className="friends_actions">
                <div className="friend_name">{name}</div>
                <button className="write_message" onClick={() => NewChat()}>Write Message</button >

            </div>
        </div>

    )
}

export default Friend
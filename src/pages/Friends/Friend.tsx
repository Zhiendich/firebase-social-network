
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
    // метод перевірки існування чату між цими користувачами
    const chatExist = (name: string | null) => chats?.find(chat => (chat.users.users[0].name.includes(user?.name) && chat.users.users[1].name.includes(name)))
    const [snapshot2] = useCollection(collection(db as Firestore, 'users'))
    // метод створення нового чату
    const NewChat = async () => {
        const users = snapshot2?.docs.map(doc => ({ id: doc.id, userData: doc.data() }))
        // шукаємо юзера якого ми вибрали для чату
        const findUser = users?.find(searcUser => searcUser?.userData.id == id)
        // перевіряємо чи є чат між цими користувачами
        if (!chatExist(findUser?.userData.name) && findUser?.userData.name !== user?.name) {
            // створюємо чат
            const chatId = await addDoc(collection(db as Firestore, "chats"), { users: [user, findUser?.userData] })
            // навігуємо до url цього чату
            navigate(`../chats/${chatId.id}`)
        }
        navigate(`../chats/My`)
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
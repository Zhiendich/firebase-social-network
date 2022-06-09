import { addDoc, collection, doc, Firestore, orderBy, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuth } from '../../components/providers/UseAuth'
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import MessageUser from './MessageUser'
import { useNavigate } from 'react-router-dom'

const Messages: React.FC = () => {
  const { user, db, ga } = useAuth()
  const [messageContent, setMessageContent] = useState('')
  const [snapshot, loading, error] = useCollection(collection(db as Firestore, "chats"));
  const chats = snapshot?.docs.map(doc => ({ id: doc.id, users: doc.data() }))
  const navigate = useNavigate()
  const redirect = (id: string) => navigate(`${id}`)
  const id = String(window.location.href).substring(28)
  const q = query(collection(db as Firestore, `chats/${id}/chat`))
  const [messages] = useCollectionData(q);
  const [chatName] = useDocumentData(doc(db as Firestore, "chats", id))
  const nameOfChat = chatName?.users.filter((userName: any) => userName.name !== user?.name)


  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user) {
      try {
        await addDoc(collection(db as Firestore, `chats/${id}/chat`), {
          user,
          message: messageContent,
          createdAt: new Date().toLocaleTimeString(),
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }

      setMessageContent('')
    }
  }

  return <div className='message_component'>
    <div className="message_sidebar">
      {chats?.filter(chat => chat?.users.users.sort((a: any, b: any) => {
        if (a.name === user?.name) return -1
        else if (b.name === user?.name) return 1
        return 0
      })[0].name.includes(user?.name))
        .map(chat => (<MessageUser key={chat.id} name={chat?.users} avatar={chat?.users.users[1].avatar} onClick={() => redirect(chat.id)} />))
      }
    </div>

    <div className="message_area">
      <h3 className="message_name">
        {(nameOfChat) ?
          nameOfChat[0].name
          :
          ''
        }

      </h3>
      <div className="users_messages">
        {messages?.sort((a, b) => {
          if (a.createdAt > b.createdAt) return 1
          else if (a.createdAt === b.createdAt) return 0
          return -1
        }).map((mes, index) => (

          <div key={index} className="user_message">
            <h3 style={{ background: mes.user.id === user?.id ? '#C7F5D3' : '#BEE2F7', marginLeft: mes.user.id === user?.id ? 'auto' : '10px', order: mes.user.id === user?.id ? '1' : '2' }} className='user_message_text'>{mes.message}</h3>
            <div style={{ order: mes.user.id === user?.id ? '2' : '1', marginLeft: mes.user.id === user?.id ? "10px" : '25px' }} className="message_info">
              {user?.isOnline ? (
                <div className="avatar">
                  <img className='logout_avatar' src={mes.user.avatar} alt='' />
                  <div className="online_block"></div>
                </div>
              )
                :
                (
                  <div className="avatar">
                    <img className='logout_avatar' src={mes.user.avatar} alt='' />

                  </div>
                )
              }
              <h5 className="message_time">
                {mes.createdAt}
              </h5>
            </div>
          </div>
        ))}

      </div>
      <form onSubmit={addMessage} className="make_message_area">
        <input type="text" onChange={(e) => setMessageContent(e.target.value)} value={messageContent} className="make_message_input" placeholder='Type something...' />
        <button className="make_message_button">
          <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/344/ffffff/external-send-user-interface-kmg-design-glyph-kmg-design.png" width='25px' height='25px' alt="" />
        </button>
      </form>
    </div>
  </div>
}

export default Messages

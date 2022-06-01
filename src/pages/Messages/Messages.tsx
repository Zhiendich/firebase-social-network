import { addDoc, collection, Firestore, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/providers/UseAuth'
import { IMessage } from '../../types'

const Messages: React.FC = () => {
  const { user, db, ga } = useAuth()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [messageContent, setMessageContent] = useState('')






  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db as Firestore, 'messages'), doc => {


        let tempArray = [] as IMessage[]

        doc.forEach((d: any) => {

          tempArray.push(d.data())

        })
        const sortMessages = tempArray.sort((a, b) => {
          if (a.createdAt > b.createdAt) return 1
          else if (a.createdAt === b.createdAt) return 0
          return -1
        })
        setMessages(tempArray)
      })
      return () => {
        unsub()
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user) {
      try {
        await addDoc(collection(db as Firestore, 'messages'), {
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

  return <div>
    <div className="message_area">
      <div className="users_messages">
        {messages.map((mes, index) => (

          <div key={index} className="user_message">
            <h3 style={{ border: mes.user.id === user?.id ? '2px solid blue' : '2px solid black', marginLeft: mes.user.id === user?.id ? 'auto' : '10px', order: mes.user.id === user?.id ? '1' : '2' }} className='user_message_text'>{mes.message}</h3>
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

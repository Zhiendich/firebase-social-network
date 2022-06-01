import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { users } from '../../components/user/UserItem'
import { collection, Firestore, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../components/providers/UseAuth'
import { IUser } from '../../types'
const Friends = () => {
  const [friends, setFriends] = useState<IUser[]>(users)
  const { user, db } = useAuth()
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db as Firestore, 'users'), doc => {


        let tempArray = [] as IUser[]

        doc.forEach((d: any) => {
          if (user?.id !== d.data().id) {
            tempArray.unshift(d.data())
          }


        })

        setFriends(tempArray)
      })
      return () => {
        unsub()
      }
    } catch (e) {
      console.error(e)
    }
  }, [])



  return (
    <div>
      <div className='friends'>
        <div className="friends_filter">
          <div className="all_users active_friends">All users</div>
          <div className="online_friends">My Friends</div>
          <input className='friends_search' placeholder='Find your new friends' type="text" />
        </div>

        {friends.map(friend => (
          <Friend id={friend.id} avatar={friend.avatar} name={friend.name} />
        )
        )}

      </div>
    </div>
  )
}

export default Friends

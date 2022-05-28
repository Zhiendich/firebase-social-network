import React from 'react'
import { IUser } from '../../types'

export const users: IUser[] = [
  {
    name: 'Nikita',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsc3WLwt1VO_zCe9FTBOByMFq7iya4QO38gA&usqp=CAU',
    id: '1',
    isOnline: true
  },
  {
    name: 'Patrick',
    avatar: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg',
    id: '2',
    isOnline: false
  },
  {
    name: 'Valik',
    avatar:
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8f/8f160b5e9d954380c4b14b0f5ff4295ec9c141df_full.jpg',
    id: '3',
    isOnline: true
  }
]

const UserItem = () => {
  return <div>UserItem</div>
}

export default UserItem

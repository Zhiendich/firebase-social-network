import { Dispatch, SetStateAction } from 'react'

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IUser {
  name: string
  avatar: string
  id: string
  isOnline?: boolean
}

export interface IPost {
  author: IUser
  createdAt: string
  content: string
  image?: string[]
}

export interface IMessage {
  user : IUser;
  message : string;
  createdAt:string;

}
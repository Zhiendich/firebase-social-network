import React, { useContext, useEffect, useMemo, useState } from 'react'
import { searchPostContext } from '../../App'
import { useAuth } from '../../components/providers/UseAuth'
import { IPost } from '../../types'
import { initialPosts } from './InitialPost'
import Post from './post/Post'
import { collection, addDoc, Firestore, onSnapshot } from 'firebase/firestore'

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts)
  const [postContent, setPostContent] = useState('')

  const { value: searchString } = useContext(searchPostContext)
  const { user, db } = useAuth()

  const searchPosts = useMemo(() => {
    return posts
      .filter(post => post.content.toLowerCase().includes(searchString.toLowerCase()))
  }, [posts, searchString])

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db as Firestore, 'posts'), doc => {


        let tempArray = [] as IPost[]

        doc.forEach((d: any) => {


          tempArray.unshift(d.data())
        })

        setPosts(tempArray)
      })
      return () => {
        unsub()
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (user) {
      try {
        await addDoc(collection(db as Firestore, 'posts'), {
          author: user,
          content: postContent,
          createdAt: new Date().toLocaleString()
        })
      } catch (e) {
        console.error('Error adding document: ', e)
      }

      setPostContent('')
    }
  }

  return (
    <div>
      <form onSubmit={addPost} className='seact_flex'>
        <input
          className='search_input'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)}
          value={postContent}
          placeholder='Nikita расскажи что у тебя нового...'
          type='text'
        />
        <button className='addPostButton'>Добавить пост</button>
      </form>

      {searchPosts.length ? (
        searchPosts.map((item, index) => (
          <Post
            key={index}
            time={item.createdAt}
            name={item.author.name}
            avatar={item.author.avatar}
            postText={item.content}
          />
        ))
      ) : (
        <h1>Посты не найдены</h1>
      )}
    </div>
  )
}

export default Posts

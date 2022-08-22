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
  // Влаштований в React хук useMemo
  const searchPosts = useMemo(() => {
    // фільтрує всі пости у нижній регістер завдяки методу filter() а потім сортує завдяки методу sort() 
    return posts
      .filter(post => post.content.toLowerCase().includes(searchString.toLowerCase()))
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1
        else if (a.createdAt === b.createdAt) return 0
        return 1
      })
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
  // метод додавання посту
  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // перевірка на присутність користувача
    if (user) {
      // додаваня до бази даних посту с полями автора, самого змісту поста content та часу відравки createdAt
      try {
        await addDoc(collection(db as Firestore, 'posts'), {
          author: user,
          content: postContent,
          createdAt: new Date().toLocaleString()
        })
      }    // якщо є помилка відобразити її
      catch (e) {
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
          placeholder="Tell me what's new..."
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

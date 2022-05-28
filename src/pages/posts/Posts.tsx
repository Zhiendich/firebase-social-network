import React, { useContext, useEffect, useState } from 'react'
import { searchPostContext } from '../../App'
import { useAuth } from '../../components/providers/UseAuth'
import { IPost } from '../../types'
import { initialPosts } from './InitialPost'
import Post from './post/Post'
import { collection, addDoc, Firestore, onSnapshot } from "firebase/firestore";


const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts)
  const [postContent, setPostContent] = useState('')
  const { value: searchString } = useContext(searchPostContext)
  const { user, db } = useAuth()
  const searchPosts = posts.filter(post => post.content.toLowerCase().includes(searchString.toLowerCase()))


  useEffect(() => {

    try {
      const unsub = onSnapshot(collection(db as Firestore, 'posts'), doc => {

        doc.forEach((d: any) => {
          console.log(d.data())
          setPosts(prev => [d.data(), ...prev])
        })

      })
      return () => {
        unsub()
      }
    }
    catch (e) {
      console.error(e)
    }


  }, [])

  async function addPost(e: React.MouseEvent<HTMLButtonElement>) {
    if (user) {
      try {
        await addDoc(collection(db as Firestore, "posts"), {
          author: user,
          content: postContent,
          createdAd: new Date().toLocaleString()

        });

      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // setPosts(prev => [{ author: user, content: postContent, createdAt: new Date().toLocaleString() }, ...prev])
      setPostContent('')
    }
  }






  return (

    <div>
      <div className="seact_flex">
        <input className='search_input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)} value={postContent} placeholder='Nikita расскажи что у тебя нового...' type="text" />
        <button className='addPostButton' onClick={addPost}>Добавить пост</button>

      </div>


      {searchPosts.length ?
        searchPosts.map(item => <Post key={item.author.id} time={item.createdAt} name={item.author.name} avatar={item.author.avatar} postText={item.content} />)
        :
        <h1>Посты не найдены</h1>
      }
    </div>
  )
}


export default Posts
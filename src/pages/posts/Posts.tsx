import React, { useContext, useRef, useState } from 'react'
import { searchPostContext } from '../../App'
import { useSearch } from '../../components/hooks/useSearch'
import Search from '../../components/search/Search'
import { users } from '../../components/user/UserItem'
import { IPost, TypeSetState } from '../../types'





import { initialPosts } from './InitialPost'
import Post from './post/Post'

// interface IAddPost {
//   setPosts : TypeSetState<IPost[]>,
//   posts : IPost[]
// }
// {setPosts, posts}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts)
  const [postContent, setPostContent] = useState('')
  const { value: searchString } = useContext(searchPostContext)

  const searchPosts = posts.filter(post => post.content.toLowerCase().includes(searchString.toLowerCase()))


  function addPost(e: React.MouseEvent<HTMLButtonElement>) {
    setPosts(prev => [{ author: users[0], content: postContent, id: 4, createdAt: '5 minut' }, ...prev])
    setPostContent('')

  }

  return (

    <div>
      <div className="seact_flex">
        <input className='search_input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)} value={postContent} placeholder='Nikita расскажи что у тебя нового...' type="text" />
        <button className='addPostButton' onClick={addPost}  >Добавить пост</button>

      </div>


      {searchPosts.length ?
        searchPosts.map(item => <Post key={item.author.id} name={item.author.name} avatar={item.author.avatar} postText={item.content} />)
        :
        <h1>Посты не найдены</h1>
      }
    </div>
  )
}


export default Posts
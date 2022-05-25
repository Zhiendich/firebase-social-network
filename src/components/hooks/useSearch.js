import { useState } from "react"
import { initialPosts } from "../../pages/posts/InitialPost"






export const useSearch = () => {
const [value, setValue] = useState('')
return  initialPosts.filter(post => post.content.toLowerCase().includes(value.toLowerCase()))
}
import { useEffect, useState } from "react"
import Post from "./Post/Post";

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(data => setPosts(data))
      .catch(err => console.log("Fetch failed: " + err))
  }, []);

  return (
    <>
      <div className="posts">
        {posts.map(post => {
          <Post data={post}></Post>
        })}
      </div>
    </>
  )
}

export default App

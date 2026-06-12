import PostCard from "./PostCard/PostCard" 
import styles from "./Posts.module.css"
import { useState, useEffect } from "react";

function Posts() {
const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/posts")
    .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(err => console.log("Fetch failed: " + err))
  }, []);

  return (
    <div className={styles.postHolder}>
      <div className={styles.posts}>
        { posts.length == 0 && <p>There is no posts.</p>}
        {posts.map(post => (
          <PostCard data={post} key={post.id}></PostCard>
        ))}
      </div>
    </div>
  )
}

export default Posts
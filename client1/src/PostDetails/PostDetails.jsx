import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { format, parseISO} from "date-fns"
import styles from "./PostDetails.module.css"

function PostDetails() {

    const {id} = useParams();
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data.post || data.data || data))
        .catch(err => console.log("Fetch failed: " + err))
    }, [])

    if (!post) {
        return <p>Loading data...</p>
    }

    return (
        <>
            <div className={styles.card}>
                <p>{post.title}</p>
                <p>{post.content}</p>
                <div className={styles.flexbox}>
                    <p>{format(parseISO(post.createdAt), 'MMMM dd, yyyy - hh:mm a')}</p>
                    <p>{post.author.fullName}</p>
                </div>
                <div>
                    <h1>Comments</h1>
                    {post.comments.length > 0 && post.comments.map(com => {
                        return <div className={styles.comment} key={com.id}>
                                    <p>{com.author.fullName}</p>
                                    <p>{com.content}</p>
                                    <p>{format(parseISO(com.createdAt), 'MMMM dd, yyyy - hh:mm a')}</p>
                                </div>
                    })}    
                </div>     
            </div>
        </>
    )
}

export default PostDetails
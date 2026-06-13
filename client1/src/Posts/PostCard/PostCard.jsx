import { useState } from "react"
import styles from "./PostCard.module.css"
import { Link } from "react-router-dom"

function PostCard({ data }) {
    return (
        <Link to={`/posts/${data.id}`} className={styles.backLink}>
            <div className={styles.post}>
                <p className={styles.title}>{data.title}</p>
                <p className={styles.text}>{data.content}</p>
            </div>
        </Link>
    )
}

export default PostCard
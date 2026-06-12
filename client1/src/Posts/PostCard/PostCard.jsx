import { useState } from "react"
import styles from "./PostCard.module.css"

function PostCard({ data }) {
    return (
        <div className={styles.post}>
            <p className={styles.title}>{data.title}</p>
            <p className={styles.text}>{data.content}</p>
        </div>
    )
}

export default PostCard
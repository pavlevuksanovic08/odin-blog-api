import { useState } from "react"

function Post({ data }) {
    return (
        <div className="post">
            <p>{data.title}</p>
            <p>{data.content}</p>

        </div>
    )
}

export default Post
import React from "react"
import { Link } from "react-router-dom";

const Post = ({post}) => {
    return (
        <div>
            <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
            </Link>
        </div>
        )
}

export default Post;
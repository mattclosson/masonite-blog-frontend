import React from "react"
import {Link, useParams} from "react-router-dom"

const SinglePost = ({posts}) => {
    const params = useParams()
    const id = parseInt(params.id)

    const post = posts.find((p) => p.id === id)
    console.log(post)
    return (
        <div>
            <h1>{post?.title}</h1>
            <div>{post?.body}</div>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
        )
}

export default SinglePost;
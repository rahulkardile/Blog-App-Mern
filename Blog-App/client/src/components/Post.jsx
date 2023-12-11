import { formatISO9075 } from "date-fns"
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/mainpost/${post._id}`}>
                    <img src={'http://localhost:3300/' + post.cover} alt="" />
                </Link>
            </div>

            <div className="text">
                <Link to={`/mainpost/${`id`}`}>
                    <h2>{post.title}</h2>
                </Link>
                <p className="info">
                    <a href="author">{post.username || "aniket mahale"}</a>
                    <time>{formatISO9075(new Date(post.createdAt))}</time>
                </p>
                <p className='summary'>{post.summary}</p>
            </div>
        </div>
    )
}

export default Post
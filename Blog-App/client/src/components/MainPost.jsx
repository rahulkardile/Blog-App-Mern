import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { UserContext } from '../Context';

const MainPost = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState();

    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:3300/post/${id}`)
            .then(res => {
                res.json().then(postInfor => setPostInfo(postInfor));
            })

    }, [])

    if (!postInfo) return (
        <>
            <h3 className='fetching'>Wait Fetching Posts</h3>
        </>
    )

    return (
        <div className="post-page" key={id}>
            <h1>{postInfo.title}</h1>
            <div className="image">
                <img src={`http://localhost:3300/${postInfo.cover}`} alt="post cover image" />
            </div>
            <div className="info">
                <p>
                    <a href="" className='owner'>Owned by <b>@{postInfo.username || "aniket mahale"}</b></a>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                </p>
            </div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                <a className='edit-btn' href={`/editpost/${postInfo._id}`} >Edit Post</a>
            </div>
            )}
            

            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}

export default MainPost
import React, { useEffect, useState } from 'react'
import Post from './Post'

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3300/allposts', {
       method: 'GET',
        // credentials: 'include' 
      })
      .then(resp => {
        resp.json().then(posts => {
          setPosts(posts);
        })
      })
  }, [])

  if(!posts) return (
    <div className="loading">
      <h3>Wait post are Loading . . .</h3>
    </div>
  )

  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      )
      )}
    </>
  )
}

export default Home
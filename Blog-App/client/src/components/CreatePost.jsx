import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useNavigate } from "react-router-dom"

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],
    // ['link', 'image'],                  // text direction

    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ]
}


const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const createNewpost = async (e) => {
    e.preventDefault();
   
    const data = new FormData();
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', file[0])

  const response = await fetch('http://localhost:3300/createpost', {
      method: 'POST',
      body: data,
      credentials: 'include'
    })

    if(response.status === 200) {
      navigate("/");
    } else {
      alert('Something went wrong');
    }
  }

  return (
    <form action="" onSubmit={createNewpost}>

      <input type="text"
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="Summary"
        placeholder='Summary'
        onChange={e => setSummary(e.target.value)}
        value={summary}
      />

      <input 
      type="file"
      onChange={e => setFile(e.target.files)}
      />

      <ReactQuill
        modules={modules}
        value={content}
        onChange={newValue => setContent(newValue)} 
      />

      <button type='submit' style={{ marginTop: '10px' }}>Create Post</button>

    </form>
  )
}

export default CreatePost
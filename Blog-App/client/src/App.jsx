import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Layout from './Layout'
import { UserContextProvider } from './Context'
import CreatePost from './components/CreatePost'
import MainPost from './components/MainPost'
import EditPost from './components/EditPost'

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider >
        <Routes >
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/mainpost/:id' element={<MainPost />} />
            <Route path='/editpost/:id' element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>

  )
}

export default App

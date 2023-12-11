import express, { json } from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import multer from "multer"
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import User from './models/User.js'
import Post from "./models/Post.js"

const app = express();

dotenv.config();
const MONGO_URL = process.env.MONGODB
const PORT = process.env.PORT

const secret = 'jdsidw9e3913e8819i21kejw9';
const upload = multer({ dest: 'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))

try {
  mongoose.connect(MONGO_URL)
    .then(console.log("Database is connected"))
} catch (error) {

  if (err) throw err
  console.log('Database is not connected');
}

app.get("/", (req, res) => {
  res.send("Okk We Are Live");
})

app.get("/all", async (req, res) => {
  const data = await User.find();
  res.json(data)
})

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      password: hashPass
    })

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }

})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  if (!userDoc) return res.status(404).json("User not Found! Please login");

  const passOk = await bcrypt.compareSync(password, userDoc.password);
  if (!passOk) {
    res.status(404).json("Invalid password");
  } else {
    // login 
    Jwt.sign(JSON.stringify({ username, id: userDoc._id }), secret, {}, (err, token) => {
      if (err) throw err;

      res.cookie('token', token).json({ id: userDoc._id, username }).status(200)

    })
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  Jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  })
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok logout');
})

app.post("/createpost", upload.single('file'), async (req, res) => {

  const { originalname, path } = req.file
  const newPath = path + "_" + originalname
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const { token } = req.cookies;

  Jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err

    try {
      const postDoc = Post.create({
        title: title,
        summary: summary,
        content: content,
        cover: newPath,
        username: info.username,
        author: info.id
      })

      res.status(200).json(postDoc)

    } catch (error) {
      res.status(400).json("Error Found " + error)
    }

  })
})


app.get("/allposts", async (req, res) => {

  const Data = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(Data);
})

app.get('/post/:id', async (req, res) => {

  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate('author', ['username']);;
    res.json(postDoc).status(200);
  } catch (error) {
    res.status(404).json('error id not found' + error);
  }
})

app.put("/post", async (req, res) => {
  const { token } = req.cookies;
  try {
    Jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

      if(!isAuthor){
        res.status(400).json("You update the post!! Sorry your not author of this post")
      }
      await postDoc.updateOne({
        title,
        summary,
        content
      })
      res.status(200).json("Post is updated")
    })
  } catch (error) {
    res.json("Bad Call").status(400);
  }

})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})


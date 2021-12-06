import logo from './logo.svg';
import './App.css';
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import {useState, useEffect} from "react"
import { Route, Routes, Link, useNavigate } from "react-router-dom"

function App() {
  const url = "https://mc-masonite-blog.herokuapp.com/blog/"
  const [posts, setPosts] = useState([])
  
  const navigate = useNavigate()

  const nullBlog = {
    title: "",
    body: ""
  }

  const [targetBlog, setTargetBlog] = useState(nullBlog)

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
    border: 0
  }
  
  const getTargetBlog = (blog) => {
    setTargetBlog(blog);
    navigate("/edit");
  };
  
  const updateBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    getBlogs();
  };
  
  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const addBlogs = async (newBlog) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    });

    getBlogs()
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className="App">
      <Link to="/"><h1>Blogs</h1></Link>
      <Link to="/new"><button style={button}>Create New Blog</button></Link>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AllPosts posts={posts}/>}/>
          <Route path="/post/:id" element={<SinglePost posts={posts} edit={getTargetBlog}/>}/>
          <Route path="/new" element={<Form 
            initialBlog={nullBlog}
            handleSubmit={addBlogs}
            buttonLabel="Create Blog"
          />} />
          <Route path="/edit" element={<Form
            initialBlog={targetBlog}
            handleSubmit={updateBlog}
            buttonLabel="Update Blog"/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPost from "./pages/blogPost/BlogPost";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import BlogList from "./pages/blogList/BlogList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BlogContentForm from "./pages/createBlog/BlogContentForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogPost />} />
        <Route path="/category/:category" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/create" element={<BlogContentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

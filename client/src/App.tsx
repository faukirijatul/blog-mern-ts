import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogPost from "./pages/blogPost/BlogPost";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import BlogList from "./pages/blogList/BlogList";
import BlogContentForm from "./pages/admin/createBlog/BlogContentForm";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AllBlogsTable from "./pages/admin/AllBlogsTable/AllBlogsTable";
import AllUsersTable from "./pages/admin/AllUsersTable/AllUsersTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { currentUser } from "./store/slices/userSlice";

function App() {
  const pathname = window.location.pathname;

  const { user } = useSelector((state : RootState ) => state.user);

  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  console.log(user);
  return (
    <BrowserRouter>
      {!pathname.startsWith("/admin") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Navigate to="/" />} />
        <Route path="/blog/:blogId" element={<BlogPost />} />
        <Route path="/category/:category" element={<BlogList />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<AllBlogsTable />} />
          <Route path="create" element={<BlogContentForm />} />
          <Route path="edit/:slug" element={<BlogContentForm />} />
          <Route path="users" element={<AllUsersTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

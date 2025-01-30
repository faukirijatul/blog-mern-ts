import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogPost from "./pages/blogPost/BlogPost";
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
import { addVisit } from "./store/slices/statisticSlice";
import Profile from "./pages/profile/Profile";
import Loading from "./components/Loading";
import BannerManager from "./pages/admin/bannerManager/BannerManager";
import { getRandomBanners } from "./store/slices/bannerSlice";
import Layout from "./pages/Layout";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, currentUserLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (currentUserLoading) return <Loading />;
  if (user && user.role !== "admin" && !currentUserLoading)
    return <Navigate to="/" />;

  return <>{children}</>;
};

function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    dispatch(addVisit());
    dispatch(getRandomBanners());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Navigate to="/" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/category/:category" element={<BlogList />} />
        </Route>

        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<AllBlogsTable />} />
          <Route path="create" element={<BlogContentForm />} />
          <Route path="edit/:slug" element={<BlogContentForm />} />
          <Route path="users" element={<AllUsersTable />} />
          <Route path="profile" element={<Profile />} />
          <Route path="banner-ads" element={<BannerManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

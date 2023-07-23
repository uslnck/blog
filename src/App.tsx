import "./App.less";
import Header from "./components/header";
import Main from "./components/main";
// import { Routes, Route, Link } from "react-router-dom";

function Blog() {
  return (
    <>
      <Header />
      <Main />
      {/* <Link to="/">Home</Link>
      <Link to="/posts">Blog</Link>
      <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Blogpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes> */}
    </>
  );
}

export default Blog;

import { Route, Routes } from "react-router-dom";

import AboutPage from "@/pages/about";
import BlogPage from "@/pages/blog";
import DocsPage from "@/pages/docs";
import IndexPage from "@/pages/index";
import Jobs from "@/pages/jobPage";
import PricingPage from "@/pages/pricing";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<Jobs />} path="/jobs" />
    </Routes>
  );
}

export default App;

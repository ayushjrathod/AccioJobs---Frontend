import { Route, Routes } from "react-router-dom";

import AboutPage from "@/pages/about";
import DocsPage from "@/pages/docs";
import IndexPage from "@/pages/index";
import { default as JobPage, default as Jobs } from "@/pages/jobPage";
import Users from "@/pages/users";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<JobPage />} path="/jobs" />
      <Route element={<Users />} path="/get-users" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<Jobs />} path="/jobs" />
    </Routes>
  );
}

export default App;

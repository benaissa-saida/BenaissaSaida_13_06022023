import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={ErrorPage}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<SignIn />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

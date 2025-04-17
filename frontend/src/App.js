import SignupPage from "./pages/signup"
import Home from "./pages/home";
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PostForm from "./pages/postForm";
import LoadPost from "./pages/viewPost";
import ReportUser from "./pages/report";

function App() {

  const location = useLocation()
  const hideNavbar = ["/home", "/post"].includes(location.pathname)


  return (
    <div>
      {hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<SignupPage />}/>
          <Route 
            path="/home" 
            element={<ProtectedRoutes>
                      <Home />
                     </ProtectedRoutes>
                    } 
          />
          <Route
            path="/home/:postId"
            element={<ProtectedRoutes>
                      <LoadPost />
                     </ProtectedRoutes>}
          />
          <Route 
            path="/post" 
            element={<ProtectedRoutes>
                      <PostForm />
                     </ProtectedRoutes>
                    } 
          />
          <Route 
            path="/report/:contentType/:reportedId" 
            element={<ProtectedRoutes>
                      <ReportUser />
                     </ProtectedRoutes>
                    } 
          />
        </Routes>
    </div>
);
}

export default App;

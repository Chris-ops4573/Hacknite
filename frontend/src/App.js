import SignupPage from "./pages/signup"
import Home from "./pages/home";
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Post from "./pages/postForm";

function App() {

  const location = useLocation()
  const hideNavbar = location.pathname === '/' 


  return (
    <div>
      {!hideNavbar && <Navbar />}
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
            path="/post" 
            element={<ProtectedRoutes>
                      <Post />
                     </ProtectedRoutes>
                    } 
          />
        </Routes>
    </div>
);
}

export default App;

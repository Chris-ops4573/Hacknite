import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <header className="main-header">
            <div className="container">
                <Link to="/home" className="home-link">
                    <h4 className="home-navbar">Home</h4>
                </Link>
                <Link to="/post" className="post-link">
                    <h4 className="post-navbar">Post</h4>
                </Link>
                <Link to="/profile" className="profile-link">
                    <h4 className="profile-navbar">Profile</h4>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
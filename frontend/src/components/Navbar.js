import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to="/home">
                    <h4 className="home-navbar">Home</h4>
                </Link>
                <Link to="/post">
                    <h4 className="post-navbar">Post</h4>
                </Link>
                <Link to="/profile">
                    <h4 className="profile-navbar">Profile</h4>
                </Link>
            </div>
        </header>
    )
}

export default Navbar
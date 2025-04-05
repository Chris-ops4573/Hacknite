import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <header>
            <div className="container">
            <Link to="/home">
                <h4>Home</h4>
            </Link>
            <Link to="/post">
                <h4>Post</h4>
            </Link>
            </div>
        </header>
    )
}

export default Navbar
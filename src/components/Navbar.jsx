import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Sign Up</Link></li>
                <li><Link to="/">Log In</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
import { NavLink } from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-secondary mb-5 rounded p-3">
            <div className="container">
                <NavLink to="/pages/home" className="navbar-brand">
                    Static Pages
                </NavLink>
                <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
                    <li className="nav-item">
                        <NavLink to="/pages/home" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pages/about" className="nav-link">
                            About
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pages/contacts" className="nav-link">
                            Contacts
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pages/joke" className="nav-link">
                            Contacts
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pages/food_recipes" className="nav-link">
                            Contacts
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pages/admin" className="nav-link">
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;

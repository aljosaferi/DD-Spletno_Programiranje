import { Link, useLocation } from 'react-router-dom';
import { Turn as Hamburger } from 'hamburger-react'

import './Navbar.scss'; 

/*<Hamburger distance="md" rounded={true}/>*/

function Navbar() {
    const location = useLocation();
    
    return (
        <nav className="navbar">
            <div className="left">
                <div className="logo-link">
                    <Link to="/">
                        <div className="logo">
                            <img className="logo-image" src="/images/salad.png" alt="logo"/>    
                            <div className="logo-text">
                                <h1>Študentska</h1>
                                <h1>prehrana</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <ul className="nav-buttons">
                <Link to="/">
                    <li className={location.pathname === "/" ? "active-link" : ""}>
                        <h2>
                            <i className="fa-solid fa-house"/>
                            <span className="nav-text">Domov</span>
                        </h2>
                    </li>
                </Link>
                <Link to="/restaurants">
                    <li className={location.pathname === "/restaurants" ? "active-link" : ""}>
                        <h2>
                            <i className="fa-solid fa-utensils"/>
                            <span className="nav-text">Restavracije</span>
                        </h2>
                    </li>
                </Link>
                <Link to="/map">
                    <li className={location.pathname === "/map" ? "active-link" : ""}>
                        <h2>
                            <i className="fa-solid fa-map-location-dot"/>
                            <span className="nav-text">Zemljevid</span>
                        </h2>
                    </li>
                </Link>
            </ul>
            <div className="user">
                <Link to="/login">
                    <h2>
                        Prijava
                    </h2>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;

